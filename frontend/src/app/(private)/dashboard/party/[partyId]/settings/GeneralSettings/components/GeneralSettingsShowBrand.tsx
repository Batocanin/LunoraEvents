import { Switch } from "@/components/ui/switch";
import { Party } from "@/lib/types";
import PartySettingsUpgradePlanDialog from "../../../../shared/components/PartySettingsUpgradePlanDialog";
import useUpdateShowBrand from "../hooks/useUpdateShowBrand";

function GeneralSettingsShowBrand({ partyData }: { partyData: Party }) {
  const updateShowBrandMutation = useUpdateShowBrand(partyData.id);

  const hasPermission = partyData.plan.permissions.some(
    (permission) => permission.name === "SHOW_BRAND"
  );

  return (
    <div className="flex items-center gap-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Ukloni LunoraEvents brend</h3>
          <div className="flex items-center gap-1">
            <PartySettingsUpgradePlanDialog
              xs={true}
              permissions={hasPermission}
            />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Ukloni naš LunoraEvents brend i reklame sa vaše stranice
        </p>
      </div>
      <Switch
        onClick={() => updateShowBrandMutation.mutate()}
        checked={partyData.settings.showBrand}
        disabled={!hasPermission}
      />
    </div>
  );
}

export default GeneralSettingsShowBrand;
