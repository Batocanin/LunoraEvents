import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Party } from "@/lib/types";
import { ChromePicker } from "react-color";
import useUpdateThemeColor from "../../mutations/GeneralSettingsPageMutations/useUpdateThemeColor";

function GeneralSettingsPageThemeColor({ partyData }: { partyData: Party }) {
  const updateThemeColorMutation = useUpdateThemeColor(partyData.id);
  return (
    <div className="flex items-center gap-8">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Boja teme</h3>
        </div>
        <p className="text-muted-foreground text-sm">
          Izaberite boju za vašu stranicu. Boja ce biti izmenjena na svim vašim
          stranicama
        </p>
      </div>
      <Popover>
        <PopoverTrigger>
          <div
            className="h-10 w-10 rounded-lg"
            style={{ backgroundColor: partyData.settings.themeColor }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <ChromePicker
            color={partyData.settings.themeColor}
            onChangeComplete={(color) =>
              updateThemeColorMutation.mutate({ color: color.hex })
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default GeneralSettingsPageThemeColor;
