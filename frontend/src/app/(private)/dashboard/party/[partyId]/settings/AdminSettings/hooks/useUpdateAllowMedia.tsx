import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMutationError } from "../../shared/utils/handleMutationError";
import { handleMutationOptimisticallyUpdate } from "../../shared/utils/handleMutationOptimisticallyUpdate";
import updateAllowMediaService from "../services/updateAllowMediaService";
import { useToast } from "@/hooks/use-toast";

interface UpdateAllowMediaMutations {
  partyId: string;
  status: string;
}

function useUpdateAllowMedia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ partyId, status }: UpdateAllowMediaMutations) =>
      await updateAllowMediaService(partyId, status),
    onMutate: async (variables: UpdateAllowMediaMutations) => {
      await queryClient.cancelQueries({
        queryKey: ["party", variables.partyId],
      });

      return {
        previousPartyData: handleMutationOptimisticallyUpdate(
          queryClient,
          ["party", variables.partyId],
          (old) => {
            if (old) {
              return {
                ...old,
                settings: { ...old.settings, allowMedia: variables.status },
              };
            }
            return old;
          }
        ),
      };
    },
    onSuccess: () => {},
    onError(error, variables, context) {
      console.log(error);
      handleMutationError(
        toast,
        queryClient,
        ["party", variables.partyId],
        context?.previousPartyData,
        () =>
          mutation.mutate({
            partyId: variables.partyId,
            status: variables.status,
          })
      );
    },
  });

  return mutation;
}

export default useUpdateAllowMedia;
