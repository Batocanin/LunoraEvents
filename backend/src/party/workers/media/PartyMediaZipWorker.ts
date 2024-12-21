import pLimit from "p-limit";
import {
  getPartyMediasById,
  updatePartyMediaZipStatus,
} from "../../models/partyMediaModel";
import { AppError } from "../../../utils/customError";
import { redisConnection } from "../redisConnection";
import { PartyZipStatusEnum } from "@prisma/client";
import { generatePresignedDownloadUrlFromR2 } from "../../utils/generatePresignedDownloadUrlFromR2";
import { generateAndUploadZipFileToR2 } from "../../utils/generateAndUploadZipFileToR2";
import { Worker } from "bullmq";

const PartyMediaZipWorker = new Worker(
  "PartyMediaZip",
  async (job) => {
    try {
      const limit = pLimit(50);

      const { partyId, key, partyMediaZipId } = job.data;

      await updatePartyMediaZipStatus(
        PartyZipStatusEnum.IN_PROGRESS,
        partyMediaZipId
      );

      const partyMedia = await getPartyMediasById(partyId);

      if (!partyMedia || partyMedia.length === 0)
        throw new AppError(`Nema kreriranih medija za party ID: ${partyId}`);

      const presignedUrlsPromise = partyMedia.map((media) =>
        limit(() => generatePresignedDownloadUrlFromR2(media.url, media.type))
      );

      const presignedUrls = await Promise.allSettled(presignedUrlsPromise);

      const validUrls = presignedUrls
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const failedUrls = presignedUrls
        .filter((result) => result.status === "rejected")
        .map((result, index) => ({
          media: partyMedia[index],
          error: result.reason,
        }));

      if (failedUrls.length > 0) {
        console.log(
          `Dogodila se greška kod generisanja nekih URL-a kod partyId: ${partyId}, sledeci URL sa greškom: ${failedUrls}`
        );
      }

      if (validUrls.length === 0) {
        throw new AppError(
          `Dogodila se greška prilikom generisanja presigned URL, ni jedan URL nije generisam za partyId: ${partyId}`
        );
      }

      await generateAndUploadZipFileToR2(validUrls, key);

      await updatePartyMediaZipStatus(
        PartyZipStatusEnum.COMPLETE,
        partyMediaZipId
      );
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Dogodila se greška prilikom obrade worker-a za generisanje zip medije."
      );
    }
  },
  { connection: redisConnection, concurrency: 1 }
);
