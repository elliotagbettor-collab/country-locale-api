/**
 * Formats a numeric value based on the provided locale.
 *
 * @param value The numeric value to format.
 * @param locale The BCP 47 language tag (e.g. 'en-US', 'de-DE').
 * @returns The formatted number string.
 */
export function formatNumber(value: number, locale: string): string {
  if (typeof value !== "number" || isNaN(value)) {
    throw new TypeError("Value must be a valid number");
  }
  if (typeof locale !== "string" || !locale.trim()) {
    throw new TypeError("Locale must be a non-empty string");
  }

  return new Intl.NumberFormat(locale.trim()).format(value);
}
