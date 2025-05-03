import React, { useState } from "react";
import { useGoogleSheets } from "../hooks/useGoogleSheets";
import { useNotification } from "../context/NotificationContext";

export default function GoogleSheetsIntegration() {
  const {
    connected,
    loading,
    error,
    sheetId,
    setSheetId,
    data,
    connect,
    doExport,
    doImport,
  } = useGoogleSheets();
  const { addNotification } = useNotification();
  const [range, setRange] = useState("");
  const [values, setValues] = useState("");

  function handleExport(e) {
    e.preventDefault();
    if (!range || !values)
      return addNotification("Range and values required", "error");
    const parsed = values.split("\n").map((row) => row.split(","));
    doExport(range, parsed);
  }

  function handleImport(e) {
    e.preventDefault();
    if (!range) return addNotification("Range required", "error");
    doImport(range);
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded shadow p-6 mt-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2">Google Sheets Integration</h1>
      {!connected ? (
        <button
          className="btn btn-primary"
          onClick={connect}
          disabled={loading}
        >
          {loading ? "Connecting..." : "Connect Google Sheets"}
        </button>
      ) : (
        <div>
          <div className="mb-2">
            <label className="font-semibold">Sheet ID</label>
            <input
              className="input input-bordered w-full"
              value={sheetId}
              onChange={(e) => setSheetId(e.target.value)}
              placeholder="Google Sheet ID"
              disabled={loading}
            />
          </div>
          <form onSubmit={handleExport} className="mb-4">
            <label className="font-semibold">
              Export Range (e.g. Sheet1!A1:B2)
            </label>
            <input
              className="input input-bordered w-full"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="Range"
              disabled={loading}
            />
            <label className="font-semibold mt-2">
              Values (CSV rows, comma-separated)
            </label>
            <textarea
              className="input input-bordered w-full"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              placeholder="row1col1,row1col2\nrow2col1,row2col2"
              disabled={loading}
            />
            <button
              className="btn btn-success mt-2"
              type="submit"
              disabled={loading}
            >
              Export to Sheet
            </button>
          </form>
          <form onSubmit={handleImport} className="mb-4">
            <label className="font-semibold">
              Import Range (e.g. Sheet1!A1:B2)
            </label>
            <input
              className="input input-bordered w-full"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              placeholder="Range"
              disabled={loading}
            />
            <button
              className="btn btn-info mt-2"
              type="submit"
              disabled={loading}
            >
              Import from Sheet
            </button>
          </form>
          {data && (
            <div className="bg-gray-100 p-2 rounded">
              <pre className="whitespace-pre-wrap text-xs">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
}
