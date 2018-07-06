const { expect } = require("chai");
const firefightersApi = require("../../src/backend/firefighters");

describe("Firefighters API", () => {
  afterEach(() => {
    firefightersApi.resetFirefighters();
  });

  it("should return all firefighters", () => {
    const firefighters = firefightersApi.getFirefighters();

    expect(firefighters).to.be.eql([
      { name: "Jonh Doe", active: false },
      { name: "Mary Donina", active: false },
      { name: "Joaquim Alberto", active: false }
    ]);
  });

  it("should set firefighter number 2 to active", () => {
    const firefighters = firefightersApi.addActiveFirefighter(2);

    expect(firefighters).to.be.eql([
      { name: "Jonh Doe", active: false },
      { name: "Mary Donina", active: true },
      { name: "Joaquim Alberto", active: false }
    ]);
  });

  it("should set firefighter number 3 to inactive", () => {
    firefightersApi.addActiveFirefighter(3);
    const firefighters = firefightersApi.removeActiveFirefighter(3);

    expect(firefighters).to.be.eql([
      { name: "Jonh Doe", active: false },
      { name: "Mary Donina", active: false },
      { name: "Joaquim Alberto", active: false }
    ]);
  });
});
