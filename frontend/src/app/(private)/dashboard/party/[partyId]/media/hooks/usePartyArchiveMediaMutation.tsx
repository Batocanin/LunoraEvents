import { useMutation, useQueryClient } from "@tanstack/react-query";
import archivePartyMediaService from "../services/archivePartyMediaService";
import { handleMutationOptimisticallyUpdate } from "../../settings/shared/utils/handleMutationOptimisticallyUpdate";
import { PartyGalleryMedia, PartyMediaProp } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import getArchivedPartyMediasService from "../services/getArchivedPartyMediasService";

function useArchivePartyMediaMutation(partyId: string) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ media }: { media: PartyMediaProp }) =>
      await archivePartyMediaService(partyId, media.id),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["partyMediaAll", partyId] });
      await queryClient.cancelQueries({
        queryKey: ["partyMediaArchived", partyId],
      });

      const oldArchivedData = queryClient.getQueryData([
        "partyMediaArchived",
        partyId,
      ]);

      const fetchedArchivedData = !oldArchivedData
        ? await getArchivedPartyMediasService(partyId, null)
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
                    ? { ...media, archived: true }
                    : media
                ),
              })),
            };
          }

          return {
            pages: [
              {
                nextCursor: null,
                partyMedias: [{ ...variables.media, archived: true }],
              },
            ],
            pageParams: [null],
          };
        }
      );
      const previousPartyMediaApprovedData = handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaApproved", partyId],
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
      const previousPartyMediaArchivedData = handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaArchived", partyId],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page, index: number) =>
                index === 0
                  ? {
                      ...page,
                      partyMedias: [
                        { ...variables.media, archived: true },
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
                  { ...variables.media, archived: true },
                  ...fetchedArchivedData.partyMedias,
                ],
              },
            ],
            pageParams: [null],
          };
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
            <p>Dogodila se greska! Media nije arhivirana.</p>
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

export default useArchivePartyMediaMutation;
