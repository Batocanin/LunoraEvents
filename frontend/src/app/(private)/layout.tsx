"use server";

import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import SessionProvider from "../SessionProvider";
import { isRedirectError } from "next/dist/client/components/redirect";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarHeader from "@/components/SidebarHeader/sidebar-header";
import AppSidebar from "@/components/app-sidebar";
import { cookies } from "next/headers";
import CookieAuthProvider from "../CookiesProvider";

async function layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  try {
    const {
      data: { user, session },
    } = await validateRequest();

    if (!user) redirect("/login");

    return (
      <SessionProvider value={{ user, session }}>
        <CookieAuthProvider value={sessionCookie}>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SideBarHeader />
              <div className="h-full">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </CookieAuthProvider>
      </SessionProvider>
    );
  } catch (error) {
    if (isRedirectError(error)) throw error;
    redirect("/");
  }
}

export default layout;
