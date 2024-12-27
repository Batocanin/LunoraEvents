import { AxiosInstance } from "@/lib/axios";

async function updateShowBrandService(partyId: string) {
  const response = await AxiosInstance.post(
    "/party/settings/updateShowBrand",
    {
      partyId,
    },
    { withCredentials: true }
  );

  return response.data.data;
}

export default updateShowBrandService;
