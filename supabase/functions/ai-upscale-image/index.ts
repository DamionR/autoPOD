import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { upscaleImage } from "../_shared/realesrgan.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

Deno.serve(async (req) => {
  if (req.method !== "POST") return errorResponse("POST required", 405);
  const { inputUrl, userId, options } = await req.json();
  if (!inputUrl || !userId) {
    return errorResponse("Missing inputUrl or userId", 400);
  }
  const supabase = getServiceClient();
  let jobId;
  try {
    // Log job as pending
    const { data: job, error: jobErr } = await supabase.from("ai_image_jobs")
      .insert({
        user_id: userId,
        type: "realesrgan",
        input_url: inputUrl,
        status: "pending",
      }).select().maybeSingle();
    if (jobErr) throw jobErr;
    jobId = job.id;
    // Upscale image
    const { url, metadata } = await upscaleImage(inputUrl, userId, options);
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
