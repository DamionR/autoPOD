// Web Vitals utility for monitoring and reporting
import { getCLS, getFID, getLCP, getTTFB, getFCP } from "web-vitals";

/**
 * Initialize web vitals monitoring.
 * @param {function} [reportFn] - Optional callback to handle metrics (e.g., send to backend)
 * @param {boolean} [logToConsole=true] - Whether to log metrics to the console
 */
export function initWebVitals(reportFn, logToConsole = true) {
  const log = (metric) => {
    if (typeof reportFn === "function") reportFn(metric);
    if (logToConsole) {
      // Always log to console for dev/ops unless disabled
      console.log(`[WebVitals] ${metric.name}:`, metric);
    }
  };
  getCLS(log);
  getFID(log);
  getLCP(log);
  getTTFB(log);
  getFCP(log);
}
