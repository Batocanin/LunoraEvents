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
import { formatErrorResponse } from "../../utils/formatErrorResponse.js";
import { activeParty, deactiveParty, updatePartyAllowDownload, updatePartyAllowMedia, updatePartyManualApproval, updatePartyShowBrand, updatePartySlideShowQR, updatePartyThemeColor, updatePartyViewUpload, } from "../services/partySettingsServices.js";
export var activePartyHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, activedParty, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                return [4 /*yield*/, activeParty(partyId)];
            case 1:
                activedParty = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Party je uspešno aktiviran",
                    data: activedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom aktivacije proslave.", error_1 instanceof Error ? error_1 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var deactivePartyHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, deactivedParty, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                return [4 /*yield*/, deactiveParty(partyId)];
            case 1:
                deactivedParty = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Party je uspešno deaktiviran.",
                    data: deactivedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom deaktivacije proslave.", error_2 instanceof Error ? error_2 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatePartyShowBrandHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, partyId, showBrand, permissions, updatedParty, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.party, partyId = _a.id, showBrand = _a.settings.showBrand, permissions = _a.plan.permissions;
                return [4 /*yield*/, updatePartyShowBrand(partyId, showBrand, permissions)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Show Brand podešavanje je uspešno izmenjeno.",
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom izmene podešavanja za prikazivanje brenda.", error_3 instanceof Error ? error_3 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatePartySlideShowQRHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, partyId, slideshowQR, updatedParty, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.party, partyId = _a.id, slideshowQR = _a.settings.slideshowQR;
                return [4 /*yield*/, updatePartySlideShowQR(partyId, slideshowQR)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "SlideShow QR podešavanje je uspešno izmenjeno.",
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom izmene podešavanja za prikazivanje slide show QR koda", error_4 instanceof Error ? error_4 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatePartyManualApprovalHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, partyId, manualApproval, permissions, updatedParty, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.party, partyId = _a.id, manualApproval = _a.settings.manualApproval, permissions = _a.plan.permissions;
                return [4 /*yield*/, updatePartyManualApproval(partyId, manualApproval, permissions)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Manual Approval podešavanje je uspešno izmenjeno.",
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom izmene podešavanja za manualno odobravanje.", error_5 instanceof Error ? error_5 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatedPartyViewUploadHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, partyId, permissions, status_1, updatedParty, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.party, partyId = _a.id, permissions = _a.plan.permissions;
                status_1 = req.body.status;
                return [4 /*yield*/, updatePartyViewUpload(partyId, status_1, permissions)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "".concat(status_1, " je pode\u0161eno kao primarno pode\u0161avanje za view upload."),
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom izmene podešavanja za view upload.", error_6 instanceof Error ? error_6 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatePartyAllowMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, partyId, permissions, status_2, updatedParty, error_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.party, partyId = _a.id, permissions = _a.plan.permissions;
                status_2 = req.body.status;
                return [4 /*yield*/, updatePartyAllowMedia(partyId, status_2, permissions)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "".concat(status_2, " je pode\u0161eno kao primarno pode\u0161avanje za allow media."),
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom izmene podešavanja allow media.", error_7 instanceof Error ? error_7 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatePartyAllowDownloadHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, partyId, allowDownload, permissions, updatedParty, error_8;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.party, partyId = _a.id, allowDownload = _a.settings.allowDownload, permissions = _a.plan.permissions;
                return [4 /*yield*/, updatePartyAllowDownload(partyId, allowDownload, permissions)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Allow Download podešavanje uspešno izmenjeno.",
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom izmene podešavanja za allow download.", error_8 instanceof Error ? error_8 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatePartyThemeColorHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, color, updatedParty, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                color = req.body.color;
                return [4 /*yield*/, updatePartyThemeColor(partyId, color)];
            case 1:
                updatedParty = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Theme boja podešavanje je uspešno izmenjeno.",
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom izmene podešavanja za theme color.", error_9 instanceof Error ? error_9 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
