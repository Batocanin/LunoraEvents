import { AxiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

function useGetPartyZipFiles(partyId: string, zipDialogOpen: boolean) {
  const mutation = useQuery({
    queryKey: ["partyZipFiles", partyId],
    queryFn: async () => {
      const response = await AxiosInstance.get(
        `/party/media/getPartyZipMedia/${partyId}`,
        { withCredentials: true }
      );

      return response.data.data;
    },
    enabled: zipDialogOpen,
    refetchOnMount: true,
  });

  return mutation;
}

export default useGetPartyZipFiles;
