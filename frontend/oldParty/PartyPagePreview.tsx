import { cn } from "@/lib/utils";
import { PartyValues } from "@/lib/validation";
import { partyDesigns } from "./partyDesigns";

interface PartyPagePreviewProps {
  partyData: PartyValues;
  className?: string;
}

function PartyPagePreview({ partyData, className }: PartyPagePreviewProps) {
  const SelectedPartyDesign =
    partyDesigns.find((design) => design.id === partyData.design)?.component ||
    partyDesigns[0].component;

  return (
    <div className={cn("w-full", className)}>
      <SelectedPartyDesign partyData={partyData} />
    </div>
  );
}

export default PartyPagePreview;
