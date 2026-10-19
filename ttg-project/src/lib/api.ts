const BASE_URL = 'http://localhost:20301/v1';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

function buildHeaders(customHeaders?: HeadersInit): HeadersInit {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message ?? `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get<T>(path: string, customHeaders?: HeadersInit): Promise<T> {
    return fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: buildHeaders(customHeaders),
    }).then((res) => handleResponse<T>(res));
  },

  post<T>(path: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    return fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: buildHeaders(customHeaders),
      body: JSON.stringify(body),
    }).then((res) => handleResponse<T>(res));
  },

  put<T>(path: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    return fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: buildHeaders(customHeaders),
      body: JSON.stringify(body),
    }).then((res) => handleResponse<T>(res));
  },

  patch<T>(path: string, body?: unknown, customHeaders?: HeadersInit): Promise<T> {
    return fetch(`${BASE_URL}${path}`, {
      method: 'PATCH',
      headers: buildHeaders(customHeaders),
      body: JSON.stringify(body),
    }).then((res) => handleResponse<T>(res));
  },

  delete<T>(path: string, customHeaders?: HeadersInit): Promise<T> {
    return fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
      headers: buildHeaders(customHeaders),
    }).then((res) => handleResponse<T>(res));
  },
};

export function setToken(token: string): void {
  localStorage.setItem('accessToken', token);
}

export function clearToken(): void {
  localStorage.removeItem('accessToken');
}
