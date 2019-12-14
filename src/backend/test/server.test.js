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

async function createUserAndToken(options) {
  const user = await firefightersFactory.create(options);
  const token = auth.firefighterToToken(user);

  return { user, token };
}

describe("Firefighters HTTP API", () => {
  before(async () => {
    await connect();
    await mongoose.connection.db.dropDatabase();
  });

  after(async () => {
    await mongoose.disconnect();
    app.close();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  describe("POST /api/auth", () => {
    it("should authenticate an user with a correct password", async () => {
      const firefighter = await firefightersFactory.create();

      const response = await chai
        .request(server)
        .post("/api/auth")
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
      const { token } = await createUserAndToken({ role: "admin" });
      const firefighter = await firefightersFactory.create();

      const response = await chai
        .request(server)
        .post("/api/uth")
        .set("Authorization", token)
        .send({
          code: firefighter.code,
          password: "badpassword"
        });

      expect(response.status).to.eq(404);
    });
  });

  describe("POST /api/admin/firefighters", () => {
    it("requests without token return an unhauthorized response", async () => {
      const userParams = firefightersFactory.build();

      const response = await chai
        .request(server)
        .post("/api/admin/firefighters")
        .send(userParams);

      expect(response.status).to.eq(401);
    });

    it("requests from non-admin return an unhauthorized response", async () => {
      const { token } = await createUserAndToken();
      const userParams = firefightersFactory.build();

      const response = await chai
        .request(server)
        .post("/api/admin/firefighters")
        .set("Authorization", token)
        .send(userParams);

      expect(response.status).to.eq(401);
    });

    it("should create a user", async () => {
      const { token } = await createUserAndToken({ role: "admin" });
      const userParams = firefightersFactory.build();

      const response = await chai
        .request(server)
        .post("/api/admin/firefighters")
        .set("Authorization", token)
        .send(userParams);

      expect(response.body.code).to.eq(userParams.code);
      expect(response.body.password).to.not.exist;
    });
  });

  describe("GET /api/admin/firefighters", () => {
    it("requests without token return an unhauthorized response", async () => {
      const userParams = firefightersFactory.build();

      const response = await chai
        .request(server)
        .get("/api/admin/firefighters")
        .send(userParams);

      expect(response.status).to.eq(401);
    });

    it("requests from non-admin return an unhauthorized response", async () => {
      const { token } = await createUserAndToken();
      const userParams = firefightersFactory.build();

      const response = await chai
        .request(server)
        .get("/api/admin/firefighters")
        .set("Authorization", token)
        .send(userParams);

      expect(response.status).to.eq(401);
    });

    it("should return firefighters", async () => {
      const { user, token } = await createUserAndToken({ role: "admin" });
      const firefighters = serialize([
        user,
        ...(await firefightersFactory.createList(3))
      ]);

      const response = await chai
        .request(server)
        .get("/api/admin/firefighters")
        .set("Authorization", token);

      expect(response.body).to.be.eql(firefighters);
    });
  });

  describe("PUT /api/admin/firefighters/:id", () => {
    it("requests without token return an unhauthorized response", async () => {
      const userParams = firefightersFactory.build();

      const response = await chai
        .request(server)
        .put("/api/admin/firefighters")
        .send(userParams);

      expect(response.status).to.eq(401);
    });

    it("requests from non-admin return an unhauthorized response", async () => {
      const { token } = await createUserAndToken();
      const userParams = firefightersFactory.build();

      const response = await chai
        .request(server)
        .put("/api/admin/firefighters")
        .set("Authorization", token)
        .send(userParams);

      expect(response.status).to.eq(401);
    });

    it("should update firefighters", async () => {
      const { user, token } = await createUserAndToken({ role: "admin" });
      const firefighters = serialize([
        user,
        ...(await firefightersFactory.createList(3))
      ]);

      await firefightersApi.updateFirefighter(firefighters[2].id, {
        status: "active"
      });

      const response = await chai
        .request(server)
        .put(`/api/admin/firefighters/${firefighters[2].id}`)
        .set("Authorization", token)
        .send({ status: "inactive" });

      expect(response.body[2].name).to.eq(firefighters[2].name);
      expect(response.body[2].status).to.eq("inactive");
    });
  });
});
