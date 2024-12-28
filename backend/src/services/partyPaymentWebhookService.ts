import { Request } from "express";
import { PartySchema } from "../schema/party/schema";
import { createParty } from "../party/services/partyCrudServices";

async function partyPaymentWebhookService(req: Request) {
  if (req.body.data.attributes.status === "paid") {
    const customData = req.body.meta.custom_data;
    const variantId = req.body.data.attributes.first_order_item.variant_id;
    const createdParty = await createParty(
      customData.user_id,
      variantId,
      customData.party_id
    );

    return createdParty;
  }
}

export default partyPaymentWebhookService;
