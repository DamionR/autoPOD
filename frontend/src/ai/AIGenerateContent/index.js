import React, { useState } from "react";
import { useNotification } from "../../context/NotificationContext";
// import { generateContent } from "../../api/ai"; // TODO: update to support model selection

// Only these 9 models are allowed per project rules and user specification (see .cursor/rules/ai-content-generation.mdc and user model report)
const MODELS = [
  {
    value: "microsoft/phi-4-reasoning-plus:free",
    label: "Phi 4 Reasoning Plus (Microsoft)",
  },
  { value: "qwen/qwen3-30b-a3b:free", label: "Qwen3 30B A3B (Qwen)" },
  {
    value: "deepseek-ai/deepseek-prover-v2:free",
    label: "DeepSeek Prover V2 (DeepSeek)",
  },
  { value: "opengvlab/internvl3-14b:free", label: "InternVL3 14B (OpenGVLab)" },
  { value: "qwen/qwen3-4b:free", label: "Qwen3 4B (Qwen)" },
  { value: "qwen/qwen3-0.6b:free", label: "Qwen3 0.6B (Qwen)" },
  { value: "opengvlab/internvl3-2b:free", label: "InternVL3 2B (OpenGVLab)" },
  {
    value: "meta-llama/llama-3.2-11b-vision-instruct:free",
    label: "Llama 3.2 11B Vision Instruct (Meta)",
  },
  { value: "google/gemma-7b-it:free", label: "Gemma 7B IT (Google)" },
];

export default function AIGenerateContent() {
  const { addNotification } = useNotification();
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(MODELS[0].value);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      // TODO: update generateContent to accept model param and use OpenRouter structured outputs
      // const data = await generateContent({ prompt, model });
      // setResult(data.content);
      addNotification("Content generated! (stub)", "success");
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
      <h1 className="text-2xl font-bold mb-2">AI Content Generation</h1>
      <label className="font-semibold" htmlFor="model">
        Model
      </label>
      <select
        id="model"
        className="input input-bordered"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        aria-label="Select AI model"
      >
        {MODELS.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
      <label className="font-semibold" htmlFor="prompt">
        Prompt
      </label>
      <textarea
        id="prompt"
        className="input input-bordered"
        placeholder="Describe what you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
        aria-label="Content prompt"
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
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </form>
  );
}
