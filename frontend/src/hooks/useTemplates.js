import { useState, useEffect, useCallback, useRef } from "react";
import { fetchTemplates } from "../api/gelato";

/**
 * useTemplates fetches and manages template data from the API.
 * Provides loading, error, and refetch logic. Cancels fetch on unmount.
 * @returns {{ templates: any[], loading: boolean, error: string|null, refetch: () => void }}
 */
export function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortRef = useRef(false);

  const fetchAll = useCallback(() => {
    setLoading(true);
    setError(null);
    abortRef.current = false;
    fetchTemplates()
      .then((data) => {
        if (!abortRef.current) setTemplates(data.templates || []);
      })
      .catch((err) => {
        if (!abortRef.current) setError(err.message);
      })
      .finally(() => {
        if (!abortRef.current) setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchAll();
    return () => {
      abortRef.current = true;
    };
  }, [fetchAll]);

  return { templates, loading, error, refetch: fetchAll };
}
