import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "../../lib/s3Client";

const S3Client = getS3Client();

export const completeMultiPartMediaR2Upload = async (
  UploadId: string,
  key: string,
  parts: {
    ETag: string;
    PartNumber: number;
  }[]
) => {
  return await S3Client.send(
    new CompleteMultipartUploadCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      UploadId,
      MultipartUpload: {
        Parts: parts,
      },
    })
  );
};
