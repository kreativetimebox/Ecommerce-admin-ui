export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

// A leading slash on `path` would otherwise reset URL resolution to the origin root,
// silently dropping any base path (e.g. /api/v1) from `baseUrl`.
function buildUrl(baseUrl: string, path: string): URL {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return new URL(path.replace(/^\/+/, ''), base);
}

// Surfaces the server's actual validation/error message instead of a bare status code,
// so callers can show users what really went wrong instead of guessing.
async function throwForResponse(response: Response): Promise<never> {
  let serverMessage: string | undefined;
  try {
    const body = (await response.json()) as { message?: unknown };
    if (typeof body.message === 'string') serverMessage = body.message;
    else if (Array.isArray(body.message)) serverMessage = body.message.join(', ');
  } catch {
    // response body wasn't JSON; fall back to the generic status message below
  }
  throw new Error(`API request failed with status ${response.status}${serverMessage ? `: ${serverMessage}` : ''}`);
}

export function createApiClient(baseUrl: string) {
  return {
    async get<T>(path: string, params?: Record<string, string | number | boolean | undefined>, token?: string): Promise<ApiEnvelope<T>> {
      const url = buildUrl(baseUrl, path);
      Object.entries(params ?? {}).forEach(([key, value]) => value !== undefined && url.searchParams.set(key, String(value)));
      const response = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : undefined });
      if (!response.ok) await throwForResponse(response);
      return response.json() as Promise<ApiEnvelope<T>>;
    },
    async post<T>(path: string, body: unknown, token?: string): Promise<ApiEnvelope<T>> {
      const response = await fetch(buildUrl(baseUrl, path), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(body),
      });
      if (!response.ok) await throwForResponse(response);
      return response.json() as Promise<ApiEnvelope<T>>;
    },
    // No Content-Type header here — the browser sets the multipart boundary automatically.
    async postForm<T>(path: string, formData: FormData, token?: string): Promise<ApiEnvelope<T>> {
      const response = await fetch(buildUrl(baseUrl, path), {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });
      if (!response.ok) await throwForResponse(response);
      return response.json() as Promise<ApiEnvelope<T>>;
    },
    async patch<T>(path: string, body: unknown, token: string): Promise<ApiEnvelope<T>> {
      const response = await fetch(buildUrl(baseUrl, path), { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) });
      if (!response.ok) await throwForResponse(response);
      return response.json() as Promise<ApiEnvelope<T>>;
    },
    async delete<T>(path: string, token: string): Promise<ApiEnvelope<T>> {
      const response = await fetch(buildUrl(baseUrl, path), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) await throwForResponse(response);
      return response.json() as Promise<ApiEnvelope<T>>;
    },
  };
}