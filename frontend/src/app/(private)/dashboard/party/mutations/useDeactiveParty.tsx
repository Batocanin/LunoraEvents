import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { Party } from "@/lib/types";
import { PartyValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function useDeactiveParty(partyId: string | string[] | undefined) {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<Party>({
    mutationFn: async () => {
      const response = await AxiosInstance.post(`/party/deactiveParty`, {
        partyId,
      });
      return response.data.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["party", data.id], (old: Party) => {
        if (old) {
          return { ...old, active: false };
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

export default useDeactiveParty;
