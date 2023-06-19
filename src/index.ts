import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes/app.routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", routes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
