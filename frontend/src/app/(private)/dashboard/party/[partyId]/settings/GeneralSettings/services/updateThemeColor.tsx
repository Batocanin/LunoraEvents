import { AxiosInstance } from "@/lib/axios";

async function updateThemeColor(partyId: string, color: string) {
  const response = await AxiosInstance.post(
    "/party/settings/updateThemeColor",
    {
      partyId,
      color,
    },
    { withCredentials: true }
  );

  return response.data.data;
}

export default updateThemeColor;
