import { AllowMediaEnum, UploadEnum } from "@prisma/client";
import prisma from "../../lib/prisma";

export const activePartyById = async (partyId: string) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      active: true,
    },
  });
  return party;
};

export const deactivePartyById = async (partyId: string) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      active: false,
    },
  });
  return party;
};

export const updatePartyShowBrandById = async (
  partyId: string,
  showBrandStatus: boolean
) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      settings: {
        update: {
          showBrand: !showBrandStatus,
        },
      },
    },
    include: {
      settings: true,
    },
  });

  return party;
};

export const updatedPartySlideShowQRById = async (
  partyId: string,
  slideShowQRStatus: boolean
) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      settings: {
        update: {
          slideshowQR: !slideShowQRStatus,
        },
      },
    },
    include: {
      settings: true,
    },
  });

  return party;
};

export const updatePartyManualApprovalById = async (
  partyId: string,
  manualApprovalStatus: boolean
) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      settings: {
        update: {
          manualApproval: !manualApprovalStatus,
        },
      },
    },
    include: {
      settings: true,
    },
  });

  return party;
};

export const updatePartyViewUploadById = async (
  partyId: string,
  viewUploadStatus: UploadEnum
) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      settings: {
        update: {
          viewUpload: viewUploadStatus,
        },
      },
    },
    include: {
      settings: true,
    },
  });

  return party;
};

export const updatePartyAllowMediaById = async (
  partyId: string,
  allowMediaStatus: AllowMediaEnum
) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      settings: {
        update: {
          allowMedia: allowMediaStatus,
        },
      },
    },
    include: {
      settings: true,
    },
  });

  return party;
};

export const updatePartyAllowDownloadById = async (
  partyId: string,
  allowDownloadStatus: boolean
) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      settings: {
        update: {
          allowDownload: !allowDownloadStatus,
        },
      },
    },
    include: {
      settings: true,
    },
  });

  return party;
};

export const updatePartyThemeColorById = async (
  partyId: string,
  color: string
) => {
  const party = await prisma.party.update({
    where: {
      id: partyId,
    },
    data: {
      settings: {
        update: {
          themeColor: color,
        },
      },
    },
    include: {
      settings: true,
    },
  });

  return party;
};
