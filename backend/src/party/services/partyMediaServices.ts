import path from "path";
import { AppError } from "../../utils/customError";
import {
  activePartyMediaByMediaId,
  archivePartyMediaByMediaId,
  checkInProgressPartyMediaZip,
  createPartyMediaById,
  deletePartyMediaByMediaId,
  generatePartyMediaZipByPartyId,
  getPartyApprovedMediasByPartyId,
  getPartyArchivedMediasByPartyId,
  getPartyMediasByPartyId,
  getPartyMediaZipByPartyId,
  getPartyPendingMediasByPartyId,
  unarchivePartyMediaByMediaId,
  updatePartyPageMediaByPartyId,
} from "../models/partyMediaModel";
import { deletePartyMediaFromR2 } from "../utils/deleteMediaFromR2";
import { nanoid } from "nanoid";
import { uploadMultiPartMediaR2 } from "../utils/uploadMultiPartMediaR2";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client } from "../../lib/s3Client";
import { completeMultiPartMediaR2Upload } from "../utils/completeMultiPartMediaR2Upload";
import { resizeImage } from "../utils/resizeImage";
import { PartyMediaQueue } from "../workers/media/queue/PartyMediaQueue";
import { presignedUrls } from "../types/MediaTypes";
import { Party } from "@prisma/client";
import { PartyValues } from "../../schema/party/schema";

const S3Client = getS3Client();

export const updatePartyPage = async (
  partyData: Party,
  partyValues: PartyValues,
  presignedUrls: presignedUrls[]
) => {
  const mainPhoto = presignedUrls.find(
    (url: presignedUrls) => url.type === "mainPhoto"
  );
  const backgroundPhoto = presignedUrls.find(
    (url: presignedUrls) => url.type === "backgroundPhoto"
  );

  if (
    partyData.mainPhoto &&
    partyData.mainPhoto !== mainPhoto?.key &&
    mainPhoto !== undefined
  ) {
    await deletePartyMediaFromR2(partyData.mainPhoto);
  }
  if (
    partyData.backgroundPhoto &&
    partyData.backgroundPhoto !== backgroundPhoto?.key &&
    backgroundPhoto !== undefined
  ) {
    await deletePartyMediaFromR2(partyData.backgroundPhoto);
  }
  if (mainPhoto) await resizeImage(mainPhoto.key, mainPhoto.fileType);
  if (backgroundPhoto)
    await resizeImage(backgroundPhoto.key, backgroundPhoto.fileType);

  const updatedParty = await updatePartyPageMediaByPartyId(
    partyData,
    partyValues,
    mainPhoto?.key,
    backgroundPhoto?.key
  );

  return updatedParty;
};

// Poziva se samo kod create party-a, da bi se mogle dodaju slike
export const createPartyPageMedia = async (
  partyData: Party,
  partyValues: PartyValues,
  presignedUrls: presignedUrls[]
) => {
  const mainPhoto = presignedUrls.find(
    (url: presignedUrls) => url.type === "mainPhoto"
  );
  const backgroundPhoto = presignedUrls.find(
    (url: presignedUrls) => url.type === "backgroundPhoto"
  );

  if (mainPhoto) await resizeImage(mainPhoto?.key, mainPhoto?.fileType);

  if (backgroundPhoto)
    await resizeImage(backgroundPhoto.key, backgroundPhoto.fileType);

  const updatedParty = await updatePartyPageMediaByPartyId(
    partyData,
    partyValues,
    mainPhoto?.key,
    backgroundPhoto?.key
  );

  return updatedParty;
};

export const createPartyMedia = async (
  partyId: string,
  key: string,
  width: number,
  height: number,
  type: string,
  pending: boolean
) => {
  await resizeImage(key, type);

  const createdPartyMedia = await createPartyMediaById(
    partyId,
    key,
    width,
    height,
    type,
    pending
  );

  if (!createdPartyMedia) throw new AppError("Party nije pronadjen.");

  return createdPartyMedia;
};

export const deletePartyMedia = async (key: string, mediaId: string) => {
  if (!key) throw new AppError("Key je obavezan.");

  const deletedPartyMedia = await deletePartyMediaByMediaId(mediaId);

  if (!deletedPartyMedia) throw new AppError("Party nije pronadjen.");

  await deletePartyMediaFromR2(key);

  return deletedPartyMedia;
};

export const getPartyMedias = async (
  partyId: string,
  limit: string | undefined,
  cursor: string | null
) => {
  if (!limit) throw new AppError("Limit je obavezan.");

  const formattedLimit = Number(limit);

  const partyMedias = await getPartyMediasByPartyId(
    partyId,
    formattedLimit,
    cursor
  );

  if (!partyMedias) throw new AppError("Party Medias nije pronadjena.");

  return partyMedias;
};
export const getPartyApprovedMedias = async (
  partyId: string,
  limit: string | undefined,
  cursor: string | null
) => {
  if (!limit) throw new AppError("Limit je obavezan.");

  const formattedLimit = Number(limit);

  const partyMedias = await getPartyApprovedMediasByPartyId(
    partyId,
    formattedLimit,
    cursor
  );

  if (!partyMedias) throw new AppError("Party Medias nije pronadjena.");

  return partyMedias;
};
export const getPartyPendingMedias = async (
  partyId: string,
  limit: string | undefined,
  cursor: string | null
) => {
  if (!limit) throw new AppError("Limit je obavezan.");

  const formattedLimit = Number(limit);

  const partyMedias = await getPartyPendingMediasByPartyId(
    partyId,
    formattedLimit,
    cursor
  );

  if (!partyMedias) throw new AppError("Party Medias nije pronadjena.");

  return partyMedias;
};
export const getPartyArchivedMedias = async (
  partyId: string,
  limit: string | undefined,
  cursor: string | null
) => {
  if (!limit) throw new AppError("Limit je obavezan.");

  const formattedLimit = Number(limit);

  const partyMedias = await getPartyArchivedMediasByPartyId(
    partyId,
    formattedLimit,
    cursor
  );

  if (!partyMedias) throw new AppError("Party Medias nije pronadjena.");

  return partyMedias;
};

export const archivePartyMedia = async (mediaId: string) => {
  const archivedPartyMedia = await archivePartyMediaByMediaId(mediaId);

  if (!archivedPartyMedia) throw new AppError("Party Media nije pronadjena.");

  return archivedPartyMedia;
};

export const unarchivePartyMedia = async (mediaId: string) => {
  const unarchivedPartyMedia = await unarchivePartyMediaByMediaId(mediaId);

  if (!unarchivedPartyMedia) throw new AppError("Party Media nije pronadjena.");

  return unarchivedPartyMedia;
};

export const activePartyMedia = async (mediaId: string) => {
  const activedPartyMedia = await activePartyMediaByMediaId(mediaId);

  if (!activedPartyMedia) throw new AppError("Party Media nije pronadjena.");

  return activedPartyMedia;
};

export const generatePartyZipMedia = async (partyId: string) => {
  const inProgressZip = await checkInProgressPartyMediaZip(partyId);

  if (inProgressZip && inProgressZip.length > 0)
    throw new AppError("Kreiranje ZIP fajlova svih fotografija je već toku...");

  const key = `party/${partyId}/zip/party_${partyId}_${nanoid(3)}.zip`;

  const createdPartyMediaZip = await generatePartyMediaZipByPartyId(
    partyId,
    key
  );

  if (!createdPartyMediaZip)
    throw new AppError("Party Media Zip nije kreiran.");

  await PartyMediaQueue.add("PartyMediaZip", {
    partyId,
    key,
    partyMediaZipId: createdPartyMediaZip.id,
  });
};

export const getPartyZipMedia = async (partyId: string) => {
  const partyZipMedia = await getPartyMediaZipByPartyId(partyId);

  if (!partyZipMedia) throw new AppError("Party Media Zip nije pronadjen.");

  return partyZipMedia;
};

export const createPartyMediaMultiPartUpload = async (
  partyId: string,
  folder: string,
  fileName: string,
  fileType: string,
  totalParts: number
) => {
  const key = `party/${partyId}/${folder}${path.parse(fileName).name}-${nanoid(
    4
  )}`;

  const UploadId = await uploadMultiPartMediaR2(key, fileType);

  if (!UploadId)
    throw new AppError("Dogodila se greška prilikom generisanja Upload Id");

  const presignedUrlsPromise = Array.from({ length: totalParts }).map(
    (_, index) => {
      return getSignedUrl(
        S3Client,
        new UploadPartCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
          UploadId,
          PartNumber: index + 1,
        }),
        {
          expiresIn: 3600,
        }
      );
    }
  );

  const presignedUrls = await Promise.all(presignedUrlsPromise);

  if (!presignedUrls)
    throw new AppError("Presigned URLs nisu generisani uspešno");

  return { UploadId, presignedUrls, key };
};

export const completePartyMediaMultiPartUpload = async (
  partyId: string,
  UploadId: string,
  key: string,
  parts: any,
  width: number,
  height: number,
  type: string,
  pending: boolean
) => {
  if (!key || !UploadId || !parts || !Array.isArray(parts))
    throw new AppError("Key, UploadID, Parts su obavezni!");

  const formattedParts = parts.map(
    (part: { ETag: string; PartNumber: number }) => ({
      ETag: part.ETag,
      PartNumber: part.PartNumber,
    })
  );

  await completeMultiPartMediaR2Upload(UploadId, key, formattedParts);

  await resizeImage(key, type);

  const createdPartyMedia = await createPartyMediaById(
    partyId,
    key,
    width,
    height,
    type,
    pending
  );

  return createdPartyMedia;
};
