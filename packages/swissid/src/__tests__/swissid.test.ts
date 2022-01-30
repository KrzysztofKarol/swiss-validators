import validator from "swiss-validator";

describe("swissid", () => {
  it("should return true if ID is valid", () => {
    // http://www.niederlenz.ch/site/index.cfm?id_art=49435&actMenuItemID=23342&vsprache=DE
    const params = {
      idNumber: "S0002568",
      idNumberCheckDigit: "3",
      birthDate: "810228",
      birthDateCheckDigit: "7",
      expirationDate: "130103",
      expirationDateCheckDigit: "6",
      globalCheckDigit: "2",
    };

    expect(validator(params)).toBe(true);
  });

  it("should return false if ID is not valid", () => {
    const params = {
      idNumber: "S0002568",
      idNumberCheckDigit: "3",
      birthDate: "810228",
      birthDateCheckDigit: "7",
      expirationDate: "130103",
      expirationDateCheckDigit: "6",
      globalCheckDigit: "3",
    };

    expect(validator(params)).toBe(false);
  });
});
