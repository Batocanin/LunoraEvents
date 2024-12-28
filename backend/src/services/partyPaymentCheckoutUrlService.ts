import { nanoid } from "nanoid";
import { UserWithoutPassword } from "../types/authTypes";
import { AxiosLemonSqueezy } from "../utils/axios";

async function partyPaymentCheckoutUrlService(
  user: UserWithoutPassword,
  productId: string
) {
  const id = nanoid(6);
  const response = await AxiosLemonSqueezy.post("/checkouts", {
    data: {
      type: "checkouts",
      attributes: {
        checkout_options: {
          embed: true,
          media: false,
          logo: false,
          desc: false,
        },
        checkout_data: {
          email: user.email,
          billing_address: {
            country: "RS",
          },
          custom: {
            user_id: user.id,
            user_email: user.email,
            party_id: id,
          },
        },
      },
      relationships: {
        store: {
          data: {
            type: "stores",
            id: process.env.LEMONSQUEEZY_STORE_ID,
          },
        },
        variant: {
          data: {
            type: "variants",
            id: productId,
          },
        },
      },
    },
  });

  return response.data;
}

export default partyPaymentCheckoutUrlService;
