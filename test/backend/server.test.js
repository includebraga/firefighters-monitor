const chai = require("chai");
const chaiHttp = require("chai-http");
const {
  connect,
  mongoose,
  Firefighter
} = require("../../src/backend/config/mongo");
const server = require("../../src/backend/server");
const firefightersApi = require("../../src/backend/firefighters");

const { expect } = chai;
const app = server.listen(3000);

chai.use(chaiHttp);

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

  it("should return firefighters", async () => {
    const firefighters = JSON.parse(
      JSON.stringify(
        await Firefighter.insertMany([
          { name: "Jonh Doe", status: "inactive" },
          { name: "Mary Donina", status: "inactive" },
          { name: "Joaquim Alberto", status: "inactive" }
        ])
      )
    );

    const response = await chai.request(server).get("/api/firefighters");

    expect(response.body).to.be.eql(firefighters);
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

    const response = await chai
      .request(server)
      .put(`/api/firefighters/${firefighters[2].id}`)
      .send({ status: "active" });

    expect(response.body[2].name).to.eq(firefighters[2].name);
    expect(response.body[2].status).to.eq("active");
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

    const response = await chai
      .request(server)
      .put(`/api/firefighters/${firefighters[2].id}`)
      .send({ status: "inactive" });

    expect(response.body[2].name).to.eq(firefighters[2].name);
    expect(response.body[2].status).to.eq("inactive");
  });
});
