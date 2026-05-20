import { countries } from "./data/countries.js";

/**
 * Pre-built country options for dropdown / select inputs.
 *
 * Each entry has `{ key: "<ISO code>", label: "<Country name>" }`.
 */
export const countryOptions: ReadonlyArray<{ key: string; label: string }> =
  countries.map((c) => ({ key: c.code, label: c.name }));

/**
 * Pre-built currency options for dropdown / select inputs.
 *
 * Each entry has `{ key: "<symbol>", label: "<currency code>" }`.
 * Duplicates (e.g. multiple EUR countries) are deduplicated by currency code.
 */
export const currencyOptions: ReadonlyArray<{ key: string; label: string }> =
  Array.from(
    new Map(
      countries.map((c) => [c.currency.code, { key: c.currency.symbol, label: c.currency.code }]),
    ).values(),
  );
