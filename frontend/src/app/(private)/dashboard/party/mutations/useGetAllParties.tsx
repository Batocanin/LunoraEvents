import { AxiosInstance } from "@/lib/axios";
import { Party } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

function useGetAllParties() {
  return useQuery<Party[]>({
    queryKey: ["partyList"],
    queryFn: async () => {
      const result = await AxiosInstance.get("/party/getAllParties", {
        withCredentials: true,
      });

      return result.data.data;
    },
    retry: 1,
  });
}

export default useGetAllParties;
