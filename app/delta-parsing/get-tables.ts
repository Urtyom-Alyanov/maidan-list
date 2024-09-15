export function getTablesFromDocument(
  doc: Document
): readonly [HTMLTableElement, HTMLTableElement] {
  const tables = doc.querySelectorAll("table");
  const orgs = tables[0];
  const users = tables[1];

  return [orgs, users] as const;
}
