import { Party } from "@/lib/types";
import AdminSettingsPageManualApproval from "../components/AdminSettingsPageComponents/AdminSettingsPageManualApproval";
import AdminSettingsPageAllowMedia from "../components/AdminSettingsPageComponents/AdminSettingsPageAllowMedia";
import AdminSettingsPageViewUpload from "../components/AdminSettingsPageComponents/AdminSettingsPageViewUpload";
import AdminSettingsPageAllowDownload from "../components/AdminSettingsPageComponents/AdminSettingsPageAllowDownload";

function AdminSettingsPage({ partyData }: { partyData: Party }) {
  return (
    <div className="mt-6 space-y-12">
      <AdminSettingsPageManualApproval partyData={partyData} />
      <AdminSettingsPageAllowMedia partyData={partyData} />
      <AdminSettingsPageViewUpload partyData={partyData} />
      <AdminSettingsPageAllowDownload partyData={partyData} />
    </div>
  );
}

export default AdminSettingsPage;
