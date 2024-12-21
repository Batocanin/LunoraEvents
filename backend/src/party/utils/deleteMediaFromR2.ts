import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { getS3Client, sizes } from "../../lib/s3Client";

const S3Client = getS3Client();

export const deletePartyMediaFromR2 = async (key: string) => {
  return await S3Client.send(
    new DeleteObjectsCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Delete: {
        Objects: [
          { Key: key },
          ...sizes.map((size) => ({ Key: `${key}-${size}` })),
        ],
      },
    })
  );
};
