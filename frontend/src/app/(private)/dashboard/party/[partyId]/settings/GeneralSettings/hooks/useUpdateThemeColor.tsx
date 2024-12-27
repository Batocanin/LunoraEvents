import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMutationOptimisticallyUpdate } from "../../shared/utils/handleMutationOptimisticallyUpdate";
import { handleMutationError } from "../../shared/utils/handleMutationError";
import updateThemeColor from "../../GeneralSettings/services/updateThemeColor";
import { useToast } from "@/hooks/use-toast";

function useUpdateThemeColor(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ color }: { color: string }) =>
      updateThemeColor(partyId, color),
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
                settings: { ...old.settings, themeColor: variables.color },
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
        () => mutation.mutate({ color: variables.color })
      );
    },
  });
  return mutation;
}

export default useUpdateThemeColor;
