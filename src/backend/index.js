const cluster = require("cluster");
const numCpus = require("os").cpus().length;
const app = require("./web/server.js");
const { connect } = require("./config/mongo");

const port = process.env.PORT || 3000;
const numProcesses = process.env.NR_PROCESSES || numCpus;

if (cluster.isMaster) {
  for (let i = 0; i < numProcesses; i += 1) {
    cluster.fork();
  }
} else {
  connect();

  app.listen(port, () =>
    console.log(`firefighters-monitor listening on port ${port}`)
  );
}

cluster.on("exit", (worker, code, signal) => {
  console.log(
    "Worker %d died with code/signal %s. Restarting worker...",
    worker.process.pid,
    signal || code
  );
  cluster.fork();
});
