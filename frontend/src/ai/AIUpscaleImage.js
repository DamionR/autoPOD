import React, { useState } from "react";
import { upscaleImage } from "../api/ai";
import { useNotification } from "../context/NotificationContext";
import FileUpload from "../storage/FileUpload";

export default function AIUpscaleImage({ userId, onUseImage }) {
  const { addNotification } = useNotification();
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleUpscale() {
    setLoading(true);
    setResult(null);
    try {
      const data = await upscaleImage(inputUrl, userId);
      setResult(data);
      addNotification("Image upscaled!", "success");
    } catch (err) {
      addNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded shadow p-6 mt-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2">
        AI Image Upscaling (Real-ESRGAN)
      </h1>
      <FileUpload onUpload={setInputUrl} />
      <button
        className="btn btn-primary"
        onClick={handleUpscale}
        disabled={!inputUrl || loading}
      >
        Upscale
      </button>
      {loading && <div className="text-blue-500">Upscaling...</div>}
      {result && (
        <div className="mt-4">
          <img
            src={result.url}
            alt="Upscaled"
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
    </div>
  );
}
