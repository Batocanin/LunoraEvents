import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PartyZipProp } from "@/lib/types";
import { Download } from "lucide-react";
import Link from "next/link";
import useDownloadAllFiles from "../mutations/useDownloadAllMedia";
import useGetPartyZipFiles from "../mutations/useGetPartyZipFiles";

interface PartyMediaZipDialogProps {
  partyId: string;
  zipDialogOpen: boolean;
  setIsZipDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function PartyMediaZipDialog({
  partyId,
  zipDialogOpen,
  setIsZipDialogOpen,
}: PartyMediaZipDialogProps) {
  const zipMediaMutation = useDownloadAllFiles(partyId);
  const { data, isPending, isError } = useGetPartyZipFiles(
    partyId,
    zipDialogOpen
  );
  return (
    <div className="relative flex items-center gap-2">
      <DropdownMenu open={zipDialogOpen} onOpenChange={setIsZipDialogOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="hover:bg-transparent hover:text-secondary/80"
            variant="ghost"
          >
            <Download /> Skini sve slike i snimke
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Slike i snimci</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => zipMediaMutation.mutate()}>
            Generiši novi zip
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {data?.map((media: PartyZipProp) => (
            <DropdownMenuItem key={media.id}>
              <Link
                download
                href={`${process.env.NEXT_PUBLIC_S3_URL}/${media.url}`}
              >
                {media.id}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PartyMediaZipDialog;
