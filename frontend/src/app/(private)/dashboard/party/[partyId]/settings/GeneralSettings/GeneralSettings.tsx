import { Party } from "@/lib/types";
import GeneralSettingsShowBrand from "../GeneralSettings/components/GeneralSettingsShowBrand";
import GeneralSettingsThemeColor from "../GeneralSettings/components/GeneralSettingsThemeColor";
import GeneralSettingsSlideShowQR from "../GeneralSettings/components/GeneralSettingsSlideShowQR";

function GeneralSettings({ partyData }: { partyData: Party }) {
  return (
    <div className="mt-6 space-y-12">
      <GeneralSettingsShowBrand partyData={partyData} />
      <GeneralSettingsThemeColor partyData={partyData} />
      <GeneralSettingsSlideShowQR partyData={partyData} />
    </div>
  );
}

export default GeneralSettings;
