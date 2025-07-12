export function generateInterfaceFromJson(
  json: any,
  name = "RootObject"
): string {
  const lines: string[] = [];
  const indent = (level: number) => "  ".repeat(level);

  function parse(obj: any, name: string, level = 0): void {
    if (typeof obj !== "object" || obj === null) return;

    lines.push(`${indent(level)}interface ${name} {`);
    for (const [key, value] of Object.entries(obj)) {
      if (value === null) {
        lines.push(`${indent(level + 1)}${key}: any;`);
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          if (typeof value[0] === "object" && value[0] !== null) {
            const subName = capitalize(key) + "Item";
            parse(value[0], subName, level + 1);
            lines.push(`${indent(level + 1)}${key}: ${subName}[];`);
          } else {
            lines.push(`${indent(level + 1)}${key}: ${typeof value[0]}[];`);
          }
        } else {
          lines.push(`${indent(level + 1)}${key}: any[];`);
        }
      } else if (typeof value === "object") {
        const subName = capitalize(key);
        parse(value, subName, level + 1);
        lines.push(`${indent(level + 1)}${key}: ${subName};`);
      } else {
        lines.push(`${indent(level + 1)}${key}: ${typeof value};`);
      }
    }
    lines.push(`${indent(level)}}`);
  }

  parse(json, name);
  return lines.join("\n");
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
