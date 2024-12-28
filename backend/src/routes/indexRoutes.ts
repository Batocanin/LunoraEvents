import { Router } from "express";
import { authRouter } from "./authRoutes";
import { partyRouter } from "../party/routes/partyRoutes";
import { partyMediaRouter } from "../party/routes/partyMediaRoutes";
import { paymentRouter } from "./paymentRoutes";

export const indexRoutes = Router();

indexRoutes.use("/auth", authRouter);
indexRoutes.use("/party", partyRouter);
indexRoutes.use("/party/media", partyMediaRouter);
indexRoutes.use("/payments", paymentRouter);
