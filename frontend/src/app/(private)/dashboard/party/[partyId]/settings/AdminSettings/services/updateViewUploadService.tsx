import { AxiosInstance } from "@/lib/axios";

async function updateViewUploadService(partyId: string, status: string) {
  const response = await AxiosInstance.post(
    "/party/settings/updateViewUpload",
    {
      partyId,
      status,
    },
    { withCredentials: true }
  );

  return response.data.data;
}

export default updateViewUploadService;
