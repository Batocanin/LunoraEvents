import { Request } from "express";
import { AppError } from "../utils/customError";
import crypto from "crypto";

export const partyPaymentWebHook = async (req: Request) => {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET_KEY;
  if (!secret) throw new AppError("Secret je nepostojeći");

  if (!req.rawBody || req.rawBody.length === 0)
    throw new AppError("Body je prazan.");

  const signature = Buffer.from(req.get("X-Signature") || "", "hex");

  if (signature.length === 0 || req.rawBody.length === 0)
    throw new AppError("Signature je nepostojeći");

  const hmac = Buffer.from(
    crypto.createHmac("sha256", secret).update(req.rawBody).digest("hex"),
    "hex"
  );

  if (!crypto.timingSafeEqual(hmac, signature))
    throw new AppError(
      " Dogodila se greška prilikom plaćanja pokušajte ponovo kasnije."
    );

  const eventType = req.get("X-Event-Name");

  return true;
};
