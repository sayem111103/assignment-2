import app from "./app";
import config from "./config";
import { initDB } from "./db/db.connection";

const main = () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`app server listening on port ${config.port}`);
  });
};

main();
