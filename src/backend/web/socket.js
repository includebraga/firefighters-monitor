const socketIo = require("socket.io");
const firefightersRepo = require("../repo/firefighters");
const { tokenToFirefighter } = require("./auth");

module.exports = server => {
  const io = socketIo.listen(server);

  const broadcastFirefighters = firefighters =>
    io.sockets.emit("firefighters", firefighters);

  const updateFirefighterHandler = async data => {
    if (!data.id || !data.payload) return;

    const firefighterId = data.id;
    const updatedFirefighters = await firefightersRepo.updateFirefighter(
      firefighterId,
      data.payload
    );

    broadcastFirefighters(updatedFirefighters);
  };

  io.use(async (socket, next) => {
    const token = socket.handshake.headers.Authorization;

    if (await tokenToFirefighter(token)) {
      return next();
    }

    return next(new Error("authentication error"));
  });

  io.on("connection", async socket => {
    const firefighters = await firefightersRepo.getFirefighters();

    broadcastFirefighters(firefighters);

    socket.on("update_firefighter", updateFirefighterHandler);
  });
};
