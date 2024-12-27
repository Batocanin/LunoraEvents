import { Party } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import ApperanceEditDesignModal from "./ApperanceEditDesignModal";
import useApperanceEditPartyMutation from "../hooks/useApperanceEditPartyMutation";

function ApperanceEditButton({ partyData }: { partyData: Party }) {
  const [open, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(partyData);

  useEffect(() => {
    if (formData.settings.themeColor !== partyData.settings.themeColor) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        settings: {
          ...prevFormData.settings,
          themeColor: partyData.settings.themeColor,
        },
      }));
    }
  }, [partyData]);

  const { mutation, progress } = useApperanceEditPartyMutation(formData);

  return (
    <Dialog
      open={open}
      onOpenChange={() => !mutation.isPending && setIsOpen((prev) => !prev)}
    >
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
        Izgled stranice
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-full max-w-[95%] h-full max-h-[95%]"
      >
        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
        <ApperanceEditDesignModal
          formData={formData}
          setFormData={setFormData}
          mutation={mutation}
          progress={progress}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ApperanceEditButton;
