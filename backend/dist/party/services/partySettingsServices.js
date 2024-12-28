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
import { AllowMediaEnum, UploadEnum } from "@prisma/client";
import { AppError } from "../../utils/customError.js";
import { activePartyById, deactivePartyById, updatedPartySlideShowQRById, updatePartyAllowDownloadById, updatePartyAllowMediaById, updatePartyManualApprovalById, updatePartyShowBrandById, updatePartyThemeColorById, updatePartyViewUploadById, } from "../models/partySettingsModel.js";
export var activeParty = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var activedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, activePartyById(partyId)];
            case 1:
                activedParty = _a.sent();
                if (!activedParty)
                    throw new AppError("Party nije pronadjen.");
                if (activedParty.active)
                    throw new AppError("Party je već aktivan.");
                // Uraditi proveru da li je danas dan kada je zakazana proslava
                return [2 /*return*/, activedParty];
        }
    });
}); };
export var deactiveParty = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var deactivedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, deactivePartyById(partyId)];
            case 1:
                deactivedParty = _a.sent();
                if (!deactivedParty)
                    throw new AppError("Party nije pronadjen.");
                if (!deactivedParty.active)
                    throw new AppError("Party je već deaktiviran.");
                return [2 /*return*/, deactivedParty];
        }
    });
}); };
export var updatePartyShowBrand = function (partyId, showBrandStatus, permissions) { return __awaiter(void 0, void 0, void 0, function () {
    var hasPermission, updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hasPermission = permissions.some(function (permission) { return permission.name === "SHOW_BRAND"; });
                if (!hasPermission)
                    throw new AppError("Party nema permisiju.");
                return [4 /*yield*/, updatePartyShowBrandById(partyId, showBrandStatus)];
            case 1:
                updatedParty = _a.sent();
                if (!updatedParty)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var updatePartySlideShowQR = function (partyId, slideShowQR) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updatedPartySlideShowQRById(partyId, slideShowQR)];
            case 1:
                updatedParty = _a.sent();
                if (!updatedParty)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var updatePartyManualApproval = function (partyId, manualApprovalStatus, permissions) { return __awaiter(void 0, void 0, void 0, function () {
    var hasPermission, updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hasPermission = permissions.some(function (permission) { return permission.name === "MANUAL_APPROVAL"; });
                if (!hasPermission)
                    throw new AppError("Party nema permisiju.");
                return [4 /*yield*/, updatePartyManualApprovalById(partyId, manualApprovalStatus)];
            case 1:
                updatedParty = _a.sent();
                if (!updatedParty)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var updatePartyViewUpload = function (partyId, viewUploadStatus, permissions) { return __awaiter(void 0, void 0, void 0, function () {
    var hasPermission, updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (viewUploadStatus !== UploadEnum.VIEWUPLOAD &&
                    viewUploadStatus !== UploadEnum.VIEW &&
                    viewUploadStatus !== UploadEnum.UPLOAD) {
                    throw new AppError("Vrednost view upload status-a je nepostojeća.");
                }
                hasPermission = permissions.some(function (permission) { return permission.name === "VIEW_UPLOAD"; });
                if (!hasPermission)
                    throw new AppError("Party nema permisiju.");
                return [4 /*yield*/, updatePartyViewUploadById(partyId, viewUploadStatus)];
            case 1:
                updatedParty = _a.sent();
                if (!updatedParty)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var updatePartyAllowMedia = function (partyId, allowMediaStatus, permissions) { return __awaiter(void 0, void 0, void 0, function () {
    var hasPermission, updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (allowMediaStatus !== AllowMediaEnum.BOTH &&
                    allowMediaStatus !== AllowMediaEnum.IMAGE &&
                    allowMediaStatus !== AllowMediaEnum.VIDEO) {
                    throw new AppError("Vrednost allow media status-a je nepostojeća");
                }
                hasPermission = permissions.some(function (permission) { return permission.name === "BOTH_MEDIA"; });
                if (!hasPermission)
                    throw new AppError("Party nema permisiju.");
                return [4 /*yield*/, updatePartyAllowMediaById(partyId, allowMediaStatus)];
            case 1:
                updatedParty = _a.sent();
                if (!updatedParty)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var updatePartyAllowDownload = function (partyId, allowDownloadStatus, permissions) { return __awaiter(void 0, void 0, void 0, function () {
    var hasPermission, updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hasPermission = permissions.some(function (permission) { return permission.name === "ALLOW_DOWNLOAD"; });
                if (!hasPermission)
                    throw new AppError("Party nema permisiju.");
                return [4 /*yield*/, updatePartyAllowDownloadById(partyId, allowDownloadStatus)];
            case 1:
                updatedParty = _a.sent();
                if (!updatedParty)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var updatePartyThemeColor = function (partyId, color) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, updatePartyThemeColorById(partyId, color)];
            case 1:
                updatedParty = _a.sent();
                if (!updatedParty)
                    throw new AppError("Party nije pronadjen.");
                return [2 /*return*/, updatedParty];
        }
    });
}); };
