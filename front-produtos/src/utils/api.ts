export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!.replace(/\/$/, "");

interface ErrorResponse { message?: string; }
function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as any).message === "string"
  );
}

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  // garante barra única entre base e path
  const path = url.startsWith("/") ? url : `/${url}`;
  const fullUrl = url.startsWith("http") ? url : `${API_BASE}${path}`;
  console.log("🔍 fetcher:", fullUrl);
  const res = await fetch(fullUrl, options);

  let data: unknown;
  try { data = await res.json(); }
  catch { data = null; }

  if (!res.ok) {
    const msg = isErrorResponse(data) ? data.message! : res.statusText;
    throw new Error(`Erro ${res.status}: ${msg}`);
  }
  return data as T;
}
