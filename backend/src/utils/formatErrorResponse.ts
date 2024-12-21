import { Response } from "express";
import { AppError } from "./customError";

export const formatErrorResponse = (
  res: Response,
  defaultMessage: string,
  error: Error | null = null,
  statusCode: number = 500
) => {
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
      details: error?.message || "Nema više detalja o grešci",
    },
  });
};
