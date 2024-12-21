import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client } from "../../lib/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const S3Client = getS3Client();

export const generatePresignedDownloadUrlFromR2 = async (
  key: string,
  type: string
) => {
  const presignedUrl = await getSignedUrl(
    S3Client,
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ResponseContentType: type,
      ResponseContentDisposition: `attachment; filename="${key
        .split("/")
        .pop()}.${type.split("/")[1]}"`,
    })
  );

  return { presignedUrl, type };
};
