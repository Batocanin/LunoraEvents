import { Button } from "@/components/ui/button";
import { ArchiveX, Loader2 } from "lucide-react";
import { PartyMediaProp } from "@/lib/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import usePartyUnarchiveMediaMutation from "../hooks/usePartyUnarchiveMediaMutation";

interface PartyMediaUnarchiveButtonProps {
  partyId: string;
  image: PartyMediaProp;
  className?: string;
  children?: ReactNode;
}

function PartyMediaUnarchiveButton({
  partyId,
  image,
  className,
  children,
}: PartyMediaUnarchiveButtonProps) {
  const { mutate, isPending } = usePartyUnarchiveMediaMutation(partyId);
  return (
    <Button
      size="sm"
      variant="secondary"
      className={cn("rounded-full w-8", className)}
      disabled={isPending}
      onClick={() => mutate({ media: image })}
    >
      <ArchiveX />
      {children}
    </Button>
  );
}

export default PartyMediaUnarchiveButton;
