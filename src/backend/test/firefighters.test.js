const { expect } = require("chai");
const { connect, mongoose } = require("../config/mongo");
const firefightersApi = require("../repo/firefighters");
const { firefightersFactory } = require("./support/factories");
const { serialize } = require("./support/utils");

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
    const firefighterParams = firefightersFactory.build();

    const firefighter = await firefightersApi.createFirefighter(
      firefighterParams
    );

    expect(firefighter.code).to.eq(firefighterParams.code);
    // Should not be equal but should exist, because the password is hashed
    expect(firefighter.password).to.not.eq("foobar");
    expect(firefighter.password).to.exist;
  });

  it("should authenticate an user with a correct password", async () => {
    const firefighter = await firefightersFactory.create();

    const authedFirefighter = await firefightersApi.authenticateFirefighter(
      firefighter.code,
      "foobar"
    );

    expect(authedFirefighter.code).to.eq(firefighter.code);
  });

  it("should not authenticate an user with a incorrect password", async () => {
    const firefighter = await firefightersFactory.create();

    const auth = await firefightersApi.authenticateFirefighter(
      firefighter.code,
      "badpassword"
    );

    expect(auth).to.not.exist;
  });

  it("should return all firefighters", async () => {
    const firefighters = serialize(await firefightersFactory.createList(3));

    const response = await firefightersApi.getFirefighters();

    expect(firefighters).to.be.eql(response);
  });

  it("should set firefighter number 2 to active", async () => {
    const firefighters = serialize(await firefightersFactory.createList(3));

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
    const firefighters = serialize(await firefightersFactory.createList(3));

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
