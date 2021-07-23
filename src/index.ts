import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
require('dotenv').config();
import postRoutes from "./routes/postRoute";
import peopleRoutes from "./routes/relationships/peopleRoute";

createConnection()
  .then(async (connection) => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use("/", postRoutes);
    app.use("/", peopleRoutes);

    app.listen(3000, () => console.log("App is running at port 3000."));
  })
  .catch((error) => console.log(error));
