import { S3Client } from "@aws-sdk/client-s3";
export var sizes = [640, 828, 1080];
export function getS3Client() {
    return new S3Client({
        region: "auto",
        endpoint: "".concat(process.env.CLOUDFLARE_ENDPOINT),
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
    });
}
