"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MessageCircleMore,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import React from "react";
import { NavUser } from "./nav-user";

const items = [
  {
    title: "Ce tratamente exista pentru dinti",
    url: "#",
  },
  {
    title: "Albirea dentala profesionala",
    url: "#",
  },
  {
    title: "Cum se face o obturatie pas cu pas",
    url: "#",
  },
  {
    title: "Alimentatie si dinti",
    url: "#",
  },
  {
    title: "Tratamente canal",
    url: "#",
  },
];

const dropdowns = [
  {
    title: "Conversations",
    icon: MessageCircleMore,
    items,
  },
];

export function AppSidebar() {
  const [conversationsOpen, setConversationsOpen] = React.useState(true);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Collapsed-only icon trigger */}
              <SidebarMenuItem className="hidden group-data-[collapsible=icon]:block">
                <SidebarMenuButton
                  tooltip="Conversations"
                  onClick={() => setConversationsOpen((v) => !v)}
                >
                  <MessageCircleMore />
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Collapsible
                  open={conversationsOpen}
                  onOpenChange={setConversationsOpen}
                  className="group/collapsible"
                >
                  <SidebarGroup>
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger className="flex items-center gap-2">
                        <MessageCircleMore className="shrink-0 group-data-[collapsible=icon]:hidden" />
                        <span>Conversations</span>
                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarMenu>
                        {items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                              <a href={item.url}>
                                <span className="group-data-[collapsible=icon]:hidden">
                                  {item.title}
                                </span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "Maria Pastin",
            email: "maria@example.com",
            avatar: "https://github.com/Ianthe23.png",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
