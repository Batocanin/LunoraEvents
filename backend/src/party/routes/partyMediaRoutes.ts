import { Router } from "express";
import { validateRequest } from "../../controllers/Auth";
import {
  completePartyMediaMultiPartUploadHandler,
  createPartyMediaHandler,
  createPartyMediaMultiPartUploadHandler,
  createPartyPageMediaHandler,
  deletePartyMediaHandler,
  generatePartyZipMediaHandler,
  getPartyMediasListHandler,
  getPartyZipMediaHandler,
} from "../controllers/partyMediaHandler";
import { checkPartyOwnership } from "../controllers/partyCrudHandler";

export const partyMediaRouter = Router();

// Samo kada se kreira party se poziva ovo da bi se dodale slike
partyMediaRouter.post(
  "/createPartyPageMedia",
  validateRequest,
  checkPartyOwnership,
  createPartyPageMediaHandler
);
partyMediaRouter.post(
  "/createPartyMedia",
  validateRequest,
  checkPartyOwnership,
  createPartyMediaHandler
);
partyMediaRouter.post(
  "/deletePartyMedia",
  validateRequest,
  checkPartyOwnership,
  deletePartyMediaHandler
);
partyMediaRouter.get(
  "/getPartyMedias/:partyId",
  validateRequest,
  checkPartyOwnership,
  getPartyMediasListHandler
);
partyMediaRouter.post(
  "/createPartyMultiPartUpload",
  validateRequest,
  checkPartyOwnership,
  createPartyMediaMultiPartUploadHandler
);
partyMediaRouter.post(
  "/completeMultiPartUpload",
  validateRequest,
  checkPartyOwnership,
  completePartyMediaMultiPartUploadHandler
);
partyMediaRouter.post(
  "/generatePartyZipMedia",
  validateRequest,
  checkPartyOwnership,
  generatePartyZipMediaHandler
);
partyMediaRouter.get(
  "/getPartyZipMedia/:partyId",
  validateRequest,
  checkPartyOwnership,
  getPartyZipMediaHandler
);
