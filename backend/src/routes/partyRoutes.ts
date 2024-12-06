import { Router } from "express";
import { getAllParties, getParty, saveParty } from "../controllers/Party";
import { validateRequest } from "../controllers/Auth";
import upload from "../lib/multerConfig";

export const partyRouter = Router();

partyRouter.get("/getParty/:partyId", validateRequest, getParty);
partyRouter.get("/getAllParties", validateRequest, getAllParties);
partyRouter.post("/saveParty", validateRequest, upload.any(), saveParty);
