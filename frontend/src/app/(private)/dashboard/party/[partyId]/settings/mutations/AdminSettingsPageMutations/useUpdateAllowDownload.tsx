import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { Party } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateAllowDownload(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await AxiosInstance.post(
        "/party/settings/updateAllowDownload",
        {
          partyId,
        },
        { withCredentials: true }
      );

      return response.data.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["party", partyId] });

      const previousPartyData = queryClient.getQueryData(["party", partyId]);

      queryClient.setQueryData(["party", partyId], (old: Party) => {
        if (old) {
          return {
            ...old,
            settings: {
              ...old.settings,
              allowDownload: !old.settings.allowDownload,
            },
          };
        }
      });

      return { previousPartyData };
    },
    onSuccess: (data: Party) => {
      queryClient.setQueryData(["party", partyId], (old: Party) => {
        if (old) {
          return {
            ...old,
            settings: {
              ...old.settings,
              allowDownload: data.settings.allowDownload,
            },
          };
        }
      });
    },
    onError: (error, variables, context) => {
      console.log(error);
      queryClient.setQueryData(["party", partyId], context?.previousPartyData);
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Podešavanja nisu izmenjena</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                mutation.mutate();
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

export default useUpdateAllowDownload;
