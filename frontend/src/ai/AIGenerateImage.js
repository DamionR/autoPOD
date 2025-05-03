import React, { useState } from "react";
import { generateImage } from "../api/ai";
import { useNotification } from "../context/NotificationContext";

// Only these 9 models are allowed per project rules and user specification (see .cursor/rules/ai-content-generation.mdc and user model report)
const ALLOWED_IMAGE_MODELS = [
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

const PROVIDERS = [
  { value: "midjourney", label: "Midjourney" },
  { value: "openai", label: "OpenAI DALL·E" },
];

export default function AIGenerateImage({ userId, onUseImage }) {
  const { addNotification } = useNotification();
  const [prompt, setPrompt] = useState("");
  const [provider, setProvider] = useState("midjourney");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const data = await generateImage({ provider, prompt });
      // OpenAI returns { imageUrl }, Midjourney may return { url }
      const url = data.imageUrl || data.url;
      setResult({ url });
      addNotification(
        `Image generated with ${
          PROVIDERS.find((p) => p.value === provider).label
        }!`,
        "success"
      );
    } catch (err) {
      addNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded shadow p-6 mt-8 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold mb-2">AI Image Generation</h1>
      <label className="font-semibold" htmlFor="provider">
        Provider
      </label>
      <select
        id="provider"
        className="input input-bordered"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        aria-label="Select AI provider"
      >
        {PROVIDERS.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <label className="font-semibold" htmlFor="prompt">
        Prompt
      </label>
      <textarea
        id="prompt"
        className="input input-bordered"
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
        aria-label="Image prompt"
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        aria-busy={loading}
      >
        Generate
      </button>
      {loading && <div className="text-blue-500">Generating...</div>}
      {result && (
        <div className="mt-4">
          <img
            src={result.url}
            alt="Generated AI"
            className="mx-auto h-64 object-contain rounded mb-2"
          />
          <div className="flex gap-2">
            <a href={result.url} download className="btn btn-secondary">
              Download
            </a>
            {onUseImage && (
              <button
                type="button"
                className="btn btn-success"
                onClick={() => onUseImage(result.url)}
              >
                Use in Product
              </button>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
