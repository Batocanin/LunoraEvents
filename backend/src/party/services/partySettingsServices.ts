import { AllowMediaEnum, UploadEnum } from "@prisma/client";
import { AppError } from "../../utils/customError";
import {
  activePartyById,
  deactivePartyById,
  updatedPartySlideShowQRById,
  updatePartyAllowDownloadById,
  updatePartyAllowMediaById,
  updatePartyManualApprovalById,
  updatePartyShowBrandById,
  updatePartyThemeColorById,
  updatePartyViewUploadById,
} from "../models/partySettingsModel";

export const activeParty = async (partyId: string) => {
  const activedParty = await activePartyById(partyId);

  if (!activedParty) throw new AppError("Party nije pronadjen.");
  if (activedParty.active) throw new AppError("Party je već aktivan.");

  // Uraditi proveru da li je danas dan kada je zakazana proslava

  return activedParty;
};

export const deactiveParty = async (partyId: string) => {
  const deactivedParty = await deactivePartyById(partyId);

  if (!deactivedParty) throw new AppError("Party nije pronadjen.");
  if (!deactivedParty.active) throw new AppError("Party je već deaktiviran.");

  return deactivedParty;
};

export const updatePartyShowBrand = async (
  partyId: string,
  showBrandStatus: boolean
) => {
  const updatedParty = await updatePartyShowBrandById(partyId, showBrandStatus);

  if (!updatedParty) throw new AppError("Party nije pronadjen.");

  return updatedParty;
};

export const updatePartySlideShowQR = async (
  partyId: string,
  slideShowQR: boolean
) => {
  const updatedParty = await updatedPartySlideShowQRById(partyId, slideShowQR);

  if (!updatedParty) throw new AppError("Party nije pronadjen.");

  return updatedParty;
};

export const updatePartyManualApproval = async (
  partyId: string,
  manualApprovalStatus: boolean
) => {
  const updatedParty = await updatePartyManualApprovalById(
    partyId,
    manualApprovalStatus
  );

  if (!updatedParty) throw new AppError("Party nije pronadjen.");

  return updatedParty;
};

export const updatePartyViewUpload = async (
  partyId: string,
  viewUploadStatus: UploadEnum
) => {
  if (
    viewUploadStatus !== UploadEnum.VIEWUPLOAD &&
    viewUploadStatus !== UploadEnum.VIEW &&
    viewUploadStatus !== UploadEnum.UPLOAD
  ) {
    throw new AppError("Vrednost view upload status-a je nepostojeća.");
  }

  const updatedParty = await updatePartyViewUploadById(
    partyId,
    viewUploadStatus
  );

  if (!updatedParty) throw new AppError("Party nije pronadjen.");

  return updatedParty;
};

export const updatePartyAllowMedia = async (
  partyId: string,
  allowMediaStatus: AllowMediaEnum
) => {
  if (
    allowMediaStatus !== AllowMediaEnum.BOTH &&
    allowMediaStatus !== AllowMediaEnum.IMAGE &&
    allowMediaStatus !== AllowMediaEnum.VIDEO
  ) {
    throw new AppError("Vrednost allow media status-a je nepostojeća");
  }

  const updatedParty = await updatePartyAllowMediaById(
    partyId,
    allowMediaStatus
  );

  if (!updatedParty) throw new AppError("Party nije pronadjen.");

  return updatedParty;
};

export const updatePartyAllowDownload = async (
  partyId: string,
  allowDownloadStatus: boolean
) => {
  const updatedParty = await updatePartyAllowDownloadById(
    partyId,
    allowDownloadStatus
  );

  if (!updatedParty) throw new AppError("Party nije pronadjen.");

  return updatedParty;
};

export const updatePartyThemeColor = async (partyId: string, color: string) => {
  const updatedParty = await updatePartyThemeColorById(partyId, color);

  if (!updatedParty) throw new AppError("Party nije pronadjen.");

  return updatedParty;
};
