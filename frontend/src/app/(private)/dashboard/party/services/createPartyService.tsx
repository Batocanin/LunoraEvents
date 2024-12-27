import { AxiosInstance } from "@/lib/axios";
import { PartyValues } from "@/lib/validation";

async function createPartyService(partyData: PartyValues) {
  const response = await AxiosInstance.post(
    "/party/createParty",
    {
      partyData,
    },
    {
      withCredentials: true,
    }
  );

  return response.data;
}

export default createPartyService;
