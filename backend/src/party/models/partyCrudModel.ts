import { nanoid } from "nanoid";
import prisma from "../../lib/prisma";

export const createPartyPage = async (
  userId: string,
  variantId: number,
  partyId: string | undefined
) => {
  const id = partyId || nanoid(6);
  const createdParty = await prisma.party.create({
    data: {
      id,
      user: {
        connect: {
          id: userId,
        },
      },
      plan: {
        connect: {
          variantId: variantId,
        },
      },
      title: "",
      message: "",
      dateEndTime: "",
      mainPhoto: undefined,
      backgroundPhoto: undefined,
      settings: {
        create: {},
      },
    },
  });
  return createdParty;
};

export const getPartyByPartyId = async (partyId: string) => {
  const party = await prisma.party.findFirst({
    where: {
      id: partyId,
    },
    include: {
      settings: true,
      plan: {
        include: {
          permissions: true,
        },
      },
    },
  });
  return party;
};

export const getAllParties = async (userId: string) => {
  const allParties = await prisma.party.findMany({
    where: {
      userId,
    },
  });

  return allParties;
};
