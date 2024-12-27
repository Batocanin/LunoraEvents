import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMutationError } from "../../shared/utils/handleMutationError";
import { handleMutationOptimisticallyUpdate } from "../../shared/utils/handleMutationOptimisticallyUpdate";
import updateSlideShowQR from "../services/updateSlideShowQR";
import { useToast } from "@/hooks/use-toast";

function useUpdateSlideShowQR(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => updateSlideShowQR(partyId),
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey: ["party", partyId] });

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
                  slideshowQR: !old.settings.slideshowQR,
                },
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
        ["party", partyId],
        context?.previousPartyData,
        () => mutation.mutate()
      );
    },
  });
  return mutation;
}

export default useUpdateSlideShowQR;
