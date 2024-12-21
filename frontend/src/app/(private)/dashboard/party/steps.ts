import Test from "./Test";
import PartyCreateDesignEditor from "./components/PartyCreateDesignEditor";
import ApperancePageEditDesignEditor from "./[partyId]/settings/components/ApperancePageComponents/ApperancePageEditDesignEditor";
import PartySettingsPage from "./[partyId]/settings/PartySettingsPage";
import PartyHomePage from "./[partyId]/home/PartyHomePage";
import PartyMediaPage from "./[partyId]/media/PartyMediaPage";

export const editPartySteps: {
  title: string;
  component: React.ComponentType<any>;
  key: string;
}[] = [
  {
    title: "Izmena stranice",
    component: ApperancePageEditDesignEditor,
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
  { title: "Party Design", component: Test, key: "party-design" },
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
