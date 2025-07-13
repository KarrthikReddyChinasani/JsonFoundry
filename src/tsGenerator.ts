import { capitalize } from "./utils";

export function generateInterfaceFromJson(
  json: any,
  rootName = "RootObject"
): string {
  const interfaces = new Map<string, string[]>();

  function parse(obj: any, name: string) {
    if (typeof obj !== "object" || obj === null) return;

    const lines: string[] = [];
    lines.push(`interface ${name} {`);

    for (const [key, value] of Object.entries(obj)) {
      const safeKey = isValidIdentifier(key) ? key : `"${key}"`;

      if (value === null) {
        lines.push(`  ${safeKey}: any;`);
      } else if (Array.isArray(value)) {
        if (value.length > 0) {
          const first = value[0];
          if (typeof first === "object" && first !== null) {
            const subName = capitalize(key) + "Item";
            parse(first, subName);
            lines.push(`  ${safeKey}: ${subName}[];`);
          } else {
            lines.push(`  ${safeKey}: ${typeof first}[];`);
          }
        } else {
          lines.push(`  ${safeKey}: any[];`);
        }
      } else if (typeof value === "object") {
        const subName = capitalize(key);
        parse(value, subName);
        lines.push(`  ${safeKey}: ${subName};`);
      } else {
        lines.push(`  ${safeKey}: ${typeof value};`);
      }
    }

    lines.push("}");
    interfaces.set(name, lines);
  }

  parse(json, rootName);

  return Array.from(interfaces.entries())
    .reverse()
    .map(([_, lines]) => lines.join("\n"))
    .join("\n\n");
}

function isValidIdentifier(key: string): boolean {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
}
