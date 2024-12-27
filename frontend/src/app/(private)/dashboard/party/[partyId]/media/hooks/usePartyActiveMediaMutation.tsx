import { useMutation, useQueryClient } from "@tanstack/react-query";
import activePartyMediaService from "../services/activePartyMediaService";
import { PartyGalleryMedia, PartyMediaProp } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { handleMutationOptimisticallyUpdate } from "../../settings/shared/utils/handleMutationOptimisticallyUpdate";
import getPendingPartyMediasService from "../services/getPendingPartyMediasService";

function usePartyActiveMediaMutation(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ media }: { media: PartyMediaProp }) =>
      await activePartyMediaService(partyId, media.id),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["partyMediaAll", partyId] });
      await queryClient.cancelQueries({
        queryKey: ["partyMediaPending", partyId],
      });

      const previousPartyMediaAllData = handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaAll", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                partyMedias: page.partyMedias.map((media) =>
                  media.id === variables.media.id
                    ? { ...media, pending: false }
                    : media
                ),
              })),
            };
          }
        }
      );
      const previousPartyMediaApprovedData = handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaApproved", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page, index: number) =>
                index === 0
                  ? {
                      ...page,
                      partyMedias: [
                        { ...variables.media, pending: false },
                        ...page.partyMedias,
                      ],
                    }
                  : page
              ),
            };
          }
          return {
            pages: [{ nextCursor: null, partyMedias: [variables.media] }],
            pageParams: [null],
          };
        }
      );
      const previousPartyMediaPendingData = handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaPending", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page) => ({
                ...page,
                partyMedias: page.partyMedias.filter(
                  (media) => media.id !== variables.media.id
                ),
              })),
            };
          }
          return old;
        }
      );

      return {
        previousPartyMediaAllData,
        previousPartyMediaApprovedData,
        previousPartyMediaPendingData,
      };
    },
    onSuccess: () => {},
    onError: (error, variables, context) => {
      console.log(error);
      queryClient.setQueryData(
        ["partyMediaAll", partyId],
        context?.previousPartyMediaAllData
      );
      queryClient.setQueryData(
        ["partyMediaApproved", partyId],
        context?.previousPartyMediaApprovedData
      );
      queryClient.setQueryData(
        ["partyMediaPending", partyId],
        context?.previousPartyMediaPendingData
      );
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Media nije aktivirana.</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                mutation.mutate({ media: variables.media });
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

export default usePartyActiveMediaMutation;
