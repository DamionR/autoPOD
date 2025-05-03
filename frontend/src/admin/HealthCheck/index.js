import React, { useState } from "react";
import { supabase } from "../../api/supabase";
import Loader from "../../ui/Loader";

function HealthCheck() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCheck() {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.functions.invoke(
        "test-healthcheck"
      );
      if (error) throw error;
      setStatus(data);
    } catch (err) {
      setError(err.message || "Health check failed");
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 mt-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2">Admin: Health Check</h1>
      <button
        className="btn btn-primary"
        onClick={handleCheck}
        disabled={loading}
      >
        Run Health Check
      </button>
      {loading && <Loader />}
      {error && <div className="text-red-600">{error}</div>}
      {status && (
        <div className="mt-4">
          <div className="font-semibold">
            Supabase:{" "}
            <span
              className={status.supabase ? "text-green-600" : "text-red-600"}
            >
              {status.supabase ? "OK" : "FAIL"}
            </span>
          </div>
          <div className="font-semibold">
            Gelato API:{" "}
            <span className={status.gelato ? "text-green-600" : "text-red-600"}>
              {status.gelato ? "OK" : "FAIL"}
            </span>
          </div>
          <div className="font-semibold">
            Storage:{" "}
            <span
              className={status.storage ? "text-green-600" : "text-red-600"}
            >
              {status.storage ? "OK" : "FAIL"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HealthCheck;
