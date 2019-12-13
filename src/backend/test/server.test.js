const chai = require("chai");
const chaiHttp = require("chai-http");
const { connect, mongoose } = require("../config/mongo");
const server = require("../web/server");
const firefightersApi = require("../repo/firefighters");
const auth = require("../web/auth");
const { firefightersFactory } = require("./support/factories");
const { serialize } = require("./support/utils");

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
    user = await firefightersFactory.create();

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
    const userParams = firefightersFactory.build();

    const response = await chai
      .request(server)
      .post("/api/firefighters")
      .send(userParams);

    expect(response.status).to.eq(401);
  });

  it("should create a user", async () => {
    const userParams = firefightersFactory.build();

    const response = await chai
      .request(server)
      .post("/api/firefighters")
      .set("Authorization", token)
      .send(userParams);

    expect(response.body.code).to.eq(userParams.code);
    expect(response.body.password).to.not.exist;
  });

  it("should authenticate an user with a correct password", async () => {
    const firefighter = await firefightersFactory.create();

    const response = await chai
      .request(server)
      .post("/api/firefighters/auth")
      .send({
        code: firefighter.code,
        password: "foobar"
      });
    const firefighterFromToken = await auth.tokenToFirefighter(
      response.body.jwt
    );

    expect(response.body.code).to.eq(firefighter.code);
    expect(firefighterFromToken.code).to.eq(firefighter.code);
  });

  it("should not authenticate an user with a incorrect password", async () => {
    const firefighter = await firefightersFactory.create();

    const response = await chai
      .request(server)
      .post("/api/firefighters/auth")
      .set("Authorization", token)
      .send({
        code: firefighter.code,
        password: "badpassword"
      });

    expect(response.status).to.eq(404);
  });

  it("should return firefighters", async () => {
    const firefighters = serialize([
      user,
      ...(await firefightersFactory.createList(3))
    ]);

    const response = await chai
      .request(server)
      .get("/api/firefighters")
      .set("Authorization", token);

    expect(response.body).to.be.eql(firefighters);
  });

  it("should set firefighter number 2 to active", async () => {
    const firefighters = serialize([
      user,
      ...(await firefightersFactory.createList(3))
    ]);

    const response = await chai
      .request(server)
      .put(`/api/firefighters/${firefighters[2].id}`)
      .set("Authorization", token)
      .send({ status: "active" });

    expect(response.body[2].name).to.eq(firefighters[2].name);
    expect(response.body[2].status).to.eq("active");
  });

  it("should set firefighter number 3 to inactive", async () => {
    const firefighters = serialize([
      user,
      ...(await firefightersFactory.createList(3))
    ]);

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
