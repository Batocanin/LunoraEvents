import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";
import useDownloadPartyPhoto from "../../../shared/hooks/useDownloadPartyPhoto";
import { PartyMediaProp } from "@/lib/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import usePartyActiveMediaMutation from "../hooks/usePartyActiveMediaMutation";

interface PartyMediaActiveButtonProps {
  partyId: string;
  image: PartyMediaProp;
  className?: string;
  children?: ReactNode;
}

function PartyMediaActiveButton({
  partyId,
  image,
  className,
  children,
}: PartyMediaActiveButtonProps) {
  const { mutate, isPending } = usePartyActiveMediaMutation(partyId);

  return (
    <Button
      size="sm"
      variant="secondary"
      className={cn("rounded-full w-8", className)}
      disabled={isPending}
      onClick={() => mutate({ media: image })}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Check />
          {children}
        </>
      )}
    </Button>
  );
}

export default PartyMediaActiveButton;
