import { getTextFromNode } from "./get-text-from-node";

export function getTableDataOrg(
  table: HTMLTableElement
): (string | number)[][] {
  const rawData: (string | number)[][] = Array.from(
    table.querySelectorAll("tr")
  )
    .slice(1)
    .map(node => {
      const data = Array.from(node.querySelectorAll("td")).map(node => {
        const text = getTextFromNode(node);

        if (
          text.replaceAll(" ", "").includes("★") &&
          text.replace(" ", "").length <= 5
        )
          return text.replaceAll("☆", "").replaceAll(" ", "").length;
        else return text;
      });

      return data;
    });

  return rawData;
}

export function getTableDataUser(
  table: HTMLTableElement
): (string | number | string[])[][] {
  let main_org = "";
  const rawData: (string | number | string[])[][] = Array.from(
    table.querySelectorAll("tr")
  )
    .slice(1)
    .map(node => {
      const arr = Array.from(node.querySelectorAll("td"));
      if (arr.length === 1) {
        main_org = getTextFromNode(arr[0]);
        return;
      }
      const data = arr.map(node => {
        const text = getTextFromNode(node);
        const img = Array.from(node.querySelectorAll("img"));

        if (img.length > 0 && img) {
          return img
            .map(node => {
              const src = node.src;
              if (node.width < 100 && node.height < 100) return;
              if (
                src.startsWith("http://") ||
                src.startsWith("https://") ||
                src.startsWith("//")
              )
                return src;
              else
                return new URL(
                  src,
                  process.env.DELTA_URL ||
                    `https://delta-streaming.neocities.org/`
                ).toString();
            })
            .filter(val => val);
        }
        if (text === "\xa0") return [] as string[];
        if (
          text.replaceAll(" ", "").includes("★") &&
          text.replace(" ", "").length <= 5
        )
          return text.replaceAll("☆", "").replaceAll(" ", "").length;
        else return text;
      });

      data.push(main_org);

      return data;
    })
    .filter(val => typeof val !== "undefined") as (
    | string
    | number
    | string[]
  )[][];

  return rawData;
}
