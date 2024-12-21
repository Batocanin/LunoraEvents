import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client } from "../../lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const S3Client = getS3Client();

export const generatePresignedUploadUrlFromR2 = async (key: string) => {
  const presignedUrl = await getSignedUrl(
    S3Client,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    })
  );

  return presignedUrl;
};
