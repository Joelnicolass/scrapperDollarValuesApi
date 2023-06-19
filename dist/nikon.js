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
const playwright_1 = require("playwright");
const scrapProductsFromNikon = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield playwright_1.chromium.launch({ headless: true });
    const page = yield browser.newPage();
    yield page.goto(url);
    const products = yield page.evaluate(() => {
        const elements = document.querySelectorAll(".detalles");
        const deleteLineBreak = (text) => text.replace(/\r?\n|\r/g, "");
        const deleteSpaces = (text) => text.replace(/\s+/g, " ");
        const products = Array.from(elements).map((element) => {
            var _a, _b;
            return {
                name: (_a = element.querySelector(".titulo")) === null || _a === void 0 ? void 0 : _a.textContent,
                price: deleteSpaces(deleteLineBreak((_b = element.querySelector(".info-precio")) === null || _b === void 0 ? void 0 : _b.textContent).trim()),
            };
        });
        return products;
    });
    return products;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield scrapProductsFromNikon("https://www.nikon.com.ar/productos/objetivos_categoria.php?cat=0");
    const saveInJson = (data, name) => {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(__dirname, name + ".json");
        fs.writeFileSync(filePath, JSON.stringify(data));
    };
    saveInJson(products, "products");
});
main();
