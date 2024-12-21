import { Party, PartyZipStatusEnum } from "@prisma/client";
import prisma from "../../lib/prisma";
import { PartyValues } from "../../schema/party/schema";

export const updatePartyPageMediaByPartyId = async (
  partyData: Party,
  partyValues: PartyValues | undefined,
  mainPhoto: string | undefined,
  backgroundPhoto: string | undefined
) => {
  const updatedParty = await prisma.party.update({
    where: {
      id: partyData.id,
    },
    data: {
      ...partyValues,
      dateEndTime: partyValues?.dateEndTime, // Kako se ne bi mogla menjati vrednost eventa za sada neka ostane ovako jer cu mozda praviti da ako je taj dan zurka da ne moze da se edituje
      updatedAt: new Date(),
      mainPhoto,
      backgroundPhoto,
    },
  });

  return updatedParty;
};

export const createPartyMediaById = async (
  partyId: string,
  key: string,
  width: number,
  height: number,
  type: string
) => {
  const createdPartyMedia = await prisma.partyMedia.create({
    data: {
      partyId,
      url: key,
      width,
      height,
      type,
    },
  });

  return createdPartyMedia;
};

export const deletePartyMediaByMediaId = async (mediaId: string) => {
  const deletedPartyMedia = await prisma.partyMedia.delete({
    where: {
      id: mediaId,
    },
  });

  return deletedPartyMedia;
};

export const getPartyMediasById = async (partyId: string) => {
  const partyMedias = await prisma.partyMedia.findMany({
    where: {
      partyId,
    },
  });

  return partyMedias;
};

export const getPartyMediasListByPartyId = async (
  partyId: string,
  limit: number,
  cursor: string | null
) => {
  const partyMedias = await prisma.partyMedia.findMany({
    where: {
      partyId,
    },
    take: Number(limit) + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  const nextCursor = partyMedias.length > limit ? partyMedias[limit].id : null;

  return { partyMedias, nextCursor };
};

export const generatePartyMediaZipByPartyId = async (
  partyId: string,
  key: string
) => {
  const zippedMedia = await prisma.partyZip.create({
    data: {
      url: key,
      partyId,
      status: "PENDING",
    },
  });
  return zippedMedia;
};

export const updatePartyMediaZipStatus = async (
  status: PartyZipStatusEnum,
  mediaZipId: string
) => {
  const updatedZippedMedia = await prisma.partyZip.update({
    where: {
      id: mediaZipId,
    },
    data: {
      status,
    },
  });
  return updatedZippedMedia;
};

export const getPartyMediaZipByPartyId = async (partyId: string) => {
  return await prisma.partyZip.findMany({
    where: {
      partyId,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const checkInProgressPartyMediaZip = async (partyId: string) => {
  const inProgressZip = await prisma.partyZip.findMany({
    where: {
      partyId,
      OR: [{ status: "IN_PROGRESS" }, { status: "PENDING" }],
    },
  });

  return inProgressZip;
};
