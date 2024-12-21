import { Request, Response } from "express";
import { formatErrorResponse } from "../../utils/formatErrorResponse";
import {
  completePartyMediaMultiPartUpload,
  createPartyMedia,
  createPartyMediaMultiPartUpload,
  createPartyPageMedia,
  deletePartyMedia,
  generatePartyZipMedia,
  getPartyMediasList,
  getPartyZipMedia,
  updatePartyPage,
} from "../services/partyMediaServices";
import { PartySchema } from "../../schema/party/schema";

// Poziva se samo kod create party-a, da bi se mogle dodaju slike
export const createPartyPageMediaHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const party = req.party;
    const { presignedUrls } = req.body;

    const updatedParty = await createPartyPageMedia(party, presignedUrls);

    res.status(200).send({
      success: true,
      message: "Slike su uspešno dodate na kreiranu proslavu.",
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška tokom kreiranja stranice za proslavu prilikom dodavanja medija",
      error instanceof Error ? error : null
    );
  }
};

export const updatePartyPageHandler = async (req: Request, res: Response) => {
  try {
    const party = req.party;
    const { partyData, presignedUrls } = req.body;

    const { ...values } = PartySchema.parse(partyData);

    const updatedParty = await updatePartyPage(party, values, presignedUrls);

    res.status(200).send({
      success: true,
      message: "Party Page je uspešno ažuiran.",
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom ažuiranja medije party stranice.",
      error instanceof Error ? error : null
    );
  }
};

export const createPartyMediaHandler = async (req: Request, res: Response) => {
  try {
    const { id: partyId } = req.party;
    const { key, width, height, type } = req.body;

    const createdPartyMedia = await createPartyMedia(
      partyId,
      key,
      width,
      height,
      type
    );

    res.status(200).send({
      success: true,
      message: "Party Media je uspešno kreirana.",
      data: createdPartyMedia,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom kreiranje medija za proslavu.",
      error instanceof Error ? error : null
    );
  }
};

export const deletePartyMediaHandler = async (req: Request, res: Response) => {
  try {
    const { key, mediaId } = req.body;

    const deletedPartyMedia = await deletePartyMedia(key, mediaId);

    res.status(200).send({
      success: true,
      message: "Party Media je uspešno obrisana.",
      data: deletedPartyMedia,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom brisanja medija za proslavu",
      error instanceof Error ? error : null
    );
  }
};

export const getPartyMediasListHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: partyId } = req.party;
    const { cursor, limit } = req.query;

    const { partyMedias, nextCursor } = await getPartyMediasList(
      partyId,
      limit as string,
      cursor as string
    );

    res.status(200).send({
      success: true,
      message: "Party Medias su uspešno preuzete.",
      data: { partyMedias, nextCursor },
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom preuzimanja medija za proslavu.",
      error instanceof Error ? error : null
    );
  }
};

export const generatePartyZipMediaHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: partyId } = req.party;

    await generatePartyZipMedia(partyId);

    res.status(200).send({
      success: true,
      message:
        "Uspešno je poslat zahtev za kreiranje ZIP fajla svih slika i snimaka, dobićete obaveštenje na mail kad bude gotovo.",
      data: null,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom zipovanja medija.",
      error instanceof Error ? error : null
    );
  }
};

export const getPartyZipMediaHandler = async (req: Request, res: Response) => {
  try {
    const { id: partyId } = req.party;

    const partyZipMedia = await getPartyZipMedia(partyId);

    res.status(200).send({
      success: true,
      message: "Party Zip Media je uspešno preuzet.",
      data: partyZipMedia,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom uzimanja Party Zip Media fajlova.",
      error instanceof Error ? error : null
    );
  }
};

export const createPartyMediaMultiPartUploadHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: partyId } = req.party;
    const { fileName, fileType, folder, totalParts } = req.body;

    const partyMultipartUpload = await createPartyMediaMultiPartUpload(
      partyId,
      folder,
      fileName,
      fileType,
      totalParts
    );

    res.status(200).send({
      success: true,
      message: "Party Medias Presigned Urls su uspešno generisani.",
      data: partyMultipartUpload,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom kreiranja multipart upload medija za proslavu.",
      error instanceof Error ? error : null
    );
  }
};

export const completePartyMediaMultiPartUploadHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: partyId } = req.party;
    const { parts, key, UploadId, width, height, type } = req.body;

    const completedPartyMultiPartUpload =
      await completePartyMediaMultiPartUpload(
        partyId,
        UploadId,
        key,
        parts,
        width,
        height,
        type
      );

    res.status(200).send({
      success: true,
      message: "Party Medias MultiPart Upload je uspešno završen.",
      data: completedPartyMultiPartUpload,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom završnice multipart upload medija za proslavu."
    );
  }
};
