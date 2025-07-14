export function getIconEmoji(type: string): string {
  const icons: Record<string, string> = {
    object: "🗂️",
    array: "📚",
    string: "📝",
    number: "🔢",
    boolean: "✅",
    null: "🚫",
    unknown: "❓",
  };
  return icons[type] || icons.unknown;
}
