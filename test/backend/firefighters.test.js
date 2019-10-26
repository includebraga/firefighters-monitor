const { expect } = require("chai");
const { connect, mongoose } = require("../../src/backend/config/mongo");
const { Firefighter } = require("../../src/backend/models");
const firefightersApi = require("../../src/backend/repo/firefighters");

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

  it("should create a user", async () => {
    const firefighter = await firefightersApi.createFirefighter({
      email: "manuel@gmail.com",
      password: "foobar"
    });

    expect(firefighter.email).to.eq("manuel@gmail.com");
    // Should not be equal but should exist, because the password is hashed
    expect(firefighter.password).to.not.eq("foobar");
    expect(firefighter.password).to.exist;
  });

  it("should authenticate an user with a correct password", async () => {
    const firefighter = await firefightersApi.createFirefighter({
      email: "manuel@gmail.com",
      password: "foobar"
    });

    const authedFirefighter = await firefightersApi.authenticateFirefighter(
      firefighter.email,
      "foobar"
    );

    expect(authedFirefighter.email).to.eq(firefighter.email);
  });

  it("should not authenticate an user with a incorrect password", async () => {
    const firefighter = await firefightersApi.createFirefighter({
      email: "manuel@gmail.com",
      password: "foobar"
    });

    const auth = await firefightersApi.authenticateFirefighter(
      firefighter.email,
      "badpassword"
    );

    expect(auth).to.not.exist;
  });

  it("should return all firefighters", async () => {
    const firefighters = JSON.parse(
      JSON.stringify(
        await Firefighter.insertMany([
          { name: "Jonh Doe", status: "inactive" },
          { name: "Mary Donina", status: "inactive" },
          { name: "Joaquim Alberto", status: "inactive" }
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
          { name: "Jonh Doe", status: "inactive" },
          { name: "Mary Donina", status: "inactive" },
          { name: "Joaquim Alberto", status: "inactive" }
        ])
      )
    );

    const response = await firefightersApi.updateFirefighter(
      firefighters[2].id,
      {
        status: "active"
      }
    );

    expect(response[2].name).to.eq(firefighters[2].name);
    expect(response[2].status).to.eq("active");
  });

  it("should set firefighter number 3 to inactive", async () => {
    const firefighters = JSON.parse(
      JSON.stringify(
        await Firefighter.insertMany([
          { name: "Jonh Doe", status: "inactive" },
          { name: "Mary Donina", status: "inactive" },
          { name: "Joaquim Alberto", status: "inactive" }
        ])
      )
    );

    await firefightersApi.updateFirefighter(firefighters[2].id, {
      status: "active"
    });

    const response = await firefightersApi.updateFirefighter(
      firefighters[2].id,
      {
        status: "inactive"
      }
    );

    expect(response[2].name).to.eq(firefighters[2].name);
    expect(response[2].status).to.eq("inactive");
  });
});
