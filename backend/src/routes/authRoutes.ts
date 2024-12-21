import { Router } from "express";
import {
  logout,
  signIn,
  signUp,
  validateRequest,
  validateRequestFront,
} from "../controllers/Auth";

export const authRouter = Router();

authRouter.get("/validate-request", validateRequestFront);

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/logout", validateRequest, logout);
