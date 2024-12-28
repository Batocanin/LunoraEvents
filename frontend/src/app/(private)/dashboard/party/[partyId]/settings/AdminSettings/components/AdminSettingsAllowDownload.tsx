import { Switch } from "@/components/ui/switch";
import { Party } from "@/lib/types";
import PartySettingsUpgradePlanDialog from "../../../../shared/components/PartySettingsUpgradePlanDialog";
import useUpdateAllowDownload from "../hooks/useUpdateAllowDownload";

function AdminSettingsAllowDownload({ partyData }: { partyData: Party }) {
  const {
    id: partyId,
    settings: { allowDownload },
    plan: { permissions },
  } = partyData;
  const updateAllowDownloadMutation = useUpdateAllowDownload(partyId);

  const hasPermission = permissions.some(
    (permission) => permission.name === "ALLOW_DOWNLOAD"
  );
  return (
    <div className="flex items-center gap-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            Onemogući preuzimanje za goste
          </h3>
          <div className="flex items-center gap-1">
            <PartySettingsUpgradePlanDialog
              xs={true}
              permissions={hasPermission}
            />
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
        disabled={!hasPermission}
      />
    </div>
  );
}

export default AdminSettingsAllowDownload;
