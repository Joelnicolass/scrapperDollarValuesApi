import cron from "node-cron";
import { scrapDollarValuesInArg } from "../scrappers/dolar";
import { scrapNewsEconomy } from "../scrappers/news-economy";

// ejecutar el scrapping cada 5 minutos

export const TASK_SCRAP_DOLLAR = cron.schedule("*/5 * * * *", () => {
  scrapDollarValuesInArg();
  console.log(
    "Ejecutando tarea programada: scrapDollarValuesInArg - cada 5 minutos"
  );
});

// ejecutar el scrapping cada 12 minutos

export const TASK_SCRAP_ECONOMY = cron.schedule("*/12 * * * *", () => {
  scrapNewsEconomy();
  console.log(
    "Ejecutando tarea programada: scrapNewsEconomy - cada 12 minutos"
  );
});
