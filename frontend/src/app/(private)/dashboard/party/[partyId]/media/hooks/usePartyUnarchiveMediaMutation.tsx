import { useMutation, useQueryClient } from "@tanstack/react-query";
import unarchivePartyMediaService from "../services/unarchivePartyMediaService";
import { handleMutationOptimisticallyUpdate } from "../../settings/shared/utils/handleMutationOptimisticallyUpdate";
import { PartyGalleryMedia, PartyMediaProp } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import getApprovedPartyMediasService from "../services/getApprovedPartyMediasService";

function usePartyUnarchiveMediaMutation(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ media }: { media: PartyMediaProp }) =>
      await unarchivePartyMediaService(partyId, media.id),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["partyMediaAll", partyId] });
      await queryClient.cancelQueries({
        queryKey: ["partyMediaArchived", partyId],
      });

      const oldApprovedData = queryClient.getQueryData([
        "partyMediaApproved",
        partyId,
      ]);

      const fetchedApprovedData = !oldApprovedData
        ? await getApprovedPartyMediasService(partyId, null)
        : null;

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
                    ? { ...media, archived: false }
                    : media
                ),
              })),
            };
          }
          return old;
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
                        { ...variables.media, archived: false },
                        ...page.partyMedias,
                      ],
                    }
                  : page
              ),
            };
          }
          return {
            pages: [
              {
                nextCursor: null,
                partyMedias: [
                  { ...variables.media, archived: false },
                  ...fetchedApprovedData.partyMedias,
                ],
              },
            ],
            pageParams: [null],
          };
        }
      );
      const previousPartyMediaArchivedData = handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaArchived", partyId],
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
        previousPartyMediaArchivedData,
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
        ["partyMediaArchived", partyId],
        context?.previousPartyMediaArchivedData
      );
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Media nije objavljena.</p>
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

export default usePartyUnarchiveMediaMutation;
