var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import pLimit from "p-limit";
import { getPartyMediasById, updatePartyMediaZipStatus, } from "../../models/partyMediaModel.js";
import { AppError } from "../../../utils/customError.js";
import { redisConnection } from "../redisConnection.js";
import { PartyZipStatusEnum } from "@prisma/client";
import { generatePresignedDownloadUrlFromR2 } from "../../utils/generatePresignedDownloadUrlFromR2.js";
import { generateAndUploadZipFileToR2 } from "../../utils/generateAndUploadZipFileToR2.js";
import { Worker } from "bullmq";
var PartyMediaZipWorker = new Worker("PartyMediaZip", function (job) { return __awaiter(void 0, void 0, void 0, function () {
    var limit_1, _a, partyId, key, partyMediaZipId, partyMedia_1, presignedUrlsPromise, presignedUrls, validUrls, failedUrls, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                limit_1 = pLimit(50);
                _a = job.data, partyId = _a.partyId, key = _a.key, partyMediaZipId = _a.partyMediaZipId;
                return [4 /*yield*/, updatePartyMediaZipStatus(PartyZipStatusEnum.IN_PROGRESS, partyMediaZipId)];
            case 1:
                _b.sent();
                return [4 /*yield*/, getPartyMediasById(partyId)];
            case 2:
                partyMedia_1 = _b.sent();
                if (!partyMedia_1 || partyMedia_1.length === 0)
                    throw new AppError("Nema kreriranih medija za party ID: ".concat(partyId));
                presignedUrlsPromise = partyMedia_1.map(function (media) {
                    return limit_1(function () { return generatePresignedDownloadUrlFromR2(media.url, media.type); });
                });
                return [4 /*yield*/, Promise.allSettled(presignedUrlsPromise)];
            case 3:
                presignedUrls = _b.sent();
                validUrls = presignedUrls
                    .filter(function (result) { return result.status === "fulfilled"; })
                    .map(function (result) { return result.value; });
                failedUrls = presignedUrls
                    .filter(function (result) { return result.status === "rejected"; })
                    .map(function (result, index) { return ({
                    media: partyMedia_1[index],
                    error: result.reason,
                }); });
                if (failedUrls.length > 0) {
                    console.log("Dogodila se gre\u0161ka kod generisanja nekih URL-a kod partyId: ".concat(partyId, ", sledeci URL sa gre\u0161kom: ").concat(failedUrls));
                }
                if (validUrls.length === 0) {
                    throw new AppError("Dogodila se gre\u0161ka prilikom generisanja presigned URL, ni jedan URL nije generisam za partyId: ".concat(partyId));
                }
                return [4 /*yield*/, generateAndUploadZipFileToR2(validUrls, key)];
            case 4:
                _b.sent();
                return [4 /*yield*/, updatePartyMediaZipStatus(PartyZipStatusEnum.COMPLETE, partyMediaZipId)];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                console.log(error_1);
                throw new AppError("Dogodila se greška prilikom obrade worker-a za generisanje zip medije.");
            case 7: return [2 /*return*/];
        }
    });
}); }, { connection: redisConnection, concurrency: 1 });
