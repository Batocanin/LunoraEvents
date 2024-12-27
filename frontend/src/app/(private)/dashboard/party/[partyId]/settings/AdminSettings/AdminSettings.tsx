import { Party } from "@/lib/types";
import AdminSettingsManualApproval from "./components/AdminSettingsManualApproval";
import AdminSettingsAllowMedia from "./components/AdminSettingsAllowMedia";
import AdminSettingsViewUpload from "./components/AdminSettingsViewUpload";
import AdminSettingsAllowDownload from "./components/AdminSettingsAllowDownload";

function AdminSettings({ partyData }: { partyData: Party }) {
  return (
    <div className="mt-6 space-y-12">
      <AdminSettingsManualApproval partyData={partyData} />
      <AdminSettingsAllowMedia partyData={partyData} />
      <AdminSettingsViewUpload partyData={partyData} />
      <AdminSettingsAllowDownload partyData={partyData} />
    </div>
  );
}

export default AdminSettings;
