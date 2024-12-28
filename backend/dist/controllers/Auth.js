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
import { authSchema } from "../schema/auth/schema.js";
import { createUser, findUserByEmail } from "../models/users/model.js";
import { hash, verify } from "@node-rs/argon2";
import { setSession, validateSessionToken } from "../models/auth/model.js";
export var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var values, _a, email, password, existingEmail, hashedPassword, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                values = req.body.values;
                _a = authSchema.parse(values), email = _a.email, password = _a.password;
                return [4 /*yield*/, findUserByEmail(email)];
            case 1:
                existingEmail = _b.sent();
                if (existingEmail) {
                    res
                        .status(404)
                        .send({ success: false, successMessage: "Email already exists." });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, hash(password, {
                        memoryCost: 19456,
                        timeCost: 2,
                        outputLen: 32,
                        parallelism: 1,
                    })];
            case 2:
                hashedPassword = _b.sent();
                return [4 /*yield*/, createUser(email, hashedPassword)];
            case 3:
                _b.sent();
                res
                    .status(201)
                    .send({ success: true, successMessage: "Successfully signed up." });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(400).send({
                    success: false,
                    successMessage: "There was an error on server, try again later",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var values, _a, email, password, user, validPassword, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                values = req.body.values;
                _a = authSchema.parse(values), email = _a.email, password = _a.password;
                return [4 /*yield*/, findUserByEmail(email)];
            case 1:
                user = _b.sent();
                if (!user) {
                    res.status(404).send({
                        success: false,
                        successMessage: "Invalid email or password.",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, verify(user.password, password, {
                        memoryCost: 19456,
                        timeCost: 2,
                        outputLen: 32,
                        parallelism: 1,
                    })];
            case 2:
                validPassword = _b.sent();
                if (!validPassword) {
                    res.status(404).send({
                        success: false,
                        successMessage: "Invalid email or password.",
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, setSession(res, user.id)];
            case 3:
                _b.sent();
                res
                    .status(201)
                    .send({ success: true, successMessage: "Successfully logged up." });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                res.status(400).send({
                    success: false,
                    successMessage: "There was an error on server, try again later",
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
export var logout = function (req, res) { };
export var validateRequest = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _a, session, user, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = req.cookies["session"];
                if (!token) {
                    res.status(401).send({
                        successMessage: "Access denied.",
                        success: false,
                    });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, validateSessionToken(token)];
            case 2:
                _a = _b.sent(), session = _a.session, user = _a.user;
                if (!user || !session) {
                    res.status(401).send({
                        successMessage: "Access denied.",
                        success: false,
                    });
                    return [2 /*return*/];
                }
                req.user = user;
                req.session = session;
                next();
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.log(error_3);
                res.status(401).send({
                    success: false,
                    successMessage: "There was an error on server while trying to auth, try again later",
                });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var validateRequestFront = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, _a, session, user, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = req.cookies["session"];
                if (!token) {
                    res.status(401).send({
                        success: false,
                        successMessage: "Access denied.",
                        data: { user: null, session: null },
                    });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, validateSessionToken(token)];
            case 2:
                _a = _b.sent(), session = _a.session, user = _a.user;
                res.status(201).send({
                    successMessage: "".concat(user ? "Access granted." : "Access denied."),
                    success: user ? true : false,
                    data: { user: user, session: session },
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.log(error_4);
                res.status(401).send({
                    success: false,
                    successMessage: "There was an error on server while trying to auth, try again later",
                    data: { user: null, session: null },
                });
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); };
