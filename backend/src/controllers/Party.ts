import { Request, Response } from "express";
import { PartySchema } from "../schema/party/schema";
import {
  createPartyById,
  getAllPartiesByUserId,
  getPartyById,
  updatePartyById,
} from "../models/party/model";

export const saveParty = async (req: Request, res: Response) => {
  try {
    const { ...otherValues } = PartySchema.parse(req.body);
    const files = req.files as Express.Multer.File[];
    const mainPhoto = files.find((file) => file.fieldname === "mainPhoto");
    const backgroundPhoto = files.find(
      (file) => file.fieldname === "backgroundPhoto"
    );

    const { id: userId } = req.user;
    const partyId = req?.body?.id;

    const existingParty = partyId ? await getPartyById(partyId, userId) : null;

    if (partyId && !existingParty) {
      res
        .status(404)
        .send({ success: false, successMessage: "Party Page not found." });
      return;
    }

    if (partyId) {
      const party = await updatePartyById(
        partyId,
        userId,
        otherValues,
        mainPhoto,
        backgroundPhoto
      );
      res.status(200).send({
        success: true,
        successMessage: "Party is succesfully updated",
        data: party,
      });
    } else {
      const party = await createPartyById(
        userId,
        otherValues,
        mainPhoto,
        backgroundPhoto
      );
      res.status(200).send({
        success: true,
        successMessage: "Party is succesfully created",
        data: party,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      successMessage: "Dogodila se greška na serveru, pokušajte ponovo kasnije",
    });
  }
};

export const getAllParties = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const parties = await getAllPartiesByUserId(userId);
    res.status(200).send({
      success: true,
      successMessage: "Parties is succesfully fetched",
      data: parties,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      successMessage: "Dogodila se greška na serveru, pokušajte ponovo kasnije",
    });
  }
};

export const getParty = async (req: Request, res: Response) => {
  try {
    const { partyId } = req.params;
    const userId = req.user.id;
    const party = await getPartyById(partyId, userId);

    if (!party) {
      res.status(404).send({
        success: false,
        successMessage: "Party not found.",
      });
    }

    res.status(200).send({
      success: true,
      successMessage: "Party is successfully fetched.",
      data: party,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      successMessage: "Dogodila se greška na serveru, pokušajte ponovo kasnije",
    });
  }
};
