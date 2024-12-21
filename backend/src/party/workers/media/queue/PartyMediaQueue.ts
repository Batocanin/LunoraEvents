import { Queue } from "bullmq";
import { redisConnection } from "../../redisConnection";
import "../PartyMediaZipWorker";

export const PartyMediaQueue = new Queue("PartyMediaZip", {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: 5000,
  },
});
