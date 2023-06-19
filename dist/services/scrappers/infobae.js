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
exports.test = exports.scrapInfobaeEconomy = void 0;
const playwright_1 = require("playwright");
const files_utils_1 = require("../../utils/files.utils");
const scrapInfobaeEconomy = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const data = yield page.evaluate(() => {
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
    (0, files_utils_1.saveInJson)(data, "infobae-economy");
    return data;
});
exports.scrapInfobaeEconomy = scrapInfobaeEconomy;
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, exports.scrapInfobaeEconomy)();
    console.log(data);
});
exports.test = test;
