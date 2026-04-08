import { COMMERCE_CONSTANTS } from '@/constants/commerce';

type ApiRequestInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

/**
 * @description Sends a JSON request to the mocked API and falls back when the request fails.
 * @param path The resource path to request.
 * @param fallback The fallback value returned on failure.
 * @param init Optional fetch configuration.
 * @returns The parsed JSON payload or the provided fallback.
 */
async function requestJson<T>(path: string, fallback: T, init?: ApiRequestInit): Promise<T> {
  try {
    const url = new URL(path, COMMERCE_CONSTANTS.apiBaseUrl);
    const resolvedNext =
      init?.cache === 'no-store'
        ? init?.next
        : (init?.next ?? {
            revalidate: COMMERCE_CONSTANTS.revalidate,
          });
    const response = await fetch(url, {
      ...init,
      headers: {
        Accept: 'application/json',
        ...init?.headers,
      },
      next: resolvedNext,
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

/**
 * @description Fetches JSON from the mocked API.
 * @param path The resource path to request.
 * @param fallback The fallback value returned on failure.
 * @param init Optional fetch configuration.
 * @returns The parsed JSON payload or the provided fallback.
 */
export async function fetchJson<T>(path: string, fallback: T, init?: ApiRequestInit): Promise<T> {
  return requestJson(path, fallback, init);
}

/**
 * @description Sends a mutating JSON request to the mocked API.
 * @param path The resource path to mutate.
 * @param options The request metadata and fallback value.
 * @param body The JSON body to send.
 * @returns The parsed JSON payload or the provided fallback.
 */
export async function mutateJson<TRequest, TResponse>(
  path: string,
  options: {
    fallback: TResponse;
    method: 'POST' | 'PUT';
  },
  body: TRequest,
): Promise<TResponse> {
  try {
    const url = new URL(path, COMMERCE_CONSTANTS.apiBaseUrl);
    const response = await fetch(url, {
      method: options.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!response.ok) {
      return options.fallback;
    }

    return (await response.json()) as TResponse;
  } catch {
    return options.fallback;
  }
}

/**
 * @description Sends a PUT request with a JSON body to the mocked API.
 * @param path The resource path to mutate.
 * @param body The JSON body to send.
 * @param fallback The fallback value returned on failure.
 * @returns The parsed JSON payload or the provided fallback.
 */
export async function putJson<TRequest, TResponse>(
  path: string,
  body: TRequest,
  fallback: TResponse,
): Promise<TResponse> {
  return mutateJson(path, { fallback, method: 'PUT' }, body);
}

/**
 * @description Sends a POST request with a JSON body to the mocked API.
 * @param path The resource path to mutate.
 * @param body The JSON body to send.
 * @param fallback The fallback value returned on failure.
 * @returns The parsed JSON payload or the provided fallback.
 */
export async function postJson<TRequest, TResponse>(
  path: string,
  body: TRequest,
  fallback: TResponse,
): Promise<TResponse> {
  return mutateJson(path, { fallback, method: 'POST' }, body);
}
