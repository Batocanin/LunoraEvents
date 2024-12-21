import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

function useDownloadPartyPhoto(partyId: string) {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async ({ key, type }: { key: string; type: string }) => {
      const response = await AxiosInstance.post(
        `/party/getPresignedDownloadUrl`,
        {
          partyId,
          key,
          type,
        },
        {
          withCredentials: true,
        }
      );
      return response.data.data;
    },
    onSuccess: ({ presignedUrl }) => {
      const link = document.createElement("a");
      link.href = presignedUrl;
      link.download = presignedUrl.split("/").pop() || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onError: (error, { key, type }, context) => {
      console.log(error);
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Slika nije obrisana.</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                mutation.mutate({ key, type });
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

export default useDownloadPartyPhoto;
