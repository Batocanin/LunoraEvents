import { AxiosInstance } from "@/lib/axios";

async function updateSlideShowQR(partyId: string) {
  const response = await AxiosInstance.post(
    "/party/settings/updateSlideShowQR",
    { partyId },
    { withCredentials: true }
  );

  return response.data.data;
}

export default updateSlideShowQR;
