import { generateDalleImage } from "../_shared/openai.ts";
import { getServiceClient } from "../_shared/supabase.ts";
import { errorResponse, jsonResponse } from "../_shared/utils.ts";

interface DalleImageRequestBody {
  prompt: string;
  size?: string;
  response_format?: string;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return errorResponse("Method not allowed", 405);
  let body: DalleImageRequestBody;
  try {
    body = await req.json();
  } catch {
    return errorResponse("Invalid JSON", 400);
  }
  const { prompt, size, response_format } = body;
  if (!prompt) return errorResponse("Prompt required", 400);

  // Auth: require user
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  const supabase = getServiceClient();
  // Type workaround: getUser is correct per Supabase docs, but type may be missing in Edge runtime
  // See: https://supabase.com/docs/guides/functions/auth
  // deno-lint-ignore no-explicit-any
  const { data } = await (supabase.auth as any).getUser(token);
  const user = data?.user;
  if (!user) return errorResponse("Unauthorized", 401);
  const userId = user.id;

  try {
    // Call OpenAI DALL·E
    const result = await generateDalleImage(prompt, { size, response_format });
    const imageUrl = result.data?.[0]?.url || null;
    if (!imageUrl) throw new Error("No image returned");

    // Log job in ai_image_jobs
    await supabase.from("ai_image_jobs").insert({
      user_id: userId,
      provider: "openai",
      prompt,
      status: "completed",
      output_url: imageUrl,
      error: null,
    });

    return jsonResponse({ imageUrl });
  } catch (err) {
    // Log failed job
    await supabase.from("ai_image_jobs").insert({
      user_id: userId,
      provider: "openai",
      prompt,
      status: "failed",
      output_url: null,
      error: String(err),
    });
    return errorResponse("Image generation failed: " + err, 500);
  }
});
