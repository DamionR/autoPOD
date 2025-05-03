import { useState } from "react";
import {
  getAuthUrl,
  handleOAuthCallback,
  exportToSheet,
  importFromSheet,
} from "../api/googleSheets";

export function useGoogleSheets() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sheetId, setSheetId] = useState("");
  const [data, setData] = useState(null);

  async function connect() {
    setLoading(true);
    setError(null);
    try {
      const { url } = await getAuthUrl();
      window.location.href = url;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCallback(code) {
    setLoading(true);
    setError(null);
    try {
      await handleOAuthCallback(code);
      setConnected(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function doExport(range, values) {
    setLoading(true);
    setError(null);
    try {
      await exportToSheet(sheetId, range, values);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function doImport(range) {
    setLoading(true);
    setError(null);
    try {
      const res = await importFromSheet(sheetId, range);
      setData(res.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    connected,
    loading,
    error,
    sheetId,
    setSheetId,
    data,
    connect,
    handleCallback,
    doExport,
    doImport,
  };
}
