const genratr = require("./genratr");

// Patterns for validation
const REGEX = {
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+{}:"'<>?|[\]\\;,.\/~`]/,
  onlyLowercase: /^[a-z]+$/,
  onlyUppercase: /^[A-Z]+$/,
  onlyNumbers: /^[0-9]+$/,
  onlySpecial: /^[!@#$%^&*()_+{}:"'<>?|[\]\\;,.\/~`]+$/,
};

describe("genratr()", () => {
  it("returns null for an empty query", () => {
    expect(genratr({})).toBeNull();
  });

  it("returns null when no character sets are selected", () => {
    expect(genratr({ length: 20 })).toBeNull();
  });

  it("defaults to 12 characters when length is missing or invalid", () => {
    expect(genratr({ lowercase: true }).length).toBe(12);
    expect(genratr({ lowercase: true, length: "not-a-number" }).length).toBe(
      12
    );
    expect(genratr({ lowercase: true, length: -5 }).length).toBe(12);
  });

  it("limits password length to 100 characters", () => {
    expect(genratr({ lowercase: true, length: 200 }).length).toBe(100);
  });

  describe("single character sets", () => {
    it("generates only lowercase characters", () => {
      const pw = genratr({ lowercase: true });
      expect(pw).toMatch(REGEX.onlyLowercase);
    });

    it("generates only uppercase characters", () => {
      const pw = genratr({ uppercase: true });
      expect(pw).toMatch(REGEX.onlyUppercase);
    });

    it("generates only numeric characters", () => {
      const pw = genratr({ numbers: true });
      expect(pw).toMatch(REGEX.onlyNumbers);
    });

    it("generates only special characters", () => {
      const pw = genratr({ special: true });
      expect(pw).toMatch(REGEX.onlySpecial);
    });
  });

  describe("multiple character sets", () => {
    it("includes at least one character from each selected set", () => {
      const pw = genratr({
        length: 20,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true,
      });

      expect(pw.length).toBe(20);
      expect(pw).toMatch(REGEX.lowercase);
      expect(pw).toMatch(REGEX.uppercase);
      expect(pw).toMatch(REGEX.number);
      expect(pw).toMatch(REGEX.special);
    });

    it("works with short length equal to number of active sets", () => {
      const pw = genratr({
        length: 4,
        lowercase: true,
        uppercase: true,
        numbers: true,
        special: true,
      });

      expect(pw.length).toBe(4);
      expect(pw).toMatch(REGEX.lowercase);
      expect(pw).toMatch(REGEX.uppercase);
      expect(pw).toMatch(REGEX.number);
      expect(pw).toMatch(REGEX.special);
    });

    it("increases length if too short for selected sets", () => {
      const pw = genratr({
        length: 2,
        lowercase: true,
        uppercase: true,
        special: true,
      });

      expect(pw.length).toBe(3); // ensures minimum length matches selected sets
      expect(pw).toMatch(REGEX.lowercase);
      expect(pw).toMatch(REGEX.uppercase);
      expect(pw).toMatch(REGEX.special);
    });
  });
});
