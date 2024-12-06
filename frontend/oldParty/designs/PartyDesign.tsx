import { cn } from "@/lib/utils";
import { PartyValues } from "@/lib/validation";
import { FieldValues } from "react-hook-form";

interface PartyDesignProps {
  field: FieldValues;
  partyData: PartyValues;
  item: {
    id: string;
    label: string;
    component: React.ComponentType<{ partyData: PartyValues }>;
  };
}

function PartyDesign({ field, item, partyData }: PartyDesignProps) {
  return (
    <div
      className={cn("h-fit w-full")}
      // checked={field.value?.includes(item.id)}
      onClick={() => field.onChange(item.id)}
    >
      <item.component partyData={partyData} />
    </div>
  );
}

export default PartyDesign;
