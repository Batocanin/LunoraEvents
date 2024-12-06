import { Router } from "express";
import { authRouter } from "./authRoutes";
import { partyRouter } from "./partyRoutes";

export const indexRoutes = Router();

indexRoutes.use("/auth", authRouter);
indexRoutes.use("/party", partyRouter);
