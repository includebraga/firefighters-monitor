const chai = require("chai");
const chaiHttp = require("chai-http");
const { connect, mongoose } = require("../../src/backend/config/mongo");
const { Firefighter } = require("../../src/backend/models");
const server = require("../../src/backend/web/server");
const firefightersApi = require("../../src/backend/repo/firefighters");
const auth = require("../../src/backend/web/auth");

const { expect } = chai;
const app = server.listen(3001);

chai.use(chaiHttp);

describe("Firefighters HTTP API", () => {
  let token;
  let user;

  before(async () => {
    await connect();
    await mongoose.connection.db.dropDatabase();
  });

  beforeEach(async () => {
    user = await firefightersApi.createFirefighter({
      email: "user@gmail.com",
      password: "userpassword"
    });

    token = auth.firefighterToToken(user);
  });

  after(async () => {
    await mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  it("requests without token return an unhauthorized response", async () => {
    const userParams = {
      email: "manuel@gmail.com",
      password: "foobar"
    };

    const response = await chai
      .request(server)
      .post("/api/firefighters")
      .send(userParams);

    expect(response.status).to.eq(401);
  });

  it("should create a user", async () => {
    const userParams = {
      email: "manuel@gmail.com",
      password: "foobar"
    };

    const response = await chai
      .request(server)
      .post("/api/firefighters")
      .set("Authorization", token)
      .send(userParams);

    expect(response.body.email).to.eq(userParams.email);
    expect(response.body.password).to.not.exist;
  });

  it("should authenticate an user with a correct password", async () => {
    const firefighter = await firefightersApi.createFirefighter({
      email: "manuel@gmail.com",
      password: "foobar"
    });

    const response = await chai
      .request(server)
      .post("/api/firefighters/auth")
      .set("Authorization", token)
      .send({
        email: firefighter.email,
        password: "foobar"
      });
    const firefighterFromToken = await auth.tokenToFirefighter(
      response.body.jwt
    );

    expect(response.body.email).to.eq(firefighter.email);
    expect(firefighterFromToken.email).to.eq(firefighter.email);
  });

  it("should not authenticate an user with a incorrect password", async () => {
    const firefighter = await firefightersApi.createFirefighter({
      email: "manuel@gmail.com",
      password: "foobar"
    });

    const response = await chai
      .request(server)
      .post("/api/firefighters/auth")
      .set("Authorization", token)
      .send({
        email: firefighter.email,
        password: "badpassword"
      });

    expect(response.status).to.eq(404);
  });

  it("should return firefighters", async () => {
    const firefighters = JSON.parse(
      JSON.stringify([
        user,
        ...(await Firefighter.insertMany([
          { name: "Jonh Doe", status: "inactive" },
          { name: "Mary Donina", status: "inactive" },
          { name: "Joaquim Alberto", status: "inactive" }
        ]))
      ])
    );

    const response = await chai
      .request(server)
      .get("/api/firefighters")
      .set("Authorization", token);

    expect(response.body).to.be.eql(firefighters);
  });

  it("should set firefighter number 2 to active", async () => {
    const firefighters = JSON.parse(
      JSON.stringify([
        user,
        ...(await Firefighter.insertMany([
          { name: "Jonh Doe", status: "inactive" },
          { name: "Mary Donina", status: "inactive" },
          { name: "Joaquim Alberto", status: "inactive" }
        ]))
      ])
    );

    const response = await chai
      .request(server)
      .put(`/api/firefighters/${firefighters[2].id}`)
      .set("Authorization", token)
      .send({ status: "active" });

    expect(response.body[2].name).to.eq(firefighters[2].name);
    expect(response.body[2].status).to.eq("active");
  });

  it("should set firefighter number 3 to inactive", async () => {
    const firefighters = JSON.parse(
      JSON.stringify([
        user,
        ...(await Firefighter.insertMany([
          { name: "Jonh Doe", status: "inactive" },
          { name: "Mary Donina", status: "inactive" },
          { name: "Joaquim Alberto", status: "inactive" }
        ]))
      ])
    );

    await firefightersApi.updateFirefighter(firefighters[2].id, {
      status: "active"
    });

    const response = await chai
      .request(server)
      .put(`/api/firefighters/${firefighters[2].id}`)
      .set("Authorization", token)
      .send({ status: "inactive" });

    expect(response.body[2].name).to.eq(firefighters[2].name);
    expect(response.body[2].status).to.eq("inactive");
  });
});
