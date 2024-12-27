import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { Party } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { act } from "react";

function useActiveParty(partyId: string | string[] | undefined) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<Party>({
    mutationFn: async () => {
      const response = await AxiosInstance.post(`/party/activeParty`, {
        partyId,
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["party", data.id], (old: Party) => {
        if (old) {
          return { ...old, active: true };
        }
        return [data];
      });
    },
    onError: (error) => {
      console.log(error);
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Proslava nije deaktivirana</p>
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

export default useActiveParty;
