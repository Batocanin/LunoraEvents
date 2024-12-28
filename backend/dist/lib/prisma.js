var _a;
import { PrismaClient } from "@prisma/client";
var prismaClientSingleton = function () {
    return new PrismaClient({
        omit: {
            user: {
                password: true,
            },
        },
    });
};
var prisma = (_a = globalThis.prismaGlobal) !== null && _a !== void 0 ? _a : prismaClientSingleton();
export default prisma;
if (process.env.NODE_ENV !== "production")
    globalThis.prismaGlobal = prisma;
