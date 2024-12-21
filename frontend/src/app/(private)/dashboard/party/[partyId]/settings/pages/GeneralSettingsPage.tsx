import { Party } from "@/lib/types";
import GeneralSettingsPageShowbrand from "../components/GeneralSettingsPageComponents/GeneralSettingsPageShowBrand";
import GeneralSettingsPageThemeColor from "../components/GeneralSettingsPageComponents/GeneralSettingsPageThemeColor";
import GeneralSettingsPageSlideShowQR from "../components/GeneralSettingsPageComponents/GeneralSettingsPageSlideShowQR";

function GeneralSettingsPage({ partyData }: { partyData: Party }) {
  return (
    <div className="mt-6 space-y-12">
      <GeneralSettingsPageShowbrand partyData={partyData} />
      <GeneralSettingsPageThemeColor partyData={partyData} />
      <GeneralSettingsPageSlideShowQR partyData={partyData} />
    </div>
  );
}

export default GeneralSettingsPage;
