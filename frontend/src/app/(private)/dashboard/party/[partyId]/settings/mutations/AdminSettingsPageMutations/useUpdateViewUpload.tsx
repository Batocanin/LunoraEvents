import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { Party } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateViewUploadMutations {
  status: string;
}

function useUpdateViewUpload(partyId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ status }: UpdateViewUploadMutations) => {
      const response = await AxiosInstance.post(
        "/party/settings/updateViewUpload",
        {
          partyId,
          status,
        },
        { withCredentials: true }
      );

      return response.data.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: ["party", partyId] });

      const previousPartyData = queryClient.getQueryData(["party", partyId]);

      queryClient.setQueryData(["party", partyId], (old: Party) => {
        if (old) {
          return {
            ...old,
            settings: { ...old.settings, viewUpload: variables.status },
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
            settings: { ...old.settings, viewUpload: data.settings.viewUpload },
          };
        }
        return old;
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
                mutation.mutate({ status: variables.status });
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

export default useUpdateViewUpload;
