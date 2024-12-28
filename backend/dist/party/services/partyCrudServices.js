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
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Client } from "../../lib/s3Client.js";
import { createPartyPage } from "../models/partyCrudModel.js";
import QRCode from "qrcode";
import { AppError } from "../../utils/customError.js";
import { generatePresignedDownloadUrlFromR2 } from "../utils/generatePresignedDownloadUrlFromR2.js";
import path from "path";
import { nanoid } from "nanoid";
import { generatePresignedUploadUrlFromR2 } from "../utils/generatePresignedUploadUrlFromR2.js";
var S3Client = getS3Client();
export var createParty = function (userId, variantId, partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var createdParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, createPartyPage(userId, variantId, partyId)];
            case 1:
                createdParty = _a.sent();
                if (!createdParty)
                    throw new AppError("Party nije kreiran.");
                return [4 /*yield*/, generatePartyPageQRCode(createdParty.id)];
            case 2:
                _a.sent();
                return [2 /*return*/, createdParty];
        }
    });
}); };
export var generatePartyPageQRCode = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var url, qrCodeImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "".concat(process.env.APPLICATION_URL, "/party/").concat(partyId);
                return [4 /*yield*/, QRCode.toBuffer(url, {
                        type: "png",
                        width: 1000,
                        errorCorrectionLevel: "H",
                        margin: 0,
                    })];
            case 1:
                qrCodeImage = _a.sent();
                return [4 /*yield*/, S3Client.send(new PutObjectCommand({
                        Bucket: process.env.R2_BUCKET_NAME,
                        Key: "party/".concat(partyId, "/QRCode"),
                        Body: qrCodeImage,
                        ContentType: "image/png",
                    }))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
export var getPresignedDownloadUrl = function (key, type) { return __awaiter(void 0, void 0, void 0, function () {
    var presignedUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generatePresignedDownloadUrlFromR2(key, type)];
            case 1:
                presignedUrl = (_a.sent()).presignedUrl;
                if (!presignedUrl)
                    throw new AppError("Download Presigned Url nije kreiran.");
                return [2 /*return*/, presignedUrl];
        }
    });
}); };
export var getPresignedUploadUrl = function (partyId, folder, files) { return __awaiter(void 0, void 0, void 0, function () {
    var presignedUrlsPromise, presignedUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                presignedUrlsPromise = files.map(function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
                    var key, presignedUrl;
                    var fileName = _b.fileName, fileType = _b.fileType, type = _b.type;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                key = "party/".concat(partyId, "/").concat(folder).concat(path.parse(fileName).name, "-").concat(nanoid(4));
                                return [4 /*yield*/, generatePresignedUploadUrlFromR2(key)];
                            case 1:
                                presignedUrl = _c.sent();
                                return [2 /*return*/, { presignedUrl: presignedUrl, fileName: fileName, fileType: fileType, key: key, type: type }];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(presignedUrlsPromise)];
            case 1:
                presignedUrl = _a.sent();
                return [2 /*return*/, presignedUrl];
        }
    });
}); };
