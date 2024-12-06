"use server";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "../SessionProvider";
import { isRedirectError } from "next/dist/client/components/redirect";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarHeader from "@/components/SidebarHeader/sidebar-header";
import AppSidebar from "@/components/app-sidebar";

async function layout({ children }: { children: React.ReactNode }) {
  try {
    const {
      data: { user, session },
    } = await validateRequest();

    if (!user) redirect("/login");

    return (
      <SessionProvider value={{ user, session }}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SideBarHeader />
            <div className="px-4 py-6">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    );
  } catch (error) {
    if (isRedirectError(error)) throw error;
    redirect("/");
  }
}

export default layout;
