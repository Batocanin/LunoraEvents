import { nanoid } from "nanoid";
import prisma from "../../lib/prisma";
import { PartyValues } from "../../schema/party/schema";

export const createPartyPage = async (userId: string, values: PartyValues) => {
  const id = nanoid(6);
  const createdParty = await prisma.party.create({
    data: {
      id,
      user: {
        connect: {
          id: userId,
        },
      },
      ...values,
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
