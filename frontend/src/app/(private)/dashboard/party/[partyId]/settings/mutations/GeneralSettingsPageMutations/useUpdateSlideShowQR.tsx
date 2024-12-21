import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { Party } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateSlideShowQR(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await AxiosInstance.post(
        "/party/settings/updateSlideShowQR",
        { partyId },
        { withCredentials: true }
      );

      return response.data.data;
    },
    onMutate: async () => {
      queryClient.cancelQueries({ queryKey: ["party", partyId] });

      const previousPartyData = queryClient.getQueryData(["party", partyId]);

      queryClient.setQueryData(["party", partyId], (old: Party | undefined) => {
        if (old) {
          return {
            ...old,
            settings: {
              ...old.settings,
              slideshowQR: !old.settings.slideshowQR,
            },
          };
        }
      });

      return { previousPartyData };
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["party", partyId], (old: Party | undefined) => {
        if (old) {
          return {
            ...old,
            settings: {
              ...old.settings,
              slideshowQR: data.settings.slideshowQR,
            },
          };
        }
        return data;
      });
    },
    onError(error, variables, context) {
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

export default useUpdateSlideShowQR;
