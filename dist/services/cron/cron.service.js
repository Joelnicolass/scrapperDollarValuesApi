"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dolar_1 = require("../scrappers/dolar");
// ejecutar el scrapping cada 5 minutos
const task = node_cron_1.default.schedule("*/5 * * * *", () => {
    (0, dolar_1.scrapDollarValuesInArg)();
    console.log("running a task every 5 minutes");
});
exports.default = task;
