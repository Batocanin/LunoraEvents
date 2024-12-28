import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { indexRoutes } from "./routes/indexRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors({ credentials: true, origin: process.env.APPLICATION_URL }));
app.use(express.urlencoded({ extended: true, limit: 10000 }));
app.use(
  express.json({
    verify: (req: Request, res: Response, buf: Buffer) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(cookieParser());

app.use("/api", indexRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
