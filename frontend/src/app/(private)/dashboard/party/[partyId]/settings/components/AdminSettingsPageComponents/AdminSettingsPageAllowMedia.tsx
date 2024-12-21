import { Checkbox } from "@/components/ui/checkbox";
import { AllowMediaEnum, Party } from "@/lib/types";
import { useEffect, useState } from "react";
import useUpdateAllowMedia from "../../mutations/AdminSettingsPageMutations/useUpdateAllowMedia";
import PartySettingsUpgradePlanDialog from "../PartySettingsUpgradePlanDialog";

function AdminSettingsPageAllowMedia({ partyData }: { partyData: Party }) {
  const {
    id: partyId,
    settings: { allowMedia },
  } = partyData;
  const updateAllowMediaMutation = useUpdateAllowMedia();

  const [mediaSelection, setMediaSelection] = useState({
    IMAGE: allowMedia === "BOTH" || allowMedia === "IMAGE",
    VIDEO: allowMedia === "BOTH" || allowMedia === "VIDEO",
  });

  const handleMediaChange = (type: AllowMediaEnum, value: boolean | string) => {
    if (type === "VIDEO" && !mediaSelection.IMAGE) return;
    if (type === "IMAGE" && !mediaSelection.VIDEO) return;

    const updatedMediaSelection = { ...mediaSelection, [type]: value };
    setMediaSelection(updatedMediaSelection);

    const status =
      updatedMediaSelection.IMAGE && updatedMediaSelection.VIDEO
        ? "BOTH"
        : updatedMediaSelection.IMAGE
        ? "IMAGE"
        : "VIDEO";

    updateAllowMediaMutation.mutate({ partyId, status });
  };

  return (
    <div className="flex items-center gap-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Dozvoljeni tipovi medija</h3>
          <div className="flex items-center gap-1">
            <PartySettingsUpgradePlanDialog xs={true} />
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          Kontroliši koje vrste medija mogu biti otpremljene na tvoj dogadjaj
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Checkbox
            name="image"
            checked={mediaSelection.IMAGE}
            onCheckedChange={(value) =>
              handleMediaChange(AllowMediaEnum.IMAGE, value)
            }
            className="h-5 w-5"
          />
          <p>Slika</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Checkbox
            name="video"
            checked={mediaSelection.VIDEO}
            onCheckedChange={(value) =>
              handleMediaChange(AllowMediaEnum.VIDEO, value)
            }
            className="h-5 w-5"
          />
          <p>Video</p>
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsPageAllowMedia;
