/**
 * @amali-tech/country-locale-api
 *
 * Entry point for the package. Keep named exports only — avoid `export default`.
 */

// ── Data ────────────────────────────────────────────────────────────────
export { countries } from "./data/countries.js";

// ── Types ───────────────────────────────────────────────────────────────
export type { Country, Currency, NumberFormat } from "./types/country.js";

// ── Option helpers (for dropdowns / select inputs) ──────────────────────
export { countryOptions, currencyOptions } from "./options.js";

// ── Utility functions ───────────────────────────────────────────────────
export { getCountryInfo } from "./utils/getCountryInfo.js";
export { formatCurrency } from "./utils/formatCurrency.js";
export { formatNumber } from "./utils/formatNumber.js";
export { formatDate } from "./utils/formatDate.js";
