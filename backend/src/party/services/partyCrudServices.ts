import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "../../lib/s3Client";
import { PartyValues } from "../../schema/party/schema";
import { createPartyPage } from "../models/partyCrudModel";
import QRCode from "qrcode";
import { AppError } from "../../utils/customError";
import { generatePresignedDownloadUrlFromR2 } from "../utils/generatePresignedDownloadUrlFromR2";
import path from "path";
import { nanoid } from "nanoid";
import { generatePresignedUploadUrlFromR2 } from "../utils/generatePResignedUploadUrlFromR2";

const S3Client = getS3Client();

export const createParty = async (userId: string, values: PartyValues) => {
  const createdParty = await createPartyPage(userId, values);

  if (!createdParty) throw new AppError("Party nije kreiran.");

  await generatePartyPageQRCode(createdParty.id);

  return createdParty;
};

export const generatePartyPageQRCode = async (partyId: string) => {
  const url = `${process.env.APPLICATION_URL}/party/${partyId}`;
  const qrCodeImage = await QRCode.toBuffer(url, {
    type: "png",
    width: 1000,
    errorCorrectionLevel: "H",
    margin: 0,
  });
  await S3Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `party/${partyId}/QRCode`,
      Body: qrCodeImage,
      ContentType: "image/png",
    })
  );
};

export const getPresignedDownloadUrl = async (key: string, type: string) => {
  const { presignedUrl } = await generatePresignedDownloadUrlFromR2(key, type);

  if (!presignedUrl) throw new AppError("Download Presigned Url nije kreiran.");

  return presignedUrl;
};

export const getPresignedUploadUrl = async (
  partyId: string,
  folder: string,
  files: any
) => {
  const presignedUrlsPromise = files.map(
    async ({
      fileName,
      fileType,
      type,
    }: {
      fileName: string;
      fileType: string;
      type: string;
    }) => {
      const key = `party/${partyId}/${folder}${
        path.parse(fileName).name
      }-${nanoid(4)}`;
      const presignedUrl = await generatePresignedUploadUrlFromR2(key);
      return { presignedUrl, fileName, fileType, key, type };
    }
  );

  const presignedUrl = await Promise.all(presignedUrlsPromise);

  return presignedUrl;
};
