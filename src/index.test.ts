import { describe, expect, it } from "vitest";
import {
  countries,
  countryOptions,
  currencyOptions,
  getCountryInfo,
  formatCurrency,
  formatNumber,
  formatDate,
} from "./index.js";

// ── countries data ──────────────────────────────────────────────────────
describe("countries", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
  });

  it("contains expected fields for Ghana", () => {
    const ghana = countries.find((c) => c.code === "GH");
    expect(ghana).toBeDefined();
    expect(ghana?.name).toBe("Ghana");
    expect(ghana?.currency.code).toBe("GHS");
    expect(ghana?.numberFormat.decimalSeparator).toBe(".");
  });

  it("has no duplicate country codes", () => {
    const codes = countries.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });
});

// ── countryOptions ──────────────────────────────────────────────────────
describe("countryOptions", () => {
  it("is a non-empty array with key/label entries", () => {
    expect(countryOptions.length).toBeGreaterThan(0);
    for (const opt of countryOptions) {
      expect(opt).toHaveProperty("key");
      expect(opt).toHaveProperty("label");
      expect(typeof opt.key).toBe("string");
      expect(typeof opt.label).toBe("string");
    }
  });

  it("contains a US entry", () => {
    const us = countryOptions.find((o) => o.key === "US");
    expect(us).toBeDefined();
    expect(us?.label).toBe("United States");
  });

  it("has the same length as the countries array", () => {
    expect(countryOptions.length).toBe(countries.length);
  });
});

// ── currencyOptions ─────────────────────────────────────────────────────
describe("currencyOptions", () => {
  it("is a non-empty array with key/label entries", () => {
    expect(currencyOptions.length).toBeGreaterThan(0);
    for (const opt of currencyOptions) {
      expect(opt).toHaveProperty("key");
      expect(opt).toHaveProperty("label");
    }
  });

  it("contains USD", () => {
    const usd = currencyOptions.find((o) => o.label === "USD");
    expect(usd).toBeDefined();
    expect(usd?.key).toBe("$");
  });

  it("deduplicates currencies (EUR appears once)", () => {
    const eurEntries = currencyOptions.filter((o) => o.label === "EUR");
    expect(eurEntries.length).toBe(1);
  });
});

// ── getCountryInfo ──────────────────────────────────────────────────────
describe("getCountryInfo", () => {
  it("finds a country by name (case-insensitive)", () => {
    const ghana = getCountryInfo("ghana");
    expect(ghana).toBeDefined();
    expect(ghana?.code).toBe("GH");
  });

  it("finds a country by 2-letter code", () => {
    const us = getCountryInfo("US");
    expect(us).toBeDefined();
    expect(us?.name).toBe("United States");
  });

  it("trims whitespace", () => {
    expect(getCountryInfo("  Ghana  ")?.code).toBe("GH");
  });

  it("returns undefined for an unknown country", () => {
    expect(getCountryInfo("Atlantis")).toBeUndefined();
  });

  it("returns undefined for an empty string", () => {
    expect(getCountryInfo("")).toBeUndefined();
  });

  it("returns undefined for whitespace-only string", () => {
    expect(getCountryInfo("   ")).toBeUndefined();
  });
});

// ── formatCurrency ──────────────────────────────────────────────────────
describe("formatCurrency", () => {
  it("formats USD amounts for en-US", () => {
    const result = formatCurrency(1234.56, "en-US");
    expect(result).toContain("1,234.56");
  });

  it("formats EUR amounts for de-DE", () => {
    const result = formatCurrency(1234.56, "de-DE");
    // German locale uses comma for decimal, dot or period for thousands
    expect(result).toContain("€");
  });

  it("formats GHS amounts for en-GH", () => {
    const result = formatCurrency(1000, "en-GH");
    // Intl uses the narrow symbol GH₵ for Ghanaian Cedi
    expect(result).toContain("1,000");
  });

  it("throws on NaN", () => {
    expect(() => formatCurrency(NaN, "en-US")).toThrow(TypeError);
  });

  it("throws on empty locale", () => {
    expect(() => formatCurrency(100, "")).toThrow(TypeError);
  });

  it("handles zero", () => {
    const result = formatCurrency(0, "en-US");
    expect(result).toContain("0");
  });

  it("handles negative amounts", () => {
    const result = formatCurrency(-500.25, "en-US");
    expect(result).toContain("500.25");
  });
});

// ── formatNumber ────────────────────────────────────────────────────────
describe("formatNumber", () => {
  it("formats with en-US grouping", () => {
    expect(formatNumber(1234567.89, "en-US")).toBe("1,234,567.89");
  });

  it("formats with de-DE grouping", () => {
    const result = formatNumber(1234567.89, "de-DE");
    // German uses comma for decimal and period for thousands
    expect(result).toContain("1.234.567,89");
  });

  it("handles integers", () => {
    expect(formatNumber(1000, "en-US")).toBe("1,000");
  });

  it("handles zero", () => {
    expect(formatNumber(0, "en-US")).toBe("0");
  });

  it("handles negative numbers", () => {
    const result = formatNumber(-42.5, "en-US");
    expect(result).toContain("42.5");
  });

  it("throws on NaN", () => {
    expect(() => formatNumber(NaN, "en-US")).toThrow(TypeError);
  });

  it("throws on empty locale", () => {
    expect(() => formatNumber(100, "")).toThrow(TypeError);
  });
});

// ── formatDate ──────────────────────────────────────────────────────────
describe("formatDate", () => {
  // Use a fixed date: 2025-03-15
  const testDate = new Date(2025, 2, 15); // March 15, 2025

  it("formats en-US dates as MM/dd/yyyy", () => {
    expect(formatDate(testDate, "en-US")).toBe("03/15/2025");
  });

  it("formats de-DE dates as dd.MM.yyyy", () => {
    expect(formatDate(testDate, "de-DE")).toBe("15.03.2025");
  });

  it("formats en-GH dates as dd/MM/yyyy", () => {
    expect(formatDate(testDate, "en-GH")).toBe("15/03/2025");
  });

  it("formats ja-JP dates as yyyy/MM/dd", () => {
    expect(formatDate(testDate, "ja-JP")).toBe("2025/03/15");
  });

  it("formats zh-CN dates as yyyy-MM-dd", () => {
    expect(formatDate(testDate, "zh-CN")).toBe("2025-03-15");
  });

  it("accepts an ISO string", () => {
    expect(formatDate("2025-03-15T00:00:00", "en-US")).toBe("03/15/2025");
  });

  it("accepts a timestamp number", () => {
    const ts = new Date(2025, 2, 15).getTime();
    expect(formatDate(ts, "en-US")).toBe("03/15/2025");
  });

  it("throws on invalid date", () => {
    expect(() => formatDate("not-a-date", "en-US")).toThrow(TypeError);
  });

  it("throws on empty locale", () => {
    expect(() => formatDate(testDate, "")).toThrow(TypeError);
  });

  it("falls back to dd/MM/yyyy for unknown locales", () => {
    expect(formatDate(testDate, "xx-XX")).toBe("15/03/2025");
  });
});
