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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { formatErrorResponse } from "../../utils/formatErrorResponse.js";
import { activePartyMedia, archivePartyMedia, completePartyMediaMultiPartUpload, createPartyMedia, createPartyMediaMultiPartUpload, createPartyPageMedia, deletePartyMedia, generatePartyZipMedia, getPartyApprovedMedias, getPartyArchivedMedias, getPartyMedias, getPartyPendingMedias, getPartyZipMedia, unarchivePartyMedia, updatePartyPage, } from "../services/partyMediaServices.js";
import { PartySchema } from "../../schema/party/schema.js";
// Poziva se samo kod create party-a, da bi se mogle dodaju slike
export var createPartyPageMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var party, _a, presignedUrls, partyValues, updatedParty, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                party = req.party;
                _a = req.body, presignedUrls = _a.presignedUrls, partyValues = _a.partyValues;
                return [4 /*yield*/, createPartyPageMedia(party, partyValues, presignedUrls)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Slike su uspešno dodate na kreiranu proslavu.",
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška tokom kreiranja stranice za proslavu prilikom dodavanja medija", error_1 instanceof Error ? error_1 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var updatePartyPageHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var party, _a, partyData, presignedUrls, values, updatedParty, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                party = req.party;
                _a = req.body, partyData = _a.partyData, presignedUrls = _a.presignedUrls;
                values = __rest(PartySchema.parse(partyData), []);
                return [4 /*yield*/, updatePartyPage(party, values, presignedUrls)];
            case 1:
                updatedParty = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Page je uspešno ažuiran.",
                    data: updatedParty,
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom ažuiranja medije party stranice.", error_2 instanceof Error ? error_2 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createPartyMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, _a, key, width, height, type, pending, createdPartyMedia, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                _a = req.body, key = _a.key, width = _a.width, height = _a.height, type = _a.type, pending = _a.pending;
                return [4 /*yield*/, createPartyMedia(partyId, key, width, height, type, pending)];
            case 1:
                createdPartyMedia = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Media je uspešno kreirana.",
                    data: createdPartyMedia,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom kreiranje medija za proslavu.", error_3 instanceof Error ? error_3 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var deletePartyMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, key, mediaId, deletedPartyMedia, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, key = _a.key, mediaId = _a.mediaId;
                return [4 /*yield*/, deletePartyMedia(key, mediaId)];
            case 1:
                deletedPartyMedia = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Media je uspešno obrisana.",
                    data: deletedPartyMedia,
                });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom brisanja medija za proslavu", error_4 instanceof Error ? error_4 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPartyMediasHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, _a, cursor, limit, _b, partyMedias, nextCursor, error_5;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                _a = req.query, cursor = _a.cursor, limit = _a.limit;
                return [4 /*yield*/, getPartyMedias(partyId, limit, cursor)];
            case 1:
                _b = _c.sent(), partyMedias = _b.partyMedias, nextCursor = _b.nextCursor;
                res.status(200).send({
                    success: true,
                    message: "Party Medias su uspešno preuzete.",
                    data: { partyMedias: partyMedias, nextCursor: nextCursor },
                });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _c.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom preuzimanja medija za proslavu.", error_5 instanceof Error ? error_5 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPartyApprovedMediasHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, _a, cursor, limit, _b, partyMedias, nextCursor, error_6;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                _a = req.query, cursor = _a.cursor, limit = _a.limit;
                return [4 /*yield*/, getPartyApprovedMedias(partyId, limit, cursor)];
            case 1:
                _b = _c.sent(), partyMedias = _b.partyMedias, nextCursor = _b.nextCursor;
                res.status(200).send({
                    success: true,
                    message: "Objavljene medije za proslavu su uspešno preuzete.",
                    data: { partyMedias: partyMedias, nextCursor: nextCursor },
                });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _c.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom preuzimanja dozvoljenih medija za proslavu.", error_6 instanceof Error ? error_6 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPartyPendingMediasHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, _a, cursor, limit, _b, partyMedias, nextCursor, error_7;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                _a = req.query, cursor = _a.cursor, limit = _a.limit;
                return [4 /*yield*/, getPartyPendingMedias(partyId, limit, cursor)];
            case 1:
                _b = _c.sent(), partyMedias = _b.partyMedias, nextCursor = _b.nextCursor;
                res.status(200).send({
                    success: true,
                    message: "Na cekanju mediji za proslavu su uspešno preuzete.",
                    data: { partyMedias: partyMedias, nextCursor: nextCursor },
                });
                return [3 /*break*/, 3];
            case 2:
                error_7 = _c.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom preuzimanja na cekanju medija za proslavu.", error_7 instanceof Error ? error_7 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPartyArchivedMediasHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, _a, cursor, limit, _b, partyMedias, nextCursor, error_8;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                _a = req.query, cursor = _a.cursor, limit = _a.limit;
                return [4 /*yield*/, getPartyArchivedMedias(partyId, limit, cursor)];
            case 1:
                _b = _c.sent(), partyMedias = _b.partyMedias, nextCursor = _b.nextCursor;
                res.status(200).send({
                    success: true,
                    message: "Arhivirani mediji za proslavu su uspešno preuzete.",
                    data: { partyMedias: partyMedias, nextCursor: nextCursor },
                });
                return [3 /*break*/, 3];
            case 2:
                error_8 = _c.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom preuzimanja arhiviranih medija za proslavu.", error_8 instanceof Error ? error_8 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var archivePartyMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mediaId, archivedPartyMedia, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                mediaId = req.body.mediaId;
                return [4 /*yield*/, archivePartyMedia(mediaId)];
            case 1:
                archivedPartyMedia = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Media je uspešno arhivirana.",
                    data: archivedPartyMedia,
                });
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom arhiviranja media.", error_9 instanceof Error ? error_9 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var unarchivePartyMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mediaId, unarchivedPartyMedia, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                mediaId = req.body.mediaId;
                return [4 /*yield*/, unarchivePartyMedia(mediaId)];
            case 1:
                unarchivedPartyMedia = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Media je uspešno uklonjena iz arhive.",
                    data: unarchivedPartyMedia,
                });
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom arhiviranja media.", error_10 instanceof Error ? error_10 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var activePartyMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mediaId, activedPartyMedia, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                mediaId = req.body.mediaId;
                return [4 /*yield*/, activePartyMedia(mediaId)];
            case 1:
                activedPartyMedia = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Media je uspešno aktivirana.",
                    data: activedPartyMedia,
                });
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom aktiviranja media.", error_11 instanceof Error ? error_11 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var generatePartyZipMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                return [4 /*yield*/, generatePartyZipMedia(partyId)];
            case 1:
                _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Uspešno je poslat zahtev za kreiranje ZIP fajla svih slika i snimaka, dobićete obaveštenje na mail kad bude gotovo.",
                    data: null,
                });
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom zipovanja medija.", error_12 instanceof Error ? error_12 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPartyZipMediaHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, partyZipMedia, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                return [4 /*yield*/, getPartyZipMedia(partyId)];
            case 1:
                partyZipMedia = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Zip Media je uspešno preuzet.",
                    data: partyZipMedia,
                });
                return [3 /*break*/, 3];
            case 2:
                error_13 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom uzimanja Party Zip Media fajlova.", error_13 instanceof Error ? error_13 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var createPartyMediaMultiPartUploadHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, _a, fileName, fileType, folder, totalParts, partyMultipartUpload, error_14;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                _a = req.body, fileName = _a.fileName, fileType = _a.fileType, folder = _a.folder, totalParts = _a.totalParts;
                return [4 /*yield*/, createPartyMediaMultiPartUpload(partyId, folder, fileName, fileType, totalParts)];
            case 1:
                partyMultipartUpload = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Medias Presigned Urls su uspešno generisani.",
                    data: partyMultipartUpload,
                });
                return [3 /*break*/, 3];
            case 2:
                error_14 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom kreiranja multipart upload medija za proslavu.", error_14 instanceof Error ? error_14 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var completePartyMediaMultiPartUploadHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, _a, parts, key, UploadId, width, height, type, pending, completedPartyMultiPartUpload, error_15;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                partyId = req.party.id;
                _a = req.body, parts = _a.parts, key = _a.key, UploadId = _a.UploadId, width = _a.width, height = _a.height, type = _a.type, pending = _a.pending;
                return [4 /*yield*/, completePartyMediaMultiPartUpload(partyId, UploadId, key, parts, width, height, type, pending)];
            case 1:
                completedPartyMultiPartUpload = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Party Medias MultiPart Upload je uspešno završen.",
                    data: completedPartyMultiPartUpload,
                });
                return [3 /*break*/, 3];
            case 2:
                error_15 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom završnice multipart upload medija za proslavu.");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
