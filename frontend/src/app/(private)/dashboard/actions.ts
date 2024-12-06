import { AxiosInstance } from "@/lib/axios";
import { Party, Session } from "@/lib/types";
import { cookies } from "next/headers";

export const getPartiesById = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  return await AxiosInstance.get<{ data: Party[] }>(`/party/getAllParties`, {
    headers: {
      Cookie: `session=${sessionCookie?.value}`,
    },
  });
};
