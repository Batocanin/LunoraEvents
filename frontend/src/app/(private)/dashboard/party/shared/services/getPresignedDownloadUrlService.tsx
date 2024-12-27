import { AxiosInstance } from "@/lib/axios";

async function getPresignedDownloadUrlService(
  partyId: string,
  key: string,
  type: string
) {
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
}

export default getPresignedDownloadUrlService;
