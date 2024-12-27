import { AxiosInstance } from "@/lib/axios";
import { AxiosApiError, Party } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

function useGetParty(partyId: string | string[] | undefined) {
  return useQuery<Party, AxiosApiError>({
    queryKey: ["party", partyId],
    queryFn: async () => {
      const response = await AxiosInstance.get(`/party/getParty/${partyId}`, {
        withCredentials: true,
      });
      return response.data.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export default useGetParty;
