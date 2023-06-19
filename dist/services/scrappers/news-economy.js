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
exports.test = exports.scrapNewsEconomy = void 0;
const playwright_1 = require("playwright");
const files_utils_1 = require("../../utils/files.utils");
const scrapNewsEconomy = () => __awaiter(void 0, void 0, void 0, function* () {
    // INFOBAE
    console.log("Iniciando scrapping de titulares de noticias en economia de infobae: " +
        new Date().toLocaleString());
    const browser = yield playwright_1.chromium.launch({
        headless: true,
        args: ["--disable-gpu", "--disable-gpu-sandbox", "--single-process"],
    });
    const page = yield browser.newPage();
    yield page.goto("https://www.infobae.com/economia/", {
        timeout: 0,
    });
    const infobae = yield page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        const elements = document.querySelectorAll("h2");
        const titles = Array.from(elements).map((element) => {
            return {
                title: element.textContent,
            };
        });
        return titles;
    });
    //------------------------------------------------
    // LA NACION
    console.log("Iniciando scrapping de titulares de noticias en economia de la nacion: " +
        new Date().toLocaleString());
    yield page.goto("https://www.lanacion.com.ar/economia/", {
        timeout: 0,
    });
    const lanacion = yield page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
        const elements = document.querySelectorAll("h2");
        const titles = Array.from(elements).map((element) => {
            return {
                title: element.textContent,
            };
        });
        return titles;
    });
    yield page.close();
    yield browser.close();
    const newsEconomy = {
        infobae,
        lanacion,
    };
    (0, files_utils_1.saveInJson)(newsEconomy, "news-economy");
    return newsEconomy;
});
exports.scrapNewsEconomy = scrapNewsEconomy;
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, exports.scrapNewsEconomy)();
    console.log(data);
});
exports.test = test;
