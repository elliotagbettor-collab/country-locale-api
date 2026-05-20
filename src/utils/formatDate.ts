import { countries } from "../data/countries";

/**
 * Formats a date according to the date format pattern of the country
 * matching the given locale.
 *
 * Supported tokens: `yyyy`, `MM`, `dd`.
 *
 * @param date - A Date object, ISO-8601 string, or Unix timestamp (ms).
 * @param locale - The BCP 47 language tag (e.g. 'en-US', 'de-DE').
 * @returns The formatted date string.
 * @throws {TypeError} If the date cannot be parsed or locale is empty.
 */
export function formatDate(
  date: Date | string | number,
  locale: string,
): string {
  if (typeof locale !== "string" || !locale.trim()) {
    throw new TypeError("Locale must be a non-empty string");
  }

  const parsed = date instanceof Date ? date : new Date(date);

  if (isNaN(parsed.getTime())) {
    throw new TypeError("Date must be a valid Date, ISO string, or timestamp");
  }

  const trimmedLocale = locale.trim();

  // Look up the country for this locale to get its dateFormat pattern
  let country = countries.find(
    (c) => c.locale.toLowerCase() === trimmedLocale.toLowerCase(),
  );

  // Fall back to matching the primary language subtag
  if (!country) {
    const primaryLang = trimmedLocale.split("-")[0].toLowerCase();
    country = countries.find(
      (c) => c.locale.split("-")[0].toLowerCase() === primaryLang,
    );
  }

  const pattern = country?.dateFormat ?? "dd/MM/yyyy";

  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = String(parsed.getFullYear());

  return pattern
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day);
}
