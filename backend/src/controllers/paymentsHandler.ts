import { Request, Response } from "express";
import { formatErrorResponse } from "../utils/formatErrorResponse";
import { AppError } from "../utils/customError";
import partyPaymentCheckoutUrlService from "../services/partyPaymentCheckoutUrlService";
import partyPaymentWebhookService from "../services/partyPaymentWebhookService";

export const partyPaymentCheckoutUrlHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    const { data } = await partyPaymentCheckoutUrlService(user, productId);

    res.status(200).send({
      success: true,
      message: "Payment uspesno dobijen.",
      data: data.attributes.url,
    });
  } catch (error) {
    console.log(error);
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom kreiranje stranice proslave.",
      error instanceof Error ? error : null
    );
  }
};

export const partyPaymentWebHookHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET_KEY;
    if (!secret) throw new AppError("Secret je nepostojeći");

    const createdParty = await partyPaymentWebhookService(req);

    res.status(200).send({
      success: true,
      message: "Proslava je uspešno kreirana.",
      data: createdParty,
    });
  } catch (error) {
    console.log(error);
    formatErrorResponse(
      res,
      "Dogodila se greska kod web hook handler-a",
      error instanceof Error ? error : null
    );
  }
};
