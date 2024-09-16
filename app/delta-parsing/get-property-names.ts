import { getTextFromNode } from "./get-text-from-node";

export function getPropertyNames<Names extends string = string>(
  table: HTMLTableElement,
  otherPropertyNames: Record<string, Names>
): Names[] {
  const propertyNameTables = Array.from(
    table.querySelectorAll("tr")[0].querySelectorAll("td")
  );
  const propertyNames: Names[] = propertyNameTables.map(val => {
    const text = val
      ? getTextFromNode(val)
          .split(" ")
          .map(val => {
            if (!val) return;
            const first = val[0].toUpperCase();
            return first + val.slice(1).toLowerCase();
          })
          .join("")
      : val;

    if (Object.keys(otherPropertyNames).includes(text))
      return otherPropertyNames[text];
    else return text as Names;
  });

  if (Object.keys(otherPropertyNames).includes("ГлавнаяОрганизация"))
    propertyNames.push(otherPropertyNames["ГлавнаяОрганизация"]);
  else propertyNames.push("ГлавнаяОрганизация" as Names);

  if (
    Object.values(otherPropertyNames).every(val => propertyNames.includes(val))
  )
    throw Error();

  return propertyNames;
}
