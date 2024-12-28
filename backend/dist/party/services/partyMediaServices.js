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
import path from "path";
import { AppError } from "../../utils/customError.js";
import { activePartyMediaByMediaId, archivePartyMediaByMediaId, checkInProgressPartyMediaZip, createPartyMediaById, deletePartyMediaByMediaId, generatePartyMediaZipByPartyId, getPartyApprovedMediasByPartyId, getPartyArchivedMediasByPartyId, getPartyMediasByPartyId, getPartyMediaZipByPartyId, getPartyPendingMediasByPartyId, unarchivePartyMediaByMediaId, updatePartyPageMediaByPartyId, } from "../models/partyMediaModel.js";
import { deletePartyMediaFromR2 } from "../utils/deleteMediaFromR2.js";
import { nanoid } from "nanoid";
import { uploadMultiPartMediaR2 } from "../utils/uploadMultiPartMediaR2.js";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Client } from "../../lib/s3Client.js";
import { completeMultiPartMediaR2Upload } from "../utils/completeMultiPartMediaR2Upload.js";
import { resizeImage } from "../utils/resizeImage.js";
import { PartyMediaQueue } from "../workers/media/queue/PartyMediaQueue.js";
var S3Client = getS3Client();
export var updatePartyPage = function (partyData, partyValues, presignedUrls) { return __awaiter(void 0, void 0, void 0, function () {
    var mainPhoto, backgroundPhoto, updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mainPhoto = presignedUrls.find(function (url) { return url.type === "mainPhoto"; });
                backgroundPhoto = presignedUrls.find(function (url) { return url.type === "backgroundPhoto"; });
                if (!(partyData.mainPhoto &&
                    partyData.mainPhoto !== (mainPhoto === null || mainPhoto === void 0 ? void 0 : mainPhoto.key) &&
                    mainPhoto !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, deletePartyMediaFromR2(partyData.mainPhoto)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!(partyData.backgroundPhoto &&
                    partyData.backgroundPhoto !== (backgroundPhoto === null || backgroundPhoto === void 0 ? void 0 : backgroundPhoto.key) &&
                    backgroundPhoto !== undefined)) return [3 /*break*/, 4];
                return [4 /*yield*/, deletePartyMediaFromR2(partyData.backgroundPhoto)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!mainPhoto) return [3 /*break*/, 6];
                return [4 /*yield*/, resizeImage(mainPhoto.key, mainPhoto.fileType)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                if (!backgroundPhoto) return [3 /*break*/, 8];
                return [4 /*yield*/, resizeImage(backgroundPhoto.key, backgroundPhoto.fileType)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8: return [4 /*yield*/, updatePartyPageMediaByPartyId(partyData, partyValues, mainPhoto === null || mainPhoto === void 0 ? void 0 : mainPhoto.key, backgroundPhoto === null || backgroundPhoto === void 0 ? void 0 : backgroundPhoto.key)];
            case 9:
                updatedParty = _a.sent();
                return [2 /*return*/, updatedParty];
        }
    });
}); };
// Poziva se samo kod create party-a, da bi se mogle dodaju slike
export var createPartyPageMedia = function (partyData, partyValues, presignedUrls) { return __awaiter(void 0, void 0, void 0, function () {
    var mainPhoto, backgroundPhoto, updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mainPhoto = presignedUrls.find(function (url) { return url.type === "mainPhoto"; });
                backgroundPhoto = presignedUrls.find(function (url) { return url.type === "backgroundPhoto"; });
                if (!mainPhoto) return [3 /*break*/, 2];
                return [4 /*yield*/, resizeImage(mainPhoto === null || mainPhoto === void 0 ? void 0 : mainPhoto.key, mainPhoto === null || mainPhoto === void 0 ? void 0 : mainPhoto.fileType)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!backgroundPhoto) return [3 /*break*/, 4];
                return [4 /*yield*/, resizeImage(backgroundPhoto.key, backgroundPhoto.fileType)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, updatePartyPageMediaByPartyId(partyData, partyValues, mainPhoto === null || mainPhoto === void 0 ? void 0 : mainPhoto.key, backgroundPhoto === null || backgroundPhoto === void 0 ? void 0 : backgroundPhoto.key)];
            case 5:
                updatedParty = _a.sent();
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var createPartyMedia = function (partyId, key, width, height, type, pending) { return __awaiter(void 0, void 0, void 0, function () {
    var createdPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resizeImage(key, type)];
            case 1:
                _a.sent();
                return [4 /*yield*/, createPartyMediaById(partyId, key, width, height, type, pending)];
            case 2:
                createdPartyMedia = _a.sent();
                if (!createdPartyMedia)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, createdPartyMedia];
        }
    });
}); };
export var deletePartyMedia = function (key, mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!key)
                    throw new AppError("Key je obavezan.");
                return [4 /*yield*/, deletePartyMediaByMediaId(mediaId)];
            case 1:
                deletedPartyMedia = _a.sent();
                if (!deletedPartyMedia)
                    throw new AppError("Party nije pronadjen.");
                return [4 /*yield*/, deletePartyMediaFromR2(key)];
            case 2:
                _a.sent();
                return [2 /*return*/, deletedPartyMedia];
        }
    });
}); };
export var getPartyMedias = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedLimit, partyMedias;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!limit)
                    throw new AppError("Limit je obavezan.");
                formattedLimit = Number(limit);
                return [4 /*yield*/, getPartyMediasByPartyId(partyId, formattedLimit, cursor)];
            case 1:
                partyMedias = _a.sent();
                if (!partyMedias)
                    throw new AppError("Party Medias nije pronadjena.");
                return [2 /*return*/, partyMedias];
        }
    });
}); };
export var getPartyApprovedMedias = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedLimit, partyMedias;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!limit)
                    throw new AppError("Limit je obavezan.");
                formattedLimit = Number(limit);
                return [4 /*yield*/, getPartyApprovedMediasByPartyId(partyId, formattedLimit, cursor)];
            case 1:
                partyMedias = _a.sent();
                if (!partyMedias)
                    throw new AppError("Party Medias nije pronadjena.");
                return [2 /*return*/, partyMedias];
        }
    });
}); };
export var getPartyPendingMedias = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedLimit, partyMedias;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!limit)
                    throw new AppError("Limit je obavezan.");
                formattedLimit = Number(limit);
                return [4 /*yield*/, getPartyPendingMediasByPartyId(partyId, formattedLimit, cursor)];
            case 1:
                partyMedias = _a.sent();
                if (!partyMedias)
                    throw new AppError("Party Medias nije pronadjena.");
                return [2 /*return*/, partyMedias];
        }
    });
}); };
export var getPartyArchivedMedias = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedLimit, partyMedias;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!limit)
                    throw new AppError("Limit je obavezan.");
                formattedLimit = Number(limit);
                return [4 /*yield*/, getPartyArchivedMediasByPartyId(partyId, formattedLimit, cursor)];
            case 1:
                partyMedias = _a.sent();
                if (!partyMedias)
                    throw new AppError("Party Medias nije pronadjena.");
                return [2 /*return*/, partyMedias];
        }
    });
}); };
export var archivePartyMedia = function (mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var archivedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, archivePartyMediaByMediaId(mediaId)];
            case 1:
                archivedPartyMedia = _a.sent();
                if (!archivedPartyMedia)
                    throw new AppError("Party Media nije pronadjena.");
                return [2 /*return*/, archivedPartyMedia];
        }
    });
}); };
export var unarchivePartyMedia = function (mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var unarchivedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, unarchivePartyMediaByMediaId(mediaId)];
            case 1:
                unarchivedPartyMedia = _a.sent();
                if (!unarchivedPartyMedia)
                    throw new AppError("Party Media nije pronadjena.");
                return [2 /*return*/, unarchivedPartyMedia];
        }
    });
}); };
export var activePartyMedia = function (mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var activedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, activePartyMediaByMediaId(mediaId)];
            case 1:
                activedPartyMedia = _a.sent();
                if (!activedPartyMedia)
                    throw new AppError("Party Media nije pronadjena.");
                return [2 /*return*/, activedPartyMedia];
        }
    });
}); };
export var generatePartyZipMedia = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var inProgressZip, key, createdPartyMediaZip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkInProgressPartyMediaZip(partyId)];
            case 1:
                inProgressZip = _a.sent();
                if (inProgressZip && inProgressZip.length > 0)
                    throw new AppError("Kreiranje ZIP fajlova svih fotografija je već toku...");
                key = "party/".concat(partyId, "/zip/party_").concat(partyId, "_").concat(nanoid(3), ".zip");
                return [4 /*yield*/, generatePartyMediaZipByPartyId(partyId, key)];
            case 2:
                createdPartyMediaZip = _a.sent();
                if (!createdPartyMediaZip)
                    throw new AppError("Party Media Zip nije kreiran.");
                return [4 /*yield*/, PartyMediaQueue.add("PartyMediaZip", {
                        partyId: partyId,
                        key: key,
                        partyMediaZipId: createdPartyMediaZip.id,
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var getPartyZipMedia = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var partyZipMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getPartyMediaZipByPartyId(partyId)];
            case 1:
                partyZipMedia = _a.sent();
                if (!partyZipMedia)
                    throw new AppError("Party Media Zip nije pronadjen.");
                return [2 /*return*/, partyZipMedia];
        }
    });
}); };
export var createPartyMediaMultiPartUpload = function (partyId, folder, fileName, fileType, totalParts) { return __awaiter(void 0, void 0, void 0, function () {
    var key, UploadId, presignedUrlsPromise, presignedUrls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = "party/".concat(partyId, "/").concat(folder).concat(path.parse(fileName).name, "-").concat(nanoid(4));
                return [4 /*yield*/, uploadMultiPartMediaR2(key, fileType)];
            case 1:
                UploadId = _a.sent();
                if (!UploadId)
                    throw new AppError("Dogodila se greška prilikom generisanja Upload Id");
                presignedUrlsPromise = Array.from({ length: totalParts }).map(function (_, index) {
                    return getSignedUrl(S3Client, new UploadPartCommand({
                        Bucket: process.env.R2_BUCKET_NAME,
                        Key: key,
                        UploadId: UploadId,
                        PartNumber: index + 1,
                    }), {
                        expiresIn: 3600,
                    });
                });
                return [4 /*yield*/, Promise.all(presignedUrlsPromise)];
            case 2:
                presignedUrls = _a.sent();
                if (!presignedUrls)
                    throw new AppError("Presigned URLs nisu generisani uspešno");
                return [2 /*return*/, { UploadId: UploadId, presignedUrls: presignedUrls, key: key }];
        }
    });
}); };
export var completePartyMediaMultiPartUpload = function (partyId, UploadId, key, parts, width, height, type, pending) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedParts, createdPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!key || !UploadId || !parts || !Array.isArray(parts))
                    throw new AppError("Key, UploadID, Parts su obavezni!");
                formattedParts = parts.map(function (part) { return ({
                    ETag: part.ETag,
                    PartNumber: part.PartNumber,
                }); });
                return [4 /*yield*/, completeMultiPartMediaR2Upload(UploadId, key, formattedParts)];
            case 1:
                _a.sent();
                return [4 /*yield*/, resizeImage(key, type)];
            case 2:
                _a.sent();
                return [4 /*yield*/, createPartyMediaById(partyId, key, width, height, type, pending)];
            case 3:
                createdPartyMedia = _a.sent();
                return [2 /*return*/, createdPartyMedia];
        }
    });
}); };
