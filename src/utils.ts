export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getNonce(): string {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
}
