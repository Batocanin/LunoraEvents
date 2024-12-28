var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import prisma from "../../lib/prisma.js";
export var updatePartyPageMediaByPartyId = function (partyData, partyValues, mainPhoto, backgroundPhoto) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedParty;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.party.update({
                    where: {
                        id: partyData.id,
                    },
                    data: __assign(__assign({}, partyValues), { dateEndTime: partyValues === null || partyValues === void 0 ? void 0 : partyValues.dateEndTime, updatedAt: new Date(), mainPhoto: mainPhoto, backgroundPhoto: backgroundPhoto }),
                })];
            case 1:
                updatedParty = _a.sent();
                return [2 /*return*/, updatedParty];
        }
    });
}); };
export var createPartyMediaById = function (partyId, key, width, height, type, pending) { return __awaiter(void 0, void 0, void 0, function () {
    var createdPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.create({
                    data: {
                        partyId: partyId,
                        url: key,
                        width: width,
                        height: height,
                        type: type,
                        pending: pending,
                    },
                })];
            case 1:
                createdPartyMedia = _a.sent();
                return [2 /*return*/, createdPartyMedia];
        }
    });
}); };
export var deletePartyMediaByMediaId = function (mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.delete({
                    where: {
                        id: mediaId,
                    },
                })];
            case 1:
                deletedPartyMedia = _a.sent();
                return [2 /*return*/, deletedPartyMedia];
        }
    });
}); };
export var getPartyMediasById = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var partyMedias;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.findMany({
                    where: {
                        partyId: partyId,
                    },
                })];
            case 1:
                partyMedias = _a.sent();
                return [2 /*return*/, partyMedias];
        }
    });
}); };
export var getPartyMediasByPartyId = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var partyMedias, nextCursor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.findMany({
                    where: {
                        partyId: partyId,
                    },
                    take: Number(limit) + 1,
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: {
                        createdAt: "desc",
                    },
                })];
            case 1:
                partyMedias = _a.sent();
                nextCursor = partyMedias.length > limit ? partyMedias[limit].id : null;
                return [2 /*return*/, { partyMedias: partyMedias.slice(0, limit), nextCursor: nextCursor }];
        }
    });
}); };
export var getPartyApprovedMediasByPartyId = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var partyMedias, nextCursor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.findMany({
                    where: {
                        partyId: partyId,
                        pending: false,
                        archived: false,
                    },
                    take: Number(limit) + 1,
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: {
                        createdAt: "desc",
                    },
                })];
            case 1:
                partyMedias = _a.sent();
                nextCursor = partyMedias.length > limit ? partyMedias[limit].id : null;
                return [2 /*return*/, { partyMedias: partyMedias.slice(0, limit), nextCursor: nextCursor }];
        }
    });
}); };
export var getPartyPendingMediasByPartyId = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var partyMedias, nextCursor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.findMany({
                    where: {
                        partyId: partyId,
                        pending: true,
                        archived: false,
                    },
                    take: Number(limit) + 1,
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: {
                        createdAt: "desc",
                    },
                })];
            case 1:
                partyMedias = _a.sent();
                nextCursor = partyMedias.length > limit ? partyMedias[limit].id : null;
                return [2 /*return*/, { partyMedias: partyMedias.slice(0, limit), nextCursor: nextCursor }];
        }
    });
}); };
export var getPartyArchivedMediasByPartyId = function (partyId, limit, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var partyMedias, nextCursor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.findMany({
                    where: {
                        partyId: partyId,
                        pending: false,
                        archived: true,
                    },
                    take: Number(limit) + 1,
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: {
                        createdAt: "desc",
                    },
                })];
            case 1:
                partyMedias = _a.sent();
                nextCursor = partyMedias.length > limit ? partyMedias[limit].id : null;
                return [2 /*return*/, { partyMedias: partyMedias.slice(0, limit), nextCursor: nextCursor }];
        }
    });
}); };
export var archivePartyMediaByMediaId = function (mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var archivedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.update({
                    where: {
                        id: mediaId,
                    },
                    data: {
                        archived: true,
                    },
                })];
            case 1:
                archivedPartyMedia = _a.sent();
                return [2 /*return*/, archivedPartyMedia];
        }
    });
}); };
export var unarchivePartyMediaByMediaId = function (mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var unarchivedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.update({
                    where: {
                        id: mediaId,
                    },
                    data: {
                        archived: false,
                    },
                })];
            case 1:
                unarchivedPartyMedia = _a.sent();
                return [2 /*return*/, unarchivedPartyMedia];
        }
    });
}); };
export var activePartyMediaByMediaId = function (mediaId) { return __awaiter(void 0, void 0, void 0, function () {
    var activedPartyMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyMedia.update({
                    where: {
                        id: mediaId,
                    },
                    data: {
                        pending: false,
                    },
                })];
            case 1:
                activedPartyMedia = _a.sent();
                return [2 /*return*/, activedPartyMedia];
        }
    });
}); };
export var generatePartyMediaZipByPartyId = function (partyId, key) { return __awaiter(void 0, void 0, void 0, function () {
    var zippedMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyZip.create({
                    data: {
                        url: key,
                        partyId: partyId,
                        status: "PENDING",
                    },
                })];
            case 1:
                zippedMedia = _a.sent();
                return [2 /*return*/, zippedMedia];
        }
    });
}); };
export var updatePartyMediaZipStatus = function (status, mediaZipId) { return __awaiter(void 0, void 0, void 0, function () {
    var updatedZippedMedia;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyZip.update({
                    where: {
                        id: mediaZipId,
                    },
                    data: {
                        status: status,
                    },
                })];
            case 1:
                updatedZippedMedia = _a.sent();
                return [2 /*return*/, updatedZippedMedia];
        }
    });
}); };
export var getPartyMediaZipByPartyId = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyZip.findMany({
                    where: {
                        partyId: partyId,
                    },
                    orderBy: { createdAt: "desc" },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var checkInProgressPartyMediaZip = function (partyId) { return __awaiter(void 0, void 0, void 0, function () {
    var inProgressZip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.partyZip.findMany({
                    where: {
                        partyId: partyId,
                        OR: [{ status: "IN_PROGRESS" }, { status: "PENDING" }],
                    },
                })];
            case 1:
                inProgressZip = _a.sent();
                return [2 /*return*/, inProgressZip];
        }
    });
}); };
