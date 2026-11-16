import axios from "axios";

export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail.length > 0) {
      return detail
        .map((item) => (typeof item?.msg === "string" ? item.msg : null))
        .filter(Boolean)
        .join("; ") || fallback;
    }
    if (error.message) return error.message;
  }
  return fallback;
}
