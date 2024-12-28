import { Router } from "express";
import { validateRequest } from "../controllers/Auth.js";
import { partyPaymentCheckoutUrlHandler, partyPaymentWebHookHandler, } from "../controllers/paymentsHandler.js";
export var paymentRouter = Router();
paymentRouter.post("/partyPaymentCheckoutUrl", validateRequest, partyPaymentCheckoutUrlHandler);
paymentRouter.post("/partyPaymentWebHook", partyPaymentWebHookHandler);
