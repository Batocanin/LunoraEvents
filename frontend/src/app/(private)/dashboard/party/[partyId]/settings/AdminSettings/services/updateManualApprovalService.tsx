import { AxiosInstance } from "@/lib/axios";

async function updateManualApprovalService(partyId: string) {
  const response = await AxiosInstance.post(
    "/party/settings/updateManualApproval",
    { partyId },
    { withCredentials: true }
  );

  return response.data.data;
}

export default updateManualApprovalService;
