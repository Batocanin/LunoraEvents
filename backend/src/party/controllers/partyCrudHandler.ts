import { NextFunction, Request, Response } from "express";
import { formatErrorResponse } from "../../utils/formatErrorResponse";
import { PartySchema } from "../../schema/party/schema";
import {
  createParty,
  getPresignedDownloadUrl,
  getPresignedUploadUrl,
} from "../services/partyCrudServices";
import { getAllParties, getPartyByPartyId } from "../models/partyCrudModel";
import { AppError } from "../../utils/customError";

export const createPartyHandler = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;
    const { partyData } = req.body;

    const { ...values } = PartySchema.parse(partyData);

    const createdParty = await createParty(userId, values);

    res.status(200).send({
      success: true,
      message: "Proslava je uspešno kreirana.",
      data: createdParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom kreiranje stranice proslave.",
      error instanceof Error ? error : null
    );
  }
};

export const getPartyHandler = async (req: Request, res: Response) => {
  try {
    const party = req.party;

    res.status(200).send({
      success: true,
      message: "Proslava je uspešno preuzeta.",
      data: party,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom preuzimanja podataka o proslavi.",
      error instanceof Error ? error : null
    );
  }
};

export const getAllPartiesHandler = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user;

    const allParties = await getAllParties(userId);

    res.status(200).send({
      success: true,
      message: "Uspešno su preuzete sve proslave.",
      data: allParties,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom preuzimanja svih proslava.",
      error instanceof Error ? error : null
    );
  }
};

export const getPresignedDownloadUrlHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { key, type } = req.body;

    const presignedUrl = await getPresignedDownloadUrl(key, type);

    res.status(200).send({
      success: true,
      message: "Download Presigned Url je uspešno kreiran.",
      data: { presignedUrl, type },
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom generisanja presigned download url",
      error instanceof Error ? error : null
    );
  }
};

export const getPresignedUploadUrlHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { files, folder = "" } = req.body;
    const { id: partyId } = req.party;

    const presignedUrls = await getPresignedUploadUrl(partyId, folder, files);

    res.status(200).send({
      success: true,
      message: "Upload Presigned Url je uspešno kreiran.",
      data: presignedUrls,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom generisanja presigned upload url",
      error instanceof Error ? error : null
    );
  }
};

export const checkPartyOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Middleware invoked for ${req.method} ${req.originalUrl}`);
  try {
    if (!req.params.partyId && !req.body.partyId) {
      res.status(404).send({
        success: false,
        successMessage: "Dogodila se greska sa ID proslave",
      });
      return;
    }
    const partyId = req.params.partyId || req.body.partyId;
    const userId = req.user.id;
    const party = await getPartyByPartyId(partyId);

    if (!party) throw new AppError("Party nije pronadjen.", 404);

    if (party.userId !== userId)
      throw new AppError("Niste autorizovani za pristup proslavi.", 401);

    req.party = party;
    next();
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greska prilikom provere autorizacije nad proslavom.",
      error instanceof Error ? error : null
    );
  }
};
