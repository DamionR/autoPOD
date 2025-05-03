/**
 * AI API client for image generation (Midjourney) and upscaling (Real-ESRGAN)
 */
const BASE = "/";

const API_BASE = process.env.REACT_APP_SUPABASE_URL + "/functions/v1";

// Only these 9 models are allowed per project rules and user specification (see .cursor/rules/ai-content-generation.mdc and user model report)
const ALLOWED_MODELS = [
  "microsoft/phi-4-reasoning-plus:free",
  "qwen/qwen3-30b-a3b:free",
  "deepseek-ai/deepseek-prover-v2:free",
  "opengvlab/internvl3-14b:free",
  "qwen/qwen3-4b:free",
  "qwen/qwen3-0.6b:free",
  "opengvlab/internvl3-2b:free",
  "meta-llama/llama-3.2-11b-vision-instruct:free",
  "google/gemma-7b-it:free",
];

async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("sb-access-token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(opts.headers || {}),
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "AI API error");
  return data;
}

/**
 * Generate an image using Midjourney
 * @param {string} prompt
 * @param {string} userId
 * @param {object} [options]
 * @returns {Promise<{url: string, metadata: any, jobId: string}>}
 */
export async function generateImage(prompt, userId, options = {}) {
  const res = await fetch(BASE + "ai-generate-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, userId, options }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "AI image generation error");
  return data;
}

/**
 * Upscale an image using Real-ESRGAN
 * @param {string} inputUrl
 * @param {string} userId
 * @param {object} [options]
 * @returns {Promise<{url: string, metadata: any, jobId: string}>}
 */
export async function upscaleImage(inputUrl, userId, options = {}) {
  const res = await fetch(BASE + "ai-upscale-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputUrl, userId, options }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "AI upscaling error");
  return data;
}

export function generateImageOpenAI({ prompt, size, response_format }) {
  return apiFetch("/ai-generate-image-openai", {
    method: "POST",
    body: JSON.stringify({ prompt, size, response_format }),
  });
}

export function generateImageByProvider({ provider, ...opts }) {
  if (provider === "openai") return generateImageOpenAI(opts);
  // Default to midjourney (existing)
  return apiFetch("/ai-generate-image", {
    method: "POST",
    body: JSON.stringify(opts),
  });
}

export async function generateContent({ prompt, model, ...rest }) {
  if (!ALLOWED_MODELS.includes(model)) {
    throw new Error(
      `Model '${model}' is not allowed. Only these models are permitted: ${ALLOWED_MODELS.join(
        ", "
      )}`
    );
  }
  // ... existing code ...
}
