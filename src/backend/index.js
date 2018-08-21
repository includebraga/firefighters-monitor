const http = require("http");
const app = require("./web/server");
const socket = require("./web/socket");
const { connect } = require("./config/mongo");

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  connect();
  socket(server);

  console.log(`Starting server instance @ port ${port}`);
});
