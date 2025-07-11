import { Router } from "express";
import { authRouter } from "./authRoutes.js";
import { partyRouter } from "../party/routes/partyRoutes.js";
import { partyMediaRouter } from "../party/routes/partyMediaRoutes.js";
import { paymentRouter } from "./paymentRoutes.js";
export var indexRoutes = Router();
indexRoutes.use("/auth", authRouter);
indexRoutes.use("/party", partyRouter);
indexRoutes.use("/party/media", partyMediaRouter);
indexRoutes.use("/payments", paymentRouter);
