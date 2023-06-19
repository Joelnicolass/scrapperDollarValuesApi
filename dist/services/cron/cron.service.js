"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASK_SCRAP_ECONOMY = exports.TASK_SCRAP_DOLLAR = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dolar_1 = require("../scrappers/dolar");
const news_economy_1 = require("../scrappers/news-economy");
// ejecutar el scrapping cada 5 minutos
exports.TASK_SCRAP_DOLLAR = node_cron_1.default.schedule("*/5 * * * *", () => {
    (0, dolar_1.scrapDollarValuesInArg)();
    console.log("Ejecutando tarea programada: scrapDollarValuesInArg - cada 5 minutos");
});
// ejecutar el scrapping cada 12 minutos
exports.TASK_SCRAP_ECONOMY = node_cron_1.default.schedule("*/12 * * * *", () => {
    (0, news_economy_1.scrapNewsEconomy)();
    console.log("Ejecutando tarea programada: scrapNewsEconomy - cada 12 minutos");
});
