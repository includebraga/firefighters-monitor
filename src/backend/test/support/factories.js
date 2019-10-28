const faker = require("faker");
const { Factory } = require("rosie");
const Firefighter = require("../../models/firefighter");

const firefightersFactory = new Factory().attrs({
  name: faker.name.firstName,
  email: faker.internet.email(),
  password: "foobar"
});

firefightersFactory.create = (...args) =>
  Firefighter.create(firefightersFactory.build(...args));

firefightersFactory.createList = (...args) =>
  Firefighter.insertMany(firefightersFactory.buildList(...args));

module.exports = { firefightersFactory };
