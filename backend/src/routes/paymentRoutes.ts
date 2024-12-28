import { Router } from "express";
import { validateRequest } from "../controllers/Auth";
import {
  partyPaymentCheckoutUrlHandler,
  partyPaymentWebHookHandler,
} from "../controllers/paymentsHandler";

export const paymentRouter = Router();

paymentRouter.post(
  "/partyPaymentCheckoutUrl",
  validateRequest,
  partyPaymentCheckoutUrlHandler
);
paymentRouter.post("/partyPaymentWebHook", partyPaymentWebHookHandler);
