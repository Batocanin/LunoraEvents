"use server";

import { cookies } from "next/headers";
import { AxiosInstance } from "./axios";

export const validateRequest = async () => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    const response = await AxiosInstance.get(`/auth/validate-request`, {
      headers: {
        Cookie: `session=${sessionCookie?.value}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
