"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const economy_controller_1 = __importDefault(require("../controllers/economy.controller"));
const router = (0, express_1.Router)();
router.get("/dollar", economy_controller_1.default.getDollar);
router.get("/news/economy", economy_controller_1.default.newsEconomy);
exports.default = router;
