import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { generateMidjourneyImage } from "../_shared/midjourney.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  if (req.method !== "POST") return errorResponse("POST required", 405);
  const { prompt, userId, options } = await req.json();
  if (!prompt || !userId) return errorResponse("Missing prompt or userId", 400);
  const supabase = getServiceClient();
  let jobId;
  try {
    // Log job as pending
    const { data: job, error: jobErr } = await supabase.from("ai_image_jobs")
      .insert({
        user_id: userId,
        type: "midjourney",
        prompt,
        status: "pending",
      }).select().maybeSingle();
    if (jobErr) throw jobErr;
    jobId = job.id;
    // Generate image
    const { url, metadata } = await generateMidjourneyImage(
      prompt,
      userId,
      options,
    );
    // Update job as success
    await supabase.from("ai_image_jobs").update({
      output_url: url,
      status: "success",
      updated_at: new Date().toISOString(),
    }).eq("id", jobId);
    return jsonResponse({ url, metadata, jobId });
  } catch (err) {
    if (jobId) {
      await supabase.from("ai_image_jobs").update({
        status: "error",
        error: String(err),
        updated_at: new Date().toISOString(),
      }).eq("id", jobId);
    }
    return errorResponse(String(err), 500);
  }
});
