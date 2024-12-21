import { Request, Response } from "express";
import { formatErrorResponse } from "../../utils/formatErrorResponse";
import {
  activeParty,
  deactiveParty,
  updatePartyAllowDownload,
  updatePartyAllowMedia,
  updatePartyManualApproval,
  updatePartyShowBrand,
  updatePartySlideShowQR,
  updatePartyThemeColor,
  updatePartyViewUpload,
} from "../services/partySettingsServices";

export const activePartyHandler = async (req: Request, res: Response) => {
  try {
    const { id: partyId } = req.party;

    const activedParty = await activeParty(partyId);

    res.status(200).send({
      success: true,
      message: "Party je uspešno aktiviran",
      data: activedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom aktivacije proslave.",
      error instanceof Error ? error : null
    );
  }
};

export const deactivePartyHandler = async (req: Request, res: Response) => {
  try {
    const { id: partyId } = req.party;

    const deactivedParty = await deactiveParty(partyId);

    res.status(200).send({
      success: true,
      message: "Party je uspešno deaktiviran.",
      data: deactivedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom deaktivacije proslave.",
      error instanceof Error ? error : null
    );
  }
};

export const updatePartyShowBrandHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      id: partyId,
      settings: { showBrand },
    } = req.party;

    const updatedParty = await updatePartyShowBrand(partyId, showBrand);

    res.status(200).send({
      success: true,
      message: "Show Brand podešavanje je uspešno izmenjeno.",
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom izmene podešavanja za prikazivanje brenda.",
      error instanceof Error ? error : null
    );
  }
};

export const updatePartySlideShowQRHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      id: partyId,
      settings: { slideshowQR },
    } = req.party;

    const updatedParty = await updatePartySlideShowQR(partyId, slideshowQR);

    res.status(200).send({
      success: true,
      message: "SlideShow QR podešavanje je uspešno izmenjeno.",
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom izmene podešavanja za prikazivanje slide show QR koda",
      error instanceof Error ? error : null
    );
  }
};

export const updatePartyManualApprovalHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      id: partyId,
      settings: { manualApproval },
    } = req.party;

    const updatedParty = await updatePartyManualApproval(
      partyId,
      manualApproval
    );

    res.status(200).send({
      success: true,
      message: "Manual Approval podešavanje je uspešno izmenjeno.",
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom izmene podešavanja za manualno odobravanje.",
      error instanceof Error ? error : null
    );
  }
};

export const updatedPartyViewUploadHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: partyId } = req.party;
    const { status } = req.body;

    const updatedParty = await updatePartyViewUpload(partyId, status);

    res.status(200).send({
      success: true,
      message: `${status} je podešeno kao primarno podešavanje za view upload.`,
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom izmene podešavanja za view upload.",
      error instanceof Error ? error : null
    );
  }
};

export const updatePartyAllowMediaHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: partyId } = req.party;
    const { status } = req.body;

    const updatedParty = await updatePartyAllowMedia(partyId, status);

    res.status(200).send({
      success: true,
      message: `${status} je podešeno kao primarno podešavanje za allow media.`,
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom izmene podešavanja allow media.",
      error instanceof Error ? error : null
    );
  }
};

export const updatePartyAllowDownloadHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      id: partyId,
      settings: { allowDownload },
    } = req.party;

    const updatedParty = await updatePartyAllowDownload(partyId, allowDownload);

    res.status(200).send({
      success: true,
      message: "Allow Download podešavanje uspešno izmenjeno.",
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom izmene podešavanja za allow download.",
      error instanceof Error ? error : null
    );
  }
};

export const updatePartyThemeColorHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: partyId } = req.party;
    const { color } = req.body;

    const updatedParty = await updatePartyThemeColor(partyId, color);

    res.status(200).send({
      success: true,
      message: "Theme boja podešavanje je uspešno izmenjeno.",
      data: updatedParty,
    });
  } catch (error) {
    formatErrorResponse(
      res,
      "Dogodila se greška prilikom izmene podešavanja za theme color.",
      error instanceof Error ? error : null
    );
  }
};
