import { Upload } from "@aws-sdk/lib-storage";
import archiver from "archiver";
import { PassThrough } from "stream";
import { getS3Client } from "../../lib/s3Client";
import axios from "axios";

const S3Client = getS3Client();

export const generateAndUploadZipFileToR2 = async (
  presignedUrls: {
    presignedUrl: string;
    type: string;
  }[],
  key: string
) => {
  const archive = archiver("zip", { zlib: { level: 9 } });

  const passThrough = new PassThrough();

  archive.pipe(passThrough);

  const upload = new Upload({
    client: S3Client,
    params: {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: passThrough,
      ContentType: "application/zip",
    },
  });

  archive.on("error", (err) => {
    console.error("Greska u archiver:", err);
  });
  passThrough.on("error", (err) => {
    console.error("Greska u PassThrough stream-u:", err);
  });

  const uploadPromise = upload.done();

  for (const { presignedUrl, type } of presignedUrls) {
    const fileName =
      presignedUrl.split("/").pop()?.slice(0, 30) + `.${type.split("/")[1]}` ||
      `file-${Date.now()}.${type.split("/")[1]}`;
    const response = await axios.get(presignedUrl, { responseType: "stream" });
    archive.append(response.data, { name: fileName });
  }

  archive.finalize();

  await uploadPromise;
};
