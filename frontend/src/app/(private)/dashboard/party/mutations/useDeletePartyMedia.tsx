import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { PartyGalleryMedia, PartyMediaProp } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeletePartyMedia(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ url, mediaId }: { url: string; mediaId: string }) => {
      const response = await AxiosInstance.post(
        "/party/media/deletePartyMedia",
        {
          partyId,
          mediaId,
          key: url,
        },
        { withCredentials: true }
      );

      return response.data.data;
    },

    onSuccess: (_, { mediaId }) => {
      toast({ description: "Slika je uspesno obrisana" });
      queryClient.setQueryData(
        ["partyMedia", partyId],
        (oldData: PartyGalleryMedia | undefined) =>
          updatePartyMediaCache(oldData, mediaId)
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

const updatePartyMediaCache = (
  oldData: PartyGalleryMedia | undefined,
  photoId: string
): PartyGalleryMedia | undefined => {
  if (!oldData)
    return {
      pages: [{ nextCursor: null, partyMedias: [] }],
      pageParams: [null],
    };

  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      partyMedias: page.partyMedias.filter((media) => media.id !== photoId),
    })),
  };
};

export default useDeletePartyMedia;
