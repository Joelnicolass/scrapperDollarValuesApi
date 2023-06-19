"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapDollarValuesInArg = void 0;
const playwright_1 = require("playwright");
const scrapDollarValuesInArg = () => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield playwright_1.chromium.launch({ headless: true });
    const page = yield browser.newPage();
    yield page.goto("https://www.lanacion.com.ar/dolar-hoy", {
        timeout: 0,
    });
    const data = yield page.evaluate(() => {
        const ul = document.querySelector(".dolar-subgroup ");
        const lis = ul === null || ul === void 0 ? void 0 : ul.querySelectorAll("li");
        const dollarValues = Array.from(lis).map((li) => {
            var _a;
            const title = (_a = li.querySelector("h2")) === null || _a === void 0 ? void 0 : _a.textContent;
            const data = li.querySelector("p");
            const raw = data === null || data === void 0 ? void 0 : data.textContent;
            const buyAndSell = raw === null || raw === void 0 ? void 0 : raw.split(/(?=[A-Z])/);
            const format = buyAndSell === null || buyAndSell === void 0 ? void 0 : buyAndSell.map((item) => {
                const addSpace = item.replace(/\$/g, " $");
                const splitForSpace = addSpace.split(" ");
                const key = splitForSpace[0];
                const value = splitForSpace[1];
                return {
                    [key]: value,
                };
            }).reduce((acc, item) => {
                return Object.assign(Object.assign({}, acc), item);
            }, {});
            return Object.assign({ title }, format);
        });
        return dollarValues;
    });
    return data;
});
exports.scrapDollarValuesInArg = scrapDollarValuesInArg;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, exports.scrapDollarValuesInArg)();
    console.log(data);
    const saveInJson = (data, name) => {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(__dirname, name + ".json");
        fs.writeFileSync(filePath, JSON.stringify(data));
    };
    saveInJson(data, "values");
});
