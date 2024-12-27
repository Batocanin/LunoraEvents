import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateViewUploadService from "../services/updateViewUploadService";
import { handleMutationOptimisticallyUpdate } from "../../shared/utils/handleMutationOptimisticallyUpdate";
import { handleMutationError } from "../../shared/utils/handleMutationError";

interface UpdateViewUploadMutations {
  status: string;
}

function useUpdateViewUpload(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ status }: UpdateViewUploadMutations) =>
      await updateViewUploadService(partyId, status),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["party", partyId] });

      return {
        previousPartyData: handleMutationOptimisticallyUpdate(
          queryClient,
          ["party", partyId],
          (old) => {
            if (old) {
              return {
                ...old,
                settings: { ...old.settings, viewUpload: variables.status },
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
        () => mutation.mutate({ status: variables.status })
      );
    },
  });

  return mutation;
}

export default useUpdateViewUpload;
