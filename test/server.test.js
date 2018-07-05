const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/backend/server");
const firefightersApi = require("../src/backend/firefighters");

const { expect } = chai;
const app = server.listen(3000);

chai.use(chaiHttp);

describe("Firefighters HTTP API", () => {
  afterEach(() => {
    firefightersApi.resetFirefighters();
  });

  it("should return firefighters", async () => {
    const response = await chai.request(server).get("/api/firefighters");

    const firefighters = response.body;

    expect(firefighters).to.be.eql(firefightersApi.getFirefighters());
  });

  it("should set firefighter number 2 to active", async () => {
    const response = await chai
      .request(server)
      .post("/api/firefighters/active/2");

    const firefighters = response.body;

    expect(firefighters).to.be.eql([
      { name: "Jonh Doe", active: false },
      { name: "Mary Donina", active: true },
      { name: "Joaquim Alberto", active: false }
    ]);
  });

  it("should set firefighter number 3 to inactive", async () => {
    firefightersApi.addActiveFirefighter(3);
    const response = await chai
      .request(server)
      .delete("/api/firefighters/active/3");

    const firefighters = response.body;

    expect(firefighters).to.be.eql([
      { name: "Jonh Doe", active: false },
      { name: "Mary Donina", active: false },
      { name: "Joaquim Alberto", active: false }
    ]);
  });

  after(() => {
    app.close();
  });
});
