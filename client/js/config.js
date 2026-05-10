const isLocalhost =
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1");
export const API_BASE = isLocalhost ? "http://localhost:8000/" : "/";
export const FRONTEND_BASE = isLocalhost ? "http://localhost:5500/" : "/";
