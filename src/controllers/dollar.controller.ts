import { Request, Response } from "express";
import { scrapDollarValuesInArg } from "../services/scrappers/dolar";

class DollarController {
  static async getDollar(req: Request, res: Response) {
    try {
      const values = await scrapDollarValuesInArg();
      res.status(200).json(values);
    } catch (error) {
      const err = new Error("Error in server");
      res.status(500).json(err);
    }
  }
}

export default DollarController;
