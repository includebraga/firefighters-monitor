const faker = require("faker");
const { Factory } = require("rosie");
const { sample } = require("lodash");
const Firefighter = require("../../models/firefighter");

const firefightersFactory = new Factory().attrs({
  name: faker.name.firstName,
  code: faker.random.uuid(),
  password: "foobar",
  status: sample("active", "inactive", "busy")
});

firefightersFactory.create = (...args) =>
  Firefighter.create(firefightersFactory.build(...args));

firefightersFactory.createList = (...args) =>
  Firefighter.insertMany(firefightersFactory.buildList(...args));

module.exports = { firefightersFactory };
