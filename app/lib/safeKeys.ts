export function safeKey(...parts: unknown[]) {
  return parts
    .map((p) => {
      if (p === null || p === undefined) return "x";
      if (typeof p === "object") return "obj";
      return String(p);
    })
    .join("-");
}