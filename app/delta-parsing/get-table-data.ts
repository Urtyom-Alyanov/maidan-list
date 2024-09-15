import { prepareText } from "./prepare-text";

export function getTableDataOrg(
  table: HTMLTableElement
): (string | number)[][] {
  const rawData: (string | number)[][] = Array.from(
    table.querySelectorAll("tr")
  )
    .slice(1)
    .map(node => {
      const data = Array.from(node.querySelectorAll("td")).map(node => {
        const text = prepareText(node.textContent || node.innerText);

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
        main_org = prepareText(arr[0].textContent || arr[0].innerText);
        return;
      }
      const data = arr.map(node => {
        const text = prepareText(node.textContent || node.innerText);
        const img = Array.from(node.querySelectorAll("img"));

        if (img.length > 0 && img) {
          return img.map(node => {
            const src = node.src;
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
          });
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
