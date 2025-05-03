import React, { useState } from "react";
import { supabase } from "../../api/supabase";
import { useNotification } from "../../context/NotificationContext";

function SyncControls() {
  const { addNotification } = useNotification();
  const [loading, setLoading] = useState(false);

  async function handleSync(fnName, label) {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke(fnName);
      if (error) throw error;
      addNotification(`${label} sync complete`, "success");
    } catch (err) {
      addNotification(err.message || `${label} sync failed`, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 mt-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2">Admin: Sync Controls</h1>
      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={() => handleSync("gelato-sync-products", "Product")}
      >
        Sync Products
      </button>
      <button
        className="btn btn-primary"
        disabled={loading}
        onClick={() => handleSync("gelato-sync-templates", "Template")}
      >
        Sync Templates
      </button>
      {loading && <div className="text-blue-500">Syncing...</div>}
    </div>
  );
}

export default SyncControls;
