// openai.ts - Shared OpenAI API logic for DALL·E image generation
// All API keys/secrets must be loaded from environment variables

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_API_BASE = Deno.env.get("OPENAI_API_BASE") ||
  "https://api.openai.com/v1";

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

export async function generateDalleImage(
  prompt: string,
  options: { n?: number; size?: string; response_format?: string } = {},
) {
  const body = {
    prompt,
    n: options.n || 1,
    size: options.size || "1024x1024",
    response_format: options.response_format || "url", // or "b64_json"
    model: "dall-e-3",
  };
  const res = await fetch(`${OPENAI_API_BASE}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${error}`);
  }
  return res.json();
}
