"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PartyPopper } from "lucide-react";
import PartyCreateDesignModal from "./PartyCreateDesignModal";
import { Button } from "@/components/ui/button";
import useCreatePartyMutation from "../mutations/useCreatePartyMutation";
import { useState } from "react";
import { PartyValues } from "@/lib/validation";

function PartyCreateButton() {
  const [open, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<PartyValues>({
    dateEndTime: "",
  });
  const { mutation, progress } = useCreatePartyMutation(formData);
  return (
    <Dialog
      open={open}
      onOpenChange={() => !mutation.isPending && setIsOpen((open) => !open)}
    >
      <DialogTrigger asChild>
        <Button className="mx-auto w-fit flex gap-2">
          <PartyPopper />
          Kreiraj proslavu
        </Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="w-full max-w-[95%] h-full max-h-[95%]"
      >
        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
        <PartyCreateDesignModal
          formData={formData}
          setFormData={setFormData}
          mutation={mutation}
          progress={progress}
        />
      </DialogContent>
    </Dialog>
  );
}

export default PartyCreateButton;
