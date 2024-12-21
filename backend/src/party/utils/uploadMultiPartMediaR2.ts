import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "../../lib/s3Client";

const S3Client = getS3Client();

export const uploadMultiPartMediaR2 = async (key: string, fileType: string) => {
  const { UploadId } = await S3Client.send(
    new CreateMultipartUploadCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    })
  );

  return UploadId;
};
