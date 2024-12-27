import { AxiosInstance } from "@/lib/axios";

async function updateAllowDownloadService(partyId: string) {
  const response = await AxiosInstance.post(
    "/party/settings/updateAllowDownload",
    {
      partyId,
    },
    { withCredentials: true }
  );

  return response.data.data;
}

export default updateAllowDownloadService;
