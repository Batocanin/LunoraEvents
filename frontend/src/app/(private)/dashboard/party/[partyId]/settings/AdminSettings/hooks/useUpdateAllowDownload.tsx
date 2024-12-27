import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMutationError } from "../../shared/utils/handleMutationError";
import { handleMutationOptimisticallyUpdate } from "../../shared/utils/handleMutationOptimisticallyUpdate";
import updateAllowDownloadService from "../services/updateAllowDownloadService";
import { useToast } from "@/hooks/use-toast";

function useUpdateAllowDownload(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => await updateAllowDownloadService(partyId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["party", partyId] });

      return {
        previousPartyData: handleMutationOptimisticallyUpdate(
          queryClient,
          ["party", partyId],
          (old) => {
            if (old) {
              return {
                ...old,
                settings: {
                  ...old.settings,
                  allowDownload: !old.settings.allowDownload,
                },
              };
            }
          }
        ),
      };
    },
    onSuccess: () => {},
    onError: (error, variables, context) => {
      console.log(error);
      handleMutationError(
        toast,
        queryClient,
        ["party", partyId],
        context?.previousPartyData,
        () => mutation.mutate()
      );
    },
  });

  return mutation;
}

export default useUpdateAllowDownload;
