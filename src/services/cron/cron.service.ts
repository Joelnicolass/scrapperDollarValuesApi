import cron from "node-cron";
import { scrapDollarValuesInArg } from "../scrappers/dolar";

// ejecutar el scrapping cada 5 minutos

const task = cron.schedule("*/5 * * * *", () => {
  scrapDollarValuesInArg();
  console.log("running a task every 5 minutes");
});

export default task;
