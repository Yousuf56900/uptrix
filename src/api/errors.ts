import axios from "axios";

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (axios.isAxiosError(error)) {
    const msg = error.response?.data?.message;
    if (typeof msg === "string" && msg.trim()) return msg;
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}
