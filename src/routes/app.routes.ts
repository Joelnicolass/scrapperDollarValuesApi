import { Router } from "express";
import DollarController from "../controllers/dollar.controller";

const router = Router();

router.get("/dollar", DollarController.getDollar);

export default router;
