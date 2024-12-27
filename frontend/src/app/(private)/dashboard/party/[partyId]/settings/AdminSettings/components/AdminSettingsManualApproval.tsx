import { Switch } from "@/components/ui/switch";
import { Party } from "@/lib/types";
import PartySettingsUpgradePlanDialog from "../../../../shared/components/PartySettingsUpgradePlanDialog";
import useUpdateManualApproval from "../hooks/useUpdateManualApproval";

function AdminSettingsManualApproval({ partyData }: { partyData: Party }) {
  const updateManualApprovalMutation = useUpdateManualApproval(partyData.id);
  return (
    <div className="flex items-center gap-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            Ručno odobravanje uploadovanih slika i snimaka
          </h3>
          <div className="flex items-center gap-1">
            <PartySettingsUpgradePlanDialog xs={true} />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Rucno odobrite koje slike i snimke da se prikazuju u galeriji
        </p>
      </div>
      <Switch
        checked={partyData.settings.manualApproval}
        onClick={() => updateManualApprovalMutation.mutate()}
      />
    </div>
  );
}

export default AdminSettingsManualApproval;
