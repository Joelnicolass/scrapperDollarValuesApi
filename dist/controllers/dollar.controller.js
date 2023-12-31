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
class DollarController {
    static getDollar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DollarController.getDollar");
            try {
                const values = require("../storage/dollar.json");
                res.status(200).json(values);
            }
            catch (error) {
                console.log(error);
                const err = new Error("Error in server");
                res.status(500).json(err);
            }
        });
    }
    static newsEconomy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("DollarController.newsEconomy");
            try {
                const values = require("../storage/infobae-economy.json");
                res.status(200).json(values);
            }
            catch (error) {
                console.log(error);
                const err = new Error("Error in server");
                res.status(500).json(err);
            }
        });
    }
}
exports.default = DollarController;
