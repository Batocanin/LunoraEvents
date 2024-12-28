import PartyCreateDesignEditor from "../../components/PartyCreateDesignEditor";

import PartySettingsPage from "../../[partyId]/settings/PartySettingsPage";
import PartyHomePage from "../../[partyId]/home/PartyHomePage";
import PartyMediaPage from "../../[partyId]/media/PartyMediaPage";
import ApperanceEditDesignEditor from "../../[partyId]/settings/Apperance/components/ApperanceEditDesignEditor";
import Test from "../../Test";
import PartyMediaGalleryAll from "../../[partyId]/media/components/PartyMediaTabs/PartyMediaGalleryAll";
import PartyMediaGalleryApproved from "../../[partyId]/media/components/PartyMediaTabs/PartyMediaGalleryApproved";
import PartyMediaGalleryPending from "../../[partyId]/media/components/PartyMediaTabs/PartyMediaGalleryPending";
import PartyMediaGalleryArchived from "../../[partyId]/media/components/PartyMediaTabs/PartyMediaGalleryArchived";
import PartyCreateDesignPricing from "../../components/PartyCreateDesignPricing";

export const editPartySteps: {
  title: string;
  component: React.ComponentType<any>;
  key: string;
}[] = [
  {
    title: "Izmena stranice",
    component: ApperanceEditDesignEditor,
    key: "edit-page",
  },
];

export const createPartySteps: {
  title: string;
  component: React.ComponentType<any>;
  key: string;
}[] = [
  {
    title: "Kreiranje stranice",
    component: PartyCreateDesignEditor,
    key: "create-page",
  },
  {
    title: "Plaćanje",
    component: PartyCreateDesignPricing,
    key: "party-pricing",
  },
];

export const partySteps: {
  title: string;
  component: React.ComponentType<any>;
  key: string;
}[] = [
  {
    title: "",
    component: PartyCreateDesignEditor,
    key: "home",
  },
  { title: "Party Design", component: Test, key: "party-design" },
];

export const settingsSteps: {
  value: string;
  component: React.ComponentType<any>;
  key: string;
}[] = [
  {
    value: "home",
    component: PartyHomePage,
    key: "",
  },
  { value: "media", component: PartyMediaPage, key: "media" },
  { value: "settings", component: PartySettingsPage, key: "settings" },
];

export const mediaSteps: {
  value: string;
  component: React.ComponentType<any>;
  key: string;
}[] = [
  { value: "all", component: PartyMediaGalleryAll, key: "all" },
  { value: "approved", component: PartyMediaGalleryApproved, key: "approved" },
  { value: "pending", component: PartyMediaGalleryPending, key: "pending" },
  {
    value: "archived",
    component: PartyMediaGalleryArchived,
    key: "archived",
  },
];
