// services/api.ts
const strip = (s?: string) => (s ? s.replace(/\/$/, "") : "");

const PUBLIC_BASE = strip(process.env.NEXT_PUBLIC_API_BASE);   // ex.: http://localhost:8080
const INTERNAL_BASE = strip(process.env.API_BASE_INTERNAL);    // ex.: http://api:5000 (dentro da rede do compose)

const isServer = typeof window === "undefined";
const API_BASE = isServer ? (INTERNAL_BASE || PUBLIC_BASE) : (PUBLIC_BASE || "");

interface ErrorResponse { message?: string }
function isErrorResponse(data: unknown): data is ErrorResponse {
  return typeof data === "object" && data !== null && "message" in data && typeof (data as any).message === "string";
}

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const path = url.startsWith("/") ? url : `/${url}`;
  const fullUrl = url.startsWith("http") ? url : `${API_BASE}${path}`;
  console.log("🔍 fetcher:", { isServer, fullUrl });

  const res = await fetch(fullUrl, options);

  let data: unknown;
  try { data = await res.json(); } catch { data = null; }

  if (!res.ok) {
    const msg = isErrorResponse(data) ? data.message! : res.statusText;
    throw new Error(`Erro ${res.status}: ${msg}`);
  }
  return data as T;
}
