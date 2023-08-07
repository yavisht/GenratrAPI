const genratr = require("./genratr");

describe("genratr function", () => {
  it("returns null for empty query", () => {
    const password = genratr({});
    expect(password).toBeNull();
  });

  it("returns null for no strength options", () => {
    const password = genratr({ length: 20 });
    expect(password).toBeNull();
  });

  it("returns correct length of password", () => {
    const password = genratr({ numbers: true, length: 20 });
    expect(password.length).toBe(20);
  });

  describe("password generation with character sets", () => {
    it("generates a password with lowercase characters", () => {
      const password = genratr({ lowercase: true });
      expect(password).toMatch(/^[a-z]*$/);
    });

    it("generates a password with uppercase characters", () => {
      const password = genratr({ uppercase: true });
      expect(password).toMatch(/^[A-Z]*$/);
    });

    it("generates a password with numbers", () => {
      const password = genratr({ numbers: true });
      expect(password).toMatch(/^[0-9]*$/);
    });

    it("generates a password with special characters", () => {
      const password = genratr({ special: true });
      expect(password).toMatch(/[!@#$%^&*()_+{}:"'<>?|[\],./`~]*/);
    });

    it("generates a password with a combination of character sets", () => {
      const password = genratr({ lowercase: true, numbers: true });
      expect(password).toMatch(/^[a-z0-9]*$/);
    });
  });

  it("caps the password length at 100 characters", () => {
    const password = genratr({ length: 150, special: true });
    expect(password.length).toBe(100);
  });
});
