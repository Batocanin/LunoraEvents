import { Queue } from "bullmq";
import { redisConnection } from "../../redisConnection.js";
import "../PartyMediaZipWorker.js";
export var PartyMediaQueue = new Queue("PartyMediaZip", {
    connection: redisConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: 5000,
    },
});
