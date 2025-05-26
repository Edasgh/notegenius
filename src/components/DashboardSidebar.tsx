"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  FileTextIcon,
  PenIcon,
  SearchIcon,
  TerminalSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathName = usePathname();
  return (
    <Sidebar className="mt-16">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className={`text-gray-700 dark:text-gray-50 ${pathName.includes("/search") && "bg-gray-200 dark:bg-gray-700"}`}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/search`}
                  >
                    <SearchIcon />
                    <span> Search </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className={`text-gray-700 dark:text-gray-50 ${pathName.includes("/documents") && "bg-gray-200 dark:bg-gray-700"}`}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/documents`}
                  >
                    <FileTextIcon />
                    {/* <span>Usage</span> */}
                    <span>My Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className={`text-gray-700 dark:text-gray-50 ${pathName.includes("/notes") && "bg-gray-200 dark:bg-gray-700"}`}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/notes`}
                  >
                    <PenIcon />
                    <span>My Notes</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className="text-gray-700 dark:text-gray-50"
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/tasks`}
                  >
                    <ListTodoIcon />
                    <span>My Tasks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    className={`text-gray-700 dark:text-gray-50 ${pathName.includes("/projects") && "bg-gray-200 dark:bg-gray-700"}`}
                    href={`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/projects`}
                  >
                    <TerminalSquareIcon />
                    <span>My Projects</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
