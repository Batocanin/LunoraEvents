import { cn } from "@/lib/utils";
import { Info, X } from "lucide-react";
import { useState } from "react";
import PartySettingsUpgradePlanDialog from "./PartySettingsUpgradePlanDialog";

function PartySettingsFreePlanAlert() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 gap-y-4 justify-between bg-amber-100 dark:bg-primary/20 w-full p-3 shadow-md",
        !isOpen && "hidden"
      )}
    >
      <div className="flex items-center gap-2">
        <Info className="stroke-primary dark:stroke-white break-words" />
        <p className="text-sm">
          Trenutno koristite besplatni plan. Nadogradite svoj događaj i
          otključajte sve dostupne funkcije!
        </p>
      </div>
      <div className="flex items-center gap-3 flex-grow justify-end">
        <PartySettingsUpgradePlanDialog />
        <X className="cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>
    </div>
  );
}

export default PartySettingsFreePlanAlert;
