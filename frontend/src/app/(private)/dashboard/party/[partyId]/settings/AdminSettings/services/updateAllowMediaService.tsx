import { AxiosInstance } from "@/lib/axios";

async function updateAllowMediaService(partyId: string, status: string) {
  const response = await AxiosInstance.post(
    "/party/settings/updateAllowMedia",
    {
      partyId,
      status,
    },
    { withCredentials: true }
  );

  return response.data.data;
}

export default updateAllowMediaService;
