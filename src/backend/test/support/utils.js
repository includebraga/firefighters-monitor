function serialize(mongooseObj) {
  return JSON.parse(JSON.stringify(mongooseObj));
}

module.exports = { serialize };
