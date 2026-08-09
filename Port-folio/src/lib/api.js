export async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(
      data.error?.message || "The request could not be completed."
    );
    error.code = data.error?.code || "REQUEST_FAILED";
    error.status = response.status;
    error.retryAfter = Number(response.headers.get("Retry-After") || 0);
    throw error;
  }
  return data;
}
