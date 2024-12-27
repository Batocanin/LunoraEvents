import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Star } from "lucide-react";

function PartySettingsUpgradePlanDialog({ xs }: { xs?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {xs ? (
          <Button size="xs">
            <Star className="size-4 fill-primary-foreground" />
            Upgrade Plan
          </Button>
        ) : (
          <Button>Upgrade Plan</Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95%] h-full max-h-[95%]">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle />
          </VisuallyHidden>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PartySettingsUpgradePlanDialog;
