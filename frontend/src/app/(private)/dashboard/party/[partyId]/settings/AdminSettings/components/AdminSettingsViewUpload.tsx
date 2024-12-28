import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ImageUp, Upload, View } from "lucide-react";
import { Party, ViewUploadEnum } from "@/lib/types";
import PartySettingsUpgradePlanDialog from "../../../../shared/components/PartySettingsUpgradePlanDialog";
import useUpdateViewUpload from "../hooks/useUpdateViewUpload";

function AdminSettingsViewUpload({ partyData }: { partyData: Party }) {
  const updateViewUploadMutation = useUpdateViewUpload(partyData.id);

  const hasPermission = partyData.plan.permissions.some(
    (permission) => permission.name === "VIEW_UPLOAD"
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">Dozvole za digitalni album</h3>
        <div className="flex items-center gap-1">
          <PartySettingsUpgradePlanDialog
            xs={true}
            permissions={hasPermission}
          />
        </div>
      </div>
      <p className="text-muted-foreground text-sm">
        Izmenite kako gosti mogu da koriste digitalni album
      </p>
      <RadioGroup
        defaultValue="VIEWUPLOAD"
        onValueChange={(e) => updateViewUploadMutation.mutate({ status: e })}
        className="w-full max-w-[784px] grid grid-cols-3 gap-4 mt-4"
      >
        <div>
          <RadioGroupItem
            value="VIEWUPLOAD"
            id="VIEWUPLOAD"
            className="peer sr-only"
            checked={
              ViewUploadEnum.VIEWUPLOAD === partyData.settings.viewUpload
            }
            disabled={!hasPermission}
          />
          <Label
            htmlFor="VIEWUPLOAD"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary font-normal gap-4 leading-normal text-center"
          >
            <ImageUp />
            <h3 className="text-xl font-semibold">Pregled & Upload</h3>
            <p>
              Gosti mogu da otpremaju nove fotografije i pregledaju postojeće.
            </p>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="VIEW"
            id="VIEW"
            className="peer sr-only"
            checked={ViewUploadEnum.VIEW === partyData.settings.viewUpload}
            disabled={!hasPermission}
          />
          <Label
            htmlFor="VIEW"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary font-normal gap-4 leading-normal text-center"
          >
            <View />
            <h3 className="text-xl font-semibold">Pregled</h3>
            <p>
              Gosti mogu da pregledaju postojeće fotografije, ali ne mogu da
              otpremaju nove.
            </p>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="UPLOAD"
            id="UPLOAD"
            className="peer sr-only"
            checked={ViewUploadEnum.UPLOAD === partyData.settings.viewUpload}
            disabled={!hasPermission}
          />
          <Label
            htmlFor="UPLOAD"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary font-normal gap-4 leading-normal text-center"
          >
            <Upload />
            <h3 className="text-xl font-semibold">Upload</h3>
            <p>
              Gosti mogu da otpremaju nove fotografije, ali ne mogu da
              pregledaju postojeće.
            </p>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default AdminSettingsViewUpload;
