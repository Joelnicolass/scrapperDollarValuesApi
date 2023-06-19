import { Request, Response } from "express";
import { scrapDollarValuesInArg } from "../services/scrappers/dolar";

class DollarController {
  static async getDollar(req: Request, res: Response) {
    console.log("DollarController.getDollar");

    try {
      const values = await scrapDollarValuesInArg();
      res.status(200).json(values);
    } catch (error) {
      console.log(error);
      const err = new Error("Error in server");
      res.status(500).json(err);
    }
  }
}

export default DollarController;
