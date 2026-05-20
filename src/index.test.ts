import { describe, expect, it } from "vitest";
import { countries } from "./index.js";

describe("country-locale-api", () => {
  it("exports an array of countries", () => {
    expect(Array.isArray(countries)).toBe(true);
    expect(countries.length).toBeGreaterThan(0);
  });

  it("contains expected country fields", () => {
    const ghana = countries.find((c) => c.code === "GH");
    expect(ghana).toBeDefined();
    expect(ghana?.name).toBe("Ghana");
    expect(ghana?.currency.code).toBe("GHS");
    expect(ghana?.numberFormat.decimalSeparator).toBe(".");
  });
});
