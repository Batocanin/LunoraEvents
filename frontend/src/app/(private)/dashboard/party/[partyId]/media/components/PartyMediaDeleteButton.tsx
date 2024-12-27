import { Button } from "@/components/ui/button";
import usePartyDeleteMediaMutation from "../hooks/usePartyDeleteMediaMutation";
import { Loader2, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PartyMediaDeleteButtonProps {
  partyId: string;
  url: string | null;
  mediaId: string;
  className?: string;
  children?: ReactNode;
}

function PartyMediaDeleteButton({
  partyId,
  url,
  mediaId,
  className,
  children,
}: PartyMediaDeleteButtonProps) {
  const { toast } = useToast();
  const deletePartyMediaMutation = usePartyDeleteMediaMutation(partyId);

  const handleDeleteButtonClick = () => {
    if (!url)
      return toast({
        description:
          "Slika još uvek nije uploadovana na server, pokušajte ponovo kasnije ili obrišete sliku unutar galerije",
      });
    deletePartyMediaMutation.mutate({ url, mediaId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className={cn("rounded-full w-8", className)}
          disabled={deletePartyMediaMutation.isPending}
        >
          {deletePartyMediaMutation.isPending ? (
            <Loader2 className="animate-spin stroke-white" />
          ) : (
            <>
              <Trash className="size-4 stroke-white" />
              {children}
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Da li ste sigurni?</AlertDialogTitle>
          <AlertDialogDescription>
            Ova radnja se ne može poništiti. Ovo će trajno obrisati sliku sa
            servera.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Otkaži</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteButtonClick}>
            Obriši
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PartyMediaDeleteButton;
