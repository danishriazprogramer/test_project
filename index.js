import { config } from "dotenv";
import http from "http";
import {database} from "./src/config/db.js";
import { app } from "./app.js";
import { swaggerServe, swaggerSetup } from "./swagger.js";

// add configuration
config();
// database configuration
database();

app.use("/api", swaggerServe, swaggerSetup);
let port= process.env.PORT || 8080;
http
  .createServer(app)
  .listen(port, () => console.log("Server listening on port: " + port));
