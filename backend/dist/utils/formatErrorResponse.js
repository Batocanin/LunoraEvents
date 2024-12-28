import { AppError } from "./customError.js";
export var formatErrorResponse = function (res, defaultMessage, error, statusCode) {
    if (error === void 0) { error = null; }
    if (statusCode === void 0) { statusCode = 500; }
    if (error instanceof AppError) {
        return res.status(error.statusCode).send({
            success: false,
            message: error.message,
            error: {
                details: error.details || "Nema više detalja o grešci.",
            },
        });
    }
    return res.status(statusCode).send({
        success: false,
        message: defaultMessage,
        error: {
            details: (error === null || error === void 0 ? void 0 : error.message) || "Nema više detalja o grešci",
        },
    });
};
