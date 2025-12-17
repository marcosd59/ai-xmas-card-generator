const API_BASE_URL = import.meta.env.VITE_API_URL;
const DEFAULT_TIMEOUT = 20000;

async function apiClient(path, { method = "GET", body, headers } = {}) {
  if (!API_BASE_URL) {
    throw new Error("Falta configurar VITE_API_URL en el entorno.");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        text || `Error ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("La solicitud tardó demasiado (timeout).");
    }
    throw new Error(error.message || "Error de red inesperado.");
  } finally {
    clearTimeout(timeoutId);
  }
}

export default apiClient;
