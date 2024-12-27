import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateManualApprovalService from "../services/updateManualApprovalService";
import { handleMutationOptimisticallyUpdate } from "../../shared/utils/handleMutationOptimisticallyUpdate";
import { handleMutationError } from "../../shared/utils/handleMutationError";
import { useToast } from "@/hooks/use-toast";

function useUpdateManualApproval(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => await updateManualApprovalService(partyId),
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
                  manualApproval: !old.settings.manualApproval,
                },
              };
            }
            return old;
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

export default useUpdateManualApproval;
