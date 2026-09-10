import { createApiClient } from '@commerce/api-client';
import { authEvents } from './authEvents';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1';
const client = createApiClient(apiBaseUrl);

// Uploaded file URLs (e.g. /uploads/products/x.jpg) are server-relative, not API-path-relative,
// so they need the API's origin rather than the admin dev server's origin.
export const apiOrigin = apiBaseUrl.replace(/\/api\/v1\/?$/, '');

// A stale/expired admin token should drop the user back to the login screen instead of
// leaving every view stuck on a generic "data unavailable" error.
function withUnauthorizedDetection<Args extends unknown[], T>(fn: (...args: Args) => Promise<T>) {
  return async (...args: Args) => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof Error && /status 401/.test(error.message)) {
        authEvents.emitUnauthorized();
      }
      throw error;
    }
  };
}

export const api = {
  get: withUnauthorizedDetection(client.get),
  post: withUnauthorizedDetection(client.post),
  postForm: withUnauthorizedDetection(client.postForm),
  patch: withUnauthorizedDetection(client.patch),
  delete: withUnauthorizedDetection(client.delete),
};
