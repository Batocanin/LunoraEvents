import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { Party } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateAllowMediaMutations {
  partyId: string;
  status: string;
}

function useUpdateAllowMedia() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ partyId, status }: UpdateAllowMediaMutations) => {
      const response = await AxiosInstance.post(
        "/party/settings/updateAllowMedia",
        {
          partyId,
          status,
        },
        { withCredentials: true }
      );

      return response.data.data;
    },
    onMutate: async (variables: UpdateAllowMediaMutations) => {
      await queryClient.cancelQueries({
        queryKey: ["party", variables.partyId],
      });

      const previousPartyData = queryClient.getQueryData([
        "party",
        variables.partyId,
      ]);

      queryClient.setQueryData(
        ["party", variables.partyId],
        (old: Party | undefined) => {
          if (old) {
            return {
              ...old,
              settings: { ...old.settings, allowMedia: variables.status },
            };
          }
        }
      );

      return { previousPartyData };
    },
    onSuccess: (data: Party) => {
      queryClient.setQueryData(["party", data.id], (old: Party | undefined) => {
        if (old) {
          return {
            ...old,
            settings: { ...old.settings, allowMedia: data.settings.allowMedia },
          };
        }
        return old;
      });
    },
    onError(error, variables, context) {
      console.log(error);
      queryClient.setQueryData(
        ["party", variables.partyId],
        context?.previousPartyData
      );
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Podešavanja nisu izmenjena</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                mutation.mutate({
                  partyId: variables.partyId,
                  status: variables.status,
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

export default useUpdateAllowMedia;
