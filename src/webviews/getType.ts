export function getType(value: any): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const type = typeof value;
  return ["object", "string", "number", "boolean"].includes(type)
    ? type
    : "unknown";
}
