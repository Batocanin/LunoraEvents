import { Router } from "express";

import { validateRequest } from "../../controllers/Auth";
import { partySettingsRoute } from "./partySettingsRoutes";
import { updatePartyPageHandler } from "../controllers/partyMediaHandler";
import {
  checkPartyOwnership,
  getAllPartiesHandler,
  getPartyHandler,
  getPresignedDownloadUrlHandler,
  getPresignedUploadUrlHandler,
} from "../controllers/partyCrudHandler";

export const partyRouter = Router();

partyRouter.use(
  "/settings",
  validateRequest,
  checkPartyOwnership,
  partySettingsRoute
);

// partyRouter.post("/createParty", validateRequest, createPartyHandler);
partyRouter.post(
  "/updatePartyPage/:partyId",
  validateRequest,
  checkPartyOwnership,
  updatePartyPageHandler
);
partyRouter.get(
  "/getParty/:partyId",
  validateRequest,
  checkPartyOwnership,
  getPartyHandler
);
partyRouter.get("/getAllParties", validateRequest, getAllPartiesHandler);

partyRouter.post(
  "/getPresignedDownloadUrl",
  validateRequest,
  checkPartyOwnership,
  getPresignedDownloadUrlHandler
);
partyRouter.post(
  "/getPresignedUploadUrl",
  validateRequest,
  checkPartyOwnership,
  getPresignedUploadUrlHandler
);
