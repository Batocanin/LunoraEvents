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
import { getPresignedDownloadUrl, getPresignedUploadUrl, } from "../services/partyCrudServices.js";
import { getAllParties, getPartyByPartyId } from "../models/partyCrudModel.js";
import { AppError } from "../../utils/customError.js";
// export const createPartyHandler = async (req: Request, res: Response) => {
//   try {
//     const { id: userId } = req.user;
//     const createdParty = await createParty(userId);
//     res.status(200).send({
//       success: true,
//       message: "Proslava je uspešno kreirana.",
//       data: createdParty,
//     });
//   } catch (error) {
//     formatErrorResponse(
//       res,
//       "Dogodila se greška prilikom kreiranje stranice proslave.",
//       error instanceof Error ? error : null
//     );
//   }
// };
export var getPartyHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var party;
    return __generator(this, function (_a) {
        try {
            party = req.party;
            res.status(200).send({
                success: true,
                message: "Proslava je uspešno preuzeta.",
                data: party,
            });
        }
        catch (error) {
            formatErrorResponse(res, "Dogodila se greška prilikom preuzimanja podataka o proslavi.", error instanceof Error ? error : null);
        }
        return [2 /*return*/];
    });
}); };
export var getAllPartiesHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, allParties, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.user.id;
                return [4 /*yield*/, getAllParties(userId)];
            case 1:
                allParties = _a.sent();
                res.status(200).send({
                    success: true,
                    message: "Uspešno su preuzete sve proslave.",
                    data: allParties,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom preuzimanja svih proslava.", error_1 instanceof Error ? error_1 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPresignedDownloadUrlHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, key, type, presignedUrl, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, key = _a.key, type = _a.type;
                return [4 /*yield*/, getPresignedDownloadUrl(key, type)];
            case 1:
                presignedUrl = _b.sent();
                res.status(200).send({
                    success: true,
                    message: "Download Presigned Url je uspešno kreiran.",
                    data: { presignedUrl: presignedUrl, type: type },
                });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom generisanja presigned download url", error_2 instanceof Error ? error_2 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var getPresignedUploadUrlHandler = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, files, _b, folder, partyId, presignedUrls, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, files = _a.files, _b = _a.folder, folder = _b === void 0 ? "" : _b;
                partyId = req.party.id;
                return [4 /*yield*/, getPresignedUploadUrl(partyId, folder, files)];
            case 1:
                presignedUrls = _c.sent();
                res.status(200).send({
                    success: true,
                    message: "Upload Presigned Url je uspešno kreiran.",
                    data: presignedUrls,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _c.sent();
                formatErrorResponse(res, "Dogodila se greška prilikom generisanja presigned upload url", error_3 instanceof Error ? error_3 : null);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
export var checkPartyOwnership = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var partyId, userId, party, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Middleware invoked for ".concat(req.method, " ").concat(req.originalUrl));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!req.params.partyId && !req.body.partyId) {
                    res.status(404).send({
                        success: false,
                        successMessage: "Dogodila se greska sa ID proslave",
                    });
                    return [2 /*return*/];
                }
                partyId = req.params.partyId || req.body.partyId;
                userId = req.user.id;
                return [4 /*yield*/, getPartyByPartyId(partyId)];
            case 2:
                party = _a.sent();
                if (!party)
                    throw new AppError("Party nije pronadjen.", 404);
                if (party.userId !== userId)
                    throw new AppError("Niste autorizovani za pristup proslavi.", 401);
                req.party = party;
                next();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                formatErrorResponse(res, "Dogodila se greska prilikom provere autorizacije nad proslavom.", error_4 instanceof Error ? error_4 : null);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
