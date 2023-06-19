import { Router } from "express";
import EconomyController from "../controllers/economy.controller";

const router = Router();

router.get("/dollar", EconomyController.getDollar);
router.get("/news/economy", EconomyController.newsEconomy);

export default router;
