import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import prisma from "../../lib/prisma";
import { getS3Client } from "../../lib/s3Client";
import { PartyValues } from "../../schema/party/schema";
import { Party } from "@prisma/client";

const S3Client = getS3Client();

export const createPartyById = async (
  userId: string,
  otherValues: PartyValues,
  mainPhoto: Express.Multer.File | undefined | null,
  backgroundPhoto: Express.Multer.File | undefined | null
) => {
  const party = await prisma.party.create({
    data: {
      userId,
      ...otherValues,
    },
  });

  const mainPhotoUrl = await createMainPartyImage(party, mainPhoto);

  const backgroundPhotoUrl = await createBackgroundPartyImage(
    party,
    backgroundPhoto
  );

  const updatedParty = await prisma.party.update({
    where: {
      userId,
      id: party.id,
    },
    data: {
      mainPhotoUrl,
      backgroundPhotoUrl,
    },
  });

  return updatedParty;
};

export const updatePartyById = async (
  id: string,
  userId: string,
  otherValues: PartyValues,
  mainPhoto: Express.Multer.File | undefined | null,
  backgroundPhoto: Express.Multer.File | undefined | null
) => {
  console.log(mainPhoto, backgroundPhoto);
  const party = await prisma.party.update({
    where: {
      id,
      userId,
    },
    data: {
      ...otherValues,
      dateEndTime: undefined, // Kako se ne bi mogla menjati vrednost eventa za sada neka ostane ovako jer cu mozda praviti da ako je taj dan zurka da ne moze da se edituje
      updatedAt: new Date(),
    },
  });
  const mainPhotoUrl = await createMainPartyImage(party, mainPhoto);

  const backgroundPhotoUrl = await createBackgroundPartyImage(
    party,
    backgroundPhoto
  );

  const updatedParty = await prisma.party.update({
    where: {
      id,
      userId,
    },
    data: {
      mainPhotoUrl,
      backgroundPhotoUrl,
    },
  });

  return updatedParty;
};

export const getAllPartiesByUserId = async (userId: string) => {
  try {
    return await prisma.party.findMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPartyById = async (partyId: string, userId: string) => {
  try {
    return await prisma.party.findUnique({
      where: {
        id: partyId,
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createMainPartyImage = async (
  party: Party,
  mainPhoto: Express.Multer.File | undefined | null
) => {
  try {
    if (mainPhoto === null) {
      await deleteMainPartyImage(party);
      return null;
    }
    if (mainPhoto) {
      const key = `party/${party?.id}/${mainPhoto?.originalname}`;
      if (party?.mainPhotoUrl) {
        await deleteMainPartyImage(party);
      }
      await S3Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
          Body: mainPhoto.buffer,
          ContentType: mainPhoto.mimetype,
        })
      );
      return key;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteMainPartyImage = async (party: Party) => {
  return await S3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `party/${party?.id}/${party?.mainPhotoUrl}`,
    })
  );
};

export const createBackgroundPartyImage = async (
  party: Party,
  backgroundPhoto: Express.Multer.File | undefined | null
) => {
  try {
    if (backgroundPhoto === null) {
      await deleteBackgroundPartyImage(party);
      return null;
    }
    if (backgroundPhoto) {
      const key = `party/${party?.id}/${backgroundPhoto?.originalname}`;
      if (party?.mainPhotoUrl) {
        await deleteMainPartyImage(party);
      }
      await S3Client.send(
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
          Body: backgroundPhoto.buffer,
          ContentType: backgroundPhoto.mimetype,
        })
      );
      return key;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteBackgroundPartyImage = async (party: Party) => {
  return await S3Client.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `party/${party?.id}/${party?.backgroundPhotoUrl}`,
    })
  );
};
