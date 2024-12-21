"use client";

import { ComponentProps } from "react";
import { GalleryVerticalEnd, Home, PartyPopper } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavDashboard } from "./nav-dashboard";
import { usePathname } from "next/navigation";

function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const data = {
    navMain: [
      {
        title: "Početna",
        url: "/dashboard",
        icon: Home,
        isActive: pathname === "/dashboard",
      },
    ],
    application: [
      {
        title: "Proslave",
        url: "/dashboard/party",
        icon: PartyPopper,
        isActive: pathname.includes("party"),
      },
    ],
  };

  return (
    <Sidebar variant="sidebar" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex items-center justify-center py-4">
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">LunoraEvents</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard title="Dashboard" items={data.navMain} />
        <NavDashboard title="Aplikacija" items={data.application} />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
