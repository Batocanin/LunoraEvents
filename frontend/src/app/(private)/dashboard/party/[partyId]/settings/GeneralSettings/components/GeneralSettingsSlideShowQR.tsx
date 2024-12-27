import { Switch } from "@/components/ui/switch";
import { Party } from "@/lib/types";
import useUpdateSlideShowQR from "../hooks/useUpdateSlideShowQR";

function GeneralSettingsSlideShowQR({ partyData }: { partyData: Party }) {
  const updateSlideShowQRMutation = useUpdateSlideShowQR(partyData.id);

  return (
    <div className="flex items-center gap-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Sakri Slideshow QR kod</h3>
        </div>
        <p className="text-muted-foreground text-sm">
          Ukljucite da bi ste uklonili QR kod sa Slideshow
        </p>
      </div>
      <Switch
        onClick={() => updateSlideShowQRMutation.mutate()}
        checked={partyData.settings.slideshowQR}
      />
    </div>
  );
}

export default GeneralSettingsSlideShowQR;
