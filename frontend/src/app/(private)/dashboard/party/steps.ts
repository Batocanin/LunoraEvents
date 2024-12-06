import { PartyPropsForm } from "@/lib/types";
import PartyDesignForm from "./forms/PartyDesignForm";

export const steps: {
  title: string;
  component: React.ComponentType<PartyPropsForm>;
  key: string;
}[] = [
  { title: "Party Design", component: PartyDesignForm, key: "party-design" },
  { title: "Uskoro", component: PartyDesignForm, key: "uskoro" },
];
