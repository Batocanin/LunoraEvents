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
import { z } from "zod";
export var optionalString = z.string().trim().optional().or(z.literal(""));
export var PartyInfoSchema = z.object({
    mainPhoto: z.custom(),
    backgroundPhoto: z.custom(),
    title: z.string().trim().optional(),
    message: z.string().trim().optional(),
    dateEndTime: z.string().trim(),
});
export var PartySchema = z.object(__assign({}, PartyInfoSchema.shape));
