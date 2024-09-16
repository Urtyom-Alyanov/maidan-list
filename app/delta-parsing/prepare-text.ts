export const removePrefix = (value: string, prefix: string) =>
  value?.startsWith(prefix) ? value?.slice(prefix.length) : value;

export const removeSuffix = (value: string, suffix: string) =>
  value?.endsWith(suffix) ? value.slice(0, -suffix.length) : value;

export function prepareText(text: string): string {
  return removeSuffix(
    removePrefix(
      removePrefix(
        text
          .replaceAll("\r\n\t\t", "")
          .replaceAll("клочков_ПЕТУШАРА", " ")
          .trim(),
        "\n\n"
      ),
      "\n"
    ),
    "\n"
  );
}
