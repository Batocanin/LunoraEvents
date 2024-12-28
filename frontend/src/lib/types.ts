import React from "react";
import { PartyValues } from "./validation";
import { AxiosError } from "axios";

declare global {
  interface Window {
    createLemonSqueezy: () => void;
    LemonSqueezy: {
      Setup: (options: { eventHandler: (event: any) => void }) => void;
      Refresh: () => void;
      Url: {
        Open: (url: string) => void;
        Close: () => void;
      };
      Affiliate: {
        GetID: () => string;
        Build: (url: string) => string;
      };
    };
  }
}

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
  formData: PartyValues;
  setFormData: React.Dispatch<React.SetStateAction<PartyValues>>;
}

export interface Party {
  id: string;
  title: string;
  message?: string;
  mainPhoto?: string;
  backgroundPhoto?: string;
  dateEndTime: string;
  active: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  settings: PartySettings;
  plan: PartyPlan;
}

export type PartyPlan = {
  id: String;
  name: String;
  description: String;
  variantId: Number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  permissions: PartyPermission[];
};

export type PartyPermission = {
  id: String;
  name: String;
  description: String;
  createdAt: Date;
  updatedAt: Date;
};

export type PartySettings = {
  id: String;
  themeColor: string;
  showBrand: boolean;
  allowDownload: boolean;
  viewUpload: string;
  manualApproval: boolean;
  slideshowQR: boolean;
  allowMedia: AllowMediaEnum;

  updatedAt: Date;
};

export type FilesToUpload = {
  fileName: string;
  file?: File;
  fileType?: string;
  type: string;
};

export interface FilesToUploadGallery {
  id: string;
  file: File;
  previewUrl: string; // Privremeni URL za pregled
  progress: number; // Procenat napretka
  serverUrl: string | null; // URL fajla nakon otpremanja
  status: "uploading" | "completed" | "failed"; // Status otpremanja
}

export interface PartyMediaProp {
  id: string;
  url: string;
  width: number;
  height: number;
  type: string;
  pending: boolean;
  archived: boolean;
  partyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartyZipProp {
  id: string;
  url: string;
  status: PartyZipStatusEnum;

  partyId: string;

  updatedAt: Date;
  createdAt: Date;
}

export interface PartyGalleryMedia {
  pages: {
    partyMedias: PartyMediaProp[];
    nextCursor: string | null;
  }[];
  pageParams: (string | null)[];
}

export enum AllowMediaEnum {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  BOTH = "BOTH",
}

export enum ViewUploadEnum {
  VIEWUPLOAD = "VIEWUPLOAD",
  UPLOAD = "UPLOAD",
  VIEW = "VIEW",
}

enum PartyZipStatusEnum {
  PENDING,
  IN_PROGRESS,
  COMPLETE,
}

type APIError = {
  success: boolean;
  successMessage: string;
};

export type AxiosApiError = AxiosError<APIError>;
