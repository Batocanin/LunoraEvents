import { Button } from "@/components/ui/button";
import { Archive, Loader2 } from "lucide-react";
import { PartyMediaProp } from "@/lib/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import useArchivePartyMediaMutation from "../hooks/usePartyArchiveMediaMutation";

interface PartyMediaArchiveButtonProps {
  partyId: string;
  image: PartyMediaProp;
  className?: string;
  children?: ReactNode;
}

function PartyMediaArchiveButton({
  partyId,
  image,
  className,
  children,
}: PartyMediaArchiveButtonProps) {
  const { mutate } = useArchivePartyMediaMutation(partyId);
  return (
    <Button
      size="sm"
      variant="secondary"
      className={cn("rounded-full w-8", className)}
      onClick={() => mutate({ media: image })}
    >
      <Archive />
      {children}
    </Button>
  );
}

export default PartyMediaArchiveButton;
