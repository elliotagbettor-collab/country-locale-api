import { countries } from "../data/countries";

/**
 * Formats a numeric amount as currency based on the provided locale.
 *
 * @param amount The numeric amount to format.
 * @param locale The BCP 47 language tag (e.g. 'en-US', 'de-DE').
 * @returns The formatted currency string.
 */
export function formatCurrency(amount: number, locale: string): string {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new TypeError("Amount must be a valid number");
  }
  if (typeof locale !== "string" || !locale.trim()) {
    throw new TypeError("Locale must be a non-empty string");
  }

  const trimmedLocale = locale.trim();

  // Try to find an exact match for the locale
  let country = countries.find(
    (c) => c.locale.toLowerCase() === trimmedLocale.toLowerCase()
  );

  // If no exact match, match by the primary language tag (e.g., "en" from "en-US")
  if (!country) {
    const primaryLang = (trimmedLocale.split("-")[0] ?? "").toLowerCase();
    country = countries.find(
      (c) => (c.locale.split("-")[0] ?? "").toLowerCase() === primaryLang,
    );
  }

  const currencyCode = country ? country.currency.code : "USD";

  return new Intl.NumberFormat(trimmedLocale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}
