import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

function useDownloadAllFiles(partyId: string) {
  const { toast } = useToast();
  const mutation = useMutation({
    mutationFn: async () => {
      await AxiosInstance.post(
        "/party/media/generatePartyZipMedia",
        {
          partyId,
        },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast({
        description:
          "Pokrenut je zahtev za skidanje svih slika i snimaka. Dobicete obavestenje na e-mailu kada zahtev bude obradjen. Ocekivani rok trajanja je 15 minuta.",
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        variant: "destructive",
        description:
          "Dogodila se greska prilikom slanja zahteva za skidanje svih slika i snimaka. Pokusajte ponovo kasnije ili nas kontaktirajte",
      });
    },
  });

  return mutation;
}

export default useDownloadAllFiles;
