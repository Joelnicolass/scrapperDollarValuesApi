import express from "express";
import cors from "cors";
import routes from "./routes/app.routes";
import { scrapDollarValuesInArg } from "./services/scrappers/dolar";
import { scrapNewsEconomy } from "./services/scrappers/news-economy";
import {
  TASK_SCRAP_DOLLAR,
  TASK_SCRAP_ECONOMY,
} from "./services/cron/cron.service";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", routes);

app.listen(Number(port), "0.0.0.0", function () {
  console.log(`Server running on port ${port}`);

  scrapDollarValuesInArg();
  scrapNewsEconomy();

  TASK_SCRAP_DOLLAR.start();
  TASK_SCRAP_ECONOMY.start();
});
