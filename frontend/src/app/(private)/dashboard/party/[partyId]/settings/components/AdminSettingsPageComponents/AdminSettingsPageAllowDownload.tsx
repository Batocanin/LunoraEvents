import { Switch } from "@/components/ui/switch";
import { Party } from "@/lib/types";
import PartySettingsUpgradePlanDialog from "../PartySettingsUpgradePlanDialog";
import useUpdateAllowDownload from "../../mutations/AdminSettingsPageMutations/useUpdateAllowDownload";

function AdminSettingsPageAllowDownload({ partyData }: { partyData: Party }) {
  const {
    id: partyId,
    settings: { allowDownload },
  } = partyData;
  const updateAllowDownloadMutation = useUpdateAllowDownload(partyId);
  return (
    <div className="flex items-center gap-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            Onemogući preuzimanje za goste
          </h3>
          <div className="flex items-center gap-1">
            <PartySettingsUpgradePlanDialog xs={true} />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Sakrijte dugme za preuzimanje slika i snimaka kako bi sprečili goste
          da preuzimaju slike ili snimke
        </p>
      </div>
      <Switch
        checked={allowDownload}
        onCheckedChange={() => updateAllowDownloadMutation.mutate()}
      />
    </div>
  );
}

export default AdminSettingsPageAllowDownload;
