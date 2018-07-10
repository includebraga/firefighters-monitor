const { expect } = require("chai");
const {
  connect,
  mongoose,
  Firefighter
} = require("../../src/backend/config/mongo");
const firefightersApi = require("../../src/backend/firefighters");

describe("Firefighters API", () => {
  before(async () => {
    await connect();

    await mongoose.connection.db.dropDatabase();
  });

  after(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it("should return all firefighters", async () => {
    const firefighters = JSON.parse(
      JSON.stringify(
        await Firefighter.insertMany([
          { name: "Jonh Doe", active: false },
          { name: "Mary Donina", active: false },
          { name: "Joaquim Alberto", active: false }
        ])
      )
    );

    const response = await firefightersApi.getFirefighters();

    expect(firefighters).to.be.eql(response);
  });

  it("should set firefighter number 2 to active", async () => {
    const firefighters = JSON.parse(
      JSON.stringify(
        await Firefighter.insertMany([
          { name: "Jonh Doe", active: false },
          { name: "Mary Donina", active: false },
          { name: "Joaquim Alberto", active: false }
        ])
      )
    );

    const response = await firefightersApi.addActiveFirefighter(
      firefighters[2].id
    );

    expect(response[2].active).to.be.true;
  });

  it("should set firefighter number 3 to inactive", async () => {
    const firefighters = JSON.parse(
      JSON.stringify(
        await Firefighter.insertMany([
          { name: "Jonh Doe", active: false },
          { name: "Mary Donina", active: false },
          { name: "Joaquim Alberto", active: false }
        ])
      )
    );

    await firefightersApi.addActiveFirefighter(firefighters[2].id);

    const response = await firefightersApi.removeActiveFirefighter(
      firefighters[2].id
    );

    expect(response[2].active).to.be.false;
  });
});
