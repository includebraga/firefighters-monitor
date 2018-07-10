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
          { name: "Jonh Doe", active: false },
          { name: "Mary Donina", active: false },
          { name: "Joaquim Alberto", active: false }
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
          { name: "Jonh Doe", active: false },
          { name: "Mary Donina", active: false },
          { name: "Joaquim Alberto", active: false }
        ])
      )
    );

    const response = await chai
      .request(server)
      .post(`/api/firefighters/active/${firefighters[2].id}`);

    expect(response.body[2].active).to.be.true;
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

    const response = await chai
      .request(server)
      .delete(`/api/firefighters/active/${firefighters[2].id}`);

    expect(response.body[2].active).to.be.false;
  });
});
