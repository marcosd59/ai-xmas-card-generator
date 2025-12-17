import apiClient from "./client.js";

export async function generateCard({ tono, tipo }) {
  if (!tono || !tipo) {
    throw new Error("Selecciona un tono y un tipo antes de generar.");
  }

  return apiClient("/generate", {
    method: "POST",
    body: { tono, tipo },
  });
}
