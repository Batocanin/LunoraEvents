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
import { Button } from "@/components/ui/button";
import { PartyMediaProp } from "@/lib/types";
import { Download, Loader2, Trash } from "lucide-react";
import Image from "next/image";
import useDeletePartyPhoto from "../../../../mutations/useDeletePartyMedia";
import useDownloadPartyPhoto from "../../../../mutations/useDownloadPartyPhoto";

interface PartyMediaGalleryCarouselImageProps {
  image: PartyMediaProp;
  partyId: string;
}

function PartyMediaGalleryCarouselImage({
  image,
  partyId,
}: PartyMediaGalleryCarouselImageProps) {
  const {
    mutate: deletePhoto,
    isSuccess,
    isPending: deleteIsPending,
  } = useDeletePartyPhoto(partyId);
  const { mutate: downloadPhoto, isPending: downloadIsPending } =
    useDownloadPartyPhoto(partyId);
  return (
    <div className="flex-[0_0_100%] flex items-center justify-center">
      <div className="relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${image.url}`}
          alt=""
          width={image.width}
          height={image.height}
        />
        <div className="rounded-lg absolute flex gap-3 text-primary top-3 left-3">
          <Button
            size="sm"
            variant="outline"
            disabled={downloadIsPending}
            onClick={() => downloadPhoto({ key: image.url, type: image.type })}
          >
            {downloadIsPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Download />
                Preuzmi
              </>
            )}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="default" disabled={deleteIsPending}>
                {deleteIsPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Trash /> Obriši
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Da li ste sigurni?</AlertDialogTitle>
                <AlertDialogDescription>
                  Ova radnja se ne može poništiti. Ovo će trajno obrisati sliku
                  sa servera.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Otkaži</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    deletePhoto({
                      url: image.url,
                      mediaId: image.id,
                    });
                  }}
                >
                  Obriši
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}

export default PartyMediaGalleryCarouselImage;
