import React, { useEffect, useState } from "react";
import { getCLS, getFID, getLCP } from "../../lib/webVitals";
import Card from "../../components/Card";
import NotificationManager from "../../ui/Notification/NotificationManager";

/**
 * Report page displays web vitals, error log, and notification demo.
 * @returns {JSX.Element}
 */
function Report() {
  const [vitals, setVitals] = useState({});
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    getCLS((cls) => setVitals((v) => ({ ...v, CLS: cls.value })));
    getFID((fid) => setVitals((v) => ({ ...v, FID: fid.value })));
    getLCP((lcp) => setVitals((v) => ({ ...v, LCP: lcp.value })));
    // Example error log
    setErrors([
      { id: 1, message: "404 Not Found", time: "2024-06-01T12:00:00Z" },
      { id: 2, message: "API Timeout", time: "2024-06-01T12:05:00Z" },
    ]);
  }, []);

  function showNotification() {
    NotificationManager.success("This is a notification demo!", "Demo");
  }

  return (
    <main className="max-w-2xl mx-auto p-4" aria-label="Report page">
      <h1 className="text-xl font-bold mb-4">System Report</h1>
      <section aria-label="Web Vitals" className="mb-4">
        <Card>
          <h2 className="font-semibold mb-2">Web Vitals</h2>
          <ul className="list-disc list-inside">
            {Object.entries(vitals).map(([k, v]) => (
              <li key={k} aria-label={`${k}: ${v}`}>
                {k}: {v}
              </li>
            ))}
          </ul>
        </Card>
      </section>
      <section aria-label="Error Log" className="mb-4">
        <Card>
          <h2 className="font-semibold mb-2">Error Log</h2>
          <ul className="list-disc list-inside">
            {errors.map((err) => (
              <li
                key={err.id}
                aria-label={`Error: ${err.message} at ${err.time}`}
              >
                {err.message}{" "}
                <span className="text-xs text-gray-500">({err.time})</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
      <section aria-label="Notification Demo" className="mb-4">
        <Card>
          <h2 className="font-semibold mb-2">Notification Demo</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
            onClick={showNotification}
            aria-label="Show notification demo"
          >
            Show Notification
          </button>
        </Card>
      </section>
    </main>
  );
}

export default Report;
