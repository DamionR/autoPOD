import React from "react";

/**
 * ProviderSelector allows users to choose between Gelato, Printify, and Printful.
 * @param {object} props
 * @param {string} props.value - Current provider ('gelato', 'printify', or 'printful')
 * @param {function} props.onChange - Callback when provider changes
 * @param {string} [props.className]
 */
export default function ProviderSelector({ value, onChange, className = "" }) {
  // Only these 9 models are allowed per project rules (see .cursor/rules/ai-content-generation.mdc)
  const PROVIDERS = [
    {
      value: "microsoft/phi-4-reasoning-plus:free",
      label: "Phi 4 Reasoning Plus (Microsoft)",
    },
    { value: "qwen/qwen3-30b-a3b:free", label: "Qwen3 30B A3B (Qwen)" },
    {
      value: "deepseek-ai/deepseek-prover-v2:free",
      label: "DeepSeek Prover V2 (DeepSeek)",
    },
    {
      value: "openrouter/codellama-70b-instruct",
      label: "CodeLlama 70B Instruct (OpenRouter)",
    },
    {
      value: "openrouter/llama-3-sonar-large-32k-online",
      label: "Llama-3 Sonar Large 32k Online (OpenRouter)",
    },
    {
      value: "openrouter/llama-3-sonar-small-32k-online",
      label: "Llama-3 Sonar Small 32k Online (OpenRouter)",
    },
    { value: "openrouter/auto", label: "Auto Router (OpenRouter)" },
    { value: "openrouter/auto-tools", label: "Auto Tools (OpenRouter)" },
    { value: "openrouter/auto-agents", label: "Auto Agents (OpenRouter)" },
  ];

  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium">Print Provider</span>
      <select
        className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select print provider"
      >
        <option value="gelato">Gelato</option>
        <option value="printify">Printify</option>
        <option value="printful">Printful</option>
      </select>
    </label>
  );
}
