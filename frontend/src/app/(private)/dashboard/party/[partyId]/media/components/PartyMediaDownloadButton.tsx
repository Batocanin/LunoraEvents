import { Button } from "@/components/ui/button";
import useDownloadPartyPhoto from "../../../shared/hooks/useDownloadPartyPhoto";
import { Download, Loader2 } from "lucide-react";
import { PartyMediaProp } from "@/lib/types";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PartyMediaDownloadButtonProps {
  partyId: string;
  image: PartyMediaProp;
  className?: string;
  children?: ReactNode;
}

function PartyMediaDownloadButton({
  partyId,
  image,
  className,
  children,
}: PartyMediaDownloadButtonProps) {
  const { mutate, isPending } = useDownloadPartyPhoto(partyId);
  return (
    <Button
      size="sm"
      variant="outline"
      className={cn("rounded-full w-8", className)}
      disabled={isPending}
      onClick={() => mutate({ key: image.url, type: image.type })}
    >
      {isPending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <Download />
          {children}
        </>
      )}
    </Button>
  );
}

export default PartyMediaDownloadButton;
