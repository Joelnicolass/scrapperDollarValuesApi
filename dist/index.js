"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app_routes_1 = __importDefault(require("./routes/app.routes"));
const cron_service_1 = __importDefault(require("./services/cron/cron.service"));
const dolar_1 = require("./services/scrappers/dolar");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/api/v1", app_routes_1.default);
app.listen(Number(port), "0.0.0.0", function () {
    console.log(`Server running on port ${port}`);
    // initial task
    (0, dolar_1.scrapDollarValuesInArg)();
    cron_service_1.default.start();
});
