import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PartyPermission } from "@/lib/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Star } from "lucide-react";

function PartySettingsUpgradePlanDialog({
  xs,
  permissions,
  permission,
}: {
  xs?: boolean;
  permissions: PartyPermission[] | boolean;
  permission?: string;
}) {
  if (permissions) return null;

  if (Array.isArray(permissions)) {
    const hasPermission = permissions.some((perm) => perm.name === permission);
    console.log(hasPermission);
    if (hasPermission) return null;
  }

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
