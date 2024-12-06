import { PartyValues } from "./validation";

export type User = {
  id: string;
  email: string;
  password: string;
};

export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export interface PartyPropsForm {
  partyData: PartyValues;
  setPartyData: (data: PartyValues) => void;
}

export interface Party {
  id: string;
  title: string;
  message?: string;
  mainPhotoUrl?: string;
  backgroundPhotoUrl?: string;
  dateEndTime: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
