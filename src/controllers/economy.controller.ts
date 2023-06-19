import { Request, Response } from "express";

class EconomyController {
  static async getDollar(req: Request, res: Response) {
    console.log("DollarController.getDollar");

    try {
      const values = require("../storage/dollar.json");
      res.status(200).json(values);
    } catch (error) {
      console.log(error);
      const err = new Error("Error in server");
      res.status(500).json(err);
    }
  }

  static async newsEconomy(req: Request, res: Response) {
    console.log("DollarController.newsEconomy");

    try {
      const values = require("../storage/news-economy.json");
      res.status(200).json(values);
    } catch (error) {
      console.log(error);
      const err = new Error("Error in server");
      res.status(500).json(err);
    }
  }
}

export default EconomyController;
