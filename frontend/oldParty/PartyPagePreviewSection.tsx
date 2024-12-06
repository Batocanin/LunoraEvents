import { PartyValues } from "@/lib/validation";
import PartyPagePreview from "./PartyPagePreview";
import {
  BackgroundColorPicker,
  ButtonColorPicker,
  TextColorPicker,
} from "./ColorPicker";

interface PartyPagePreviewSectionProps {
  partyData: PartyValues;
  setPartyData: (data: PartyValues) => void;
}

function PartyPagePreviewSection({
  partyData,
  setPartyData,
}: PartyPagePreviewSectionProps) {
  return (
    <div className="relative hidden w-1/2 lg:flex">
      <div className="absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3 z-10">
        <TextColorPicker
          color={partyData.titleColorHex}
          onChange={(color) =>
            setPartyData({ ...partyData, titleColorHex: color })
          }
        />
        <ButtonColorPicker
          color={partyData.buttonBackgroundHex}
          onChange={(color) =>
            setPartyData({ ...partyData, buttonBackgroundHex: color })
          }
        />
        <BackgroundColorPicker
          color={partyData.backgroundColorHex}
          onChange={(color) =>
            setPartyData({ ...partyData, backgroundColorHex: color })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto p-3">
        <PartyPagePreview partyData={partyData} className="max-w-2xl" />
      </div>
    </div>
  );
}

export default PartyPagePreviewSection;
