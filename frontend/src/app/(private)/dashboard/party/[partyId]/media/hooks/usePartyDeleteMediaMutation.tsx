import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FilesToUploadGallery, PartyGalleryMedia } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePartyMediaService from "../services/deletePartyMediaService";
import { handleMutationOptimisticallyUpdate } from "../../settings/shared/utils/handleMutationOptimisticallyUpdate";

function usePartyDeleteMediaMutation(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ url, mediaId }: { url: string; mediaId: string }) =>
      deletePartyMediaService(partyId, mediaId, url),
    onSuccess: (data, { mediaId }) => {
      toast({ description: data.message });
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaAll", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                partyMedias: page.partyMedias.filter(
                  (media) => media.id !== mediaId
                ),
              })),
            };
          }
          return old;
        }
      );
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaApproved", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                partyMedias: page.partyMedias.filter(
                  (media) => media.id !== mediaId
                ),
              })),
            };
          }
          return old;
        }
      );
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaPending", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                partyMedias: page.partyMedias.filter(
                  (media) => media.id !== mediaId
                ),
              })),
            };
          }
          return old;
        }
      );
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaArchived", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                partyMedias: page.partyMedias.filter(
                  (media) => media.id !== mediaId
                ),
              })),
            };
          }
          return old;
        }
      );
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["adminUploads"],
        (old: FilesToUploadGallery[] | undefined) => {
          if (old) {
            return old.filter((upload) => upload.id !== mediaId);
          }
          return old;
        }
      );
    },
    onError: (error, variables, context) => {
      console.log("Dogodila se greska prilikom brisanja slike: ", error);
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Slika nije obrisana.</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                mutation.mutate({
                  url: variables.url,
                  mediaId: variables.mediaId,
                });
              }}
            >
              Retry
            </Button>
          </div>
        ),
      });
    },
  });

  return mutation;
}

export default usePartyDeleteMediaMutation;
