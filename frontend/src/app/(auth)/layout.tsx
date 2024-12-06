"use server";

import { validateRequest } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { notFound, redirect } from "next/navigation";

async function layout({ children }: { children: React.ReactNode }) {
  try {
    const {
      data: { user },
    } = await validateRequest();

    if (user) redirect("/dashboard");

    return <>{children}</>;
  } catch (error) {
    console.log(error);
    if (isRedirectError(error)) throw error;
    notFound();
  }
}

export default layout;
