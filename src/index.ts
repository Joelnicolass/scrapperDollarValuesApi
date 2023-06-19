import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes/app.routes";
import task from "./services/cron/cron.service";
import { scrapDollarValuesInArg } from "./services/scrappers/dolar";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", routes);

app.listen(Number(port), "0.0.0.0", function () {
  console.log(`Server running on port ${port}`);

  // initial task
  scrapDollarValuesInArg();

  task.start();
});
