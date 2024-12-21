import { Router } from "express";
import {
  activePartyHandler,
  deactivePartyHandler,
  updatedPartyViewUploadHandler,
  updatePartyAllowDownloadHandler,
  updatePartyAllowMediaHandler,
  updatePartyManualApprovalHandler,
  updatePartyShowBrandHandler,
  updatePartySlideShowQRHandler,
  updatePartyThemeColorHandler,
} from "../../party/controllers/partySettingsHandler";

export const partySettingsRoute = Router();

partySettingsRoute.post("/activeParty", activePartyHandler);
partySettingsRoute.post("/deactiveParty", deactivePartyHandler);
partySettingsRoute.post("/updateShowBrand", updatePartyShowBrandHandler);
partySettingsRoute.post("/updateSlideShowQR", updatePartySlideShowQRHandler);
partySettingsRoute.post(
  "/updateManualApproval",
  updatePartyManualApprovalHandler
);
partySettingsRoute.post("/updateViewUpload", updatedPartyViewUploadHandler);
partySettingsRoute.post("/updateAllowMedia", updatePartyAllowMediaHandler);
partySettingsRoute.post(
  "/updateAllowDownload",
  updatePartyAllowDownloadHandler
);
partySettingsRoute.post("/updateThemeColor", updatePartyThemeColorHandler);
