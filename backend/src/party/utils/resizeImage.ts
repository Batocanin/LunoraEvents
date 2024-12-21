import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client, sizes } from "../../lib/s3Client";
import sharp from "sharp";

const S3Client = getS3Client();

export const resizeImage = async (key: string, type: string) => {
  if (!type.includes("image")) return;

  const response = await S3Client.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    })
  );

  const image = await response.Body?.transformToByteArray();

  const resizedImages = sizes.map(async (size) => {
    const resizedImage = await sharp(image)
      .rotate()
      .resize(size)
      .webp({ quality: 90 })
      .toBuffer();

    await S3Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `${key}-${size}`,
        Body: resizedImage,
        ContentType: "image/webp",
      })
    );
  });

  await Promise.all(resizedImages);
};
