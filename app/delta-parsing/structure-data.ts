export function structureData<Name extends string = string>(
  data: (string | number | string[])[][],
  names: Name[]
): Record<Name, string | number | string[]>[] {
  return data.map(rawSubj => {
    const subj = {} as Record<Name, string | number | string[]>;

    names.forEach((name, index) => {
      subj[name] = rawSubj[index] || "NOT_INFO";
    });

    return subj;
  });
}
