import { prepareText } from "./prepare-text";

export function getTextFromNode(cell: HTMLTableCellElement) {
  let text = "";
  const spans = Array.from(cell.querySelectorAll("span"));
  if (spans.length > 0)
    text = spans
      .filter(val => parseInt(val.style.fontSize.split("pt")[0]) > 8)
      .map(val => val.textContent || cell.innerText)
      .join(" ");
  else text = cell.textContent || cell.innerText;

  return prepareText(text);
}
