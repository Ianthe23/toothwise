"use client";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MessageCircleMore,
  Plus, // NEW
  Trash2, // NEW
  LayoutDashboard, // NEW
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
import { usePathname, useRouter } from "next/navigation"; // NEW

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
  const pathname = usePathname(); // NEW
  const router = useRouter(); // NEW
  const isConversationPage = pathname.startsWith("/conversation"); // NEW

  // NEW: dynamic conversations loaded from localStorage
  const [conversations, setConversations] = React.useState<
    { id: string; title: string }[]
  >([]);

  // Define the stored message shape and a safe type guard to avoid `any`
  type StoredMessage = {
    role: "user" | "assistant";
    content: string;
    animated?: boolean;
    edited?: boolean;
  };
  function isStoredMessageArray(arr: unknown): arr is StoredMessage[] {
    return Array.isArray(arr) && arr.every((m) => !!m && typeof m === "object" && "role" in m && "content" in m);
  }

  // NEW: build list from localStorage `tw-convo:{id}`
  React.useEffect(() => {
    try {
      const convos: { id: string; title: string }[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith("tw-convo:")) continue;
        const id = key.split(":")[1];
        let title = "Untitled conversation";
        try {
          const raw = localStorage.getItem(key);
          const parsed = raw ? (JSON.parse(raw) as { messages?: unknown }) : null;
          const msgs = isStoredMessageArray(parsed?.messages) ? parsed!.messages : [];
          const firstUser = msgs.find((m) => m.role === "user" && typeof m.content === "string");
          title = (firstUser?.content ?? title).trim();
        } catch {
          // ignore malformed entries
        }
        if (title.length > 40) title = title.slice(0, 37) + "…";
        convos.push({ id, title });
      }
      setConversations(convos);
    } catch {
      setConversations([]);
    }
  }, []);

  // NEW: delete by id and refresh list
  function deleteConversation(id: string) {
    try {
      localStorage.removeItem(`tw-convo:${id}`);
    } catch {
      // ignore storage errors
    }
    setConversations((prev) => prev.filter((c) => c.id !== id));
  }

  // Existing: go home on new conversation
  function handleNewConversation() {
    router.push("/");
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {isConversationPage && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="New Conversation"
                    onClick={handleNewConversation}
                    className="w-full justify-start rounded-md bg-zinc-800/70 text-zinc-100 hover:bg-zinc-700 border border-zinc-700 shadow-sm transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="group-data-[collapsible=icon]:hidden">
                      New Conversation
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

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
                        {conversations.map((c) => (
                          <SidebarMenuItem key={c.id}>
                            <SidebarMenuButton asChild>
                              <a
                                href={`/conversation/${c.id}`}
                                className="relative flex items-center w-full group/item" // CHANGED: named per-item group
                              >
                                <span className="truncate group-data-[collapsible=icon]:hidden">
                                  {c.title}
                                </span>

                                <button
                                  type="button"
                                  aria-label="Delete conversation"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    deleteConversation(c.id);
                                  }}
                                  className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity text-zinc-400 hover:text-red-400 group-data-[collapsible=icon]:hidden" // CHANGED: reveal only when this row is hovered
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
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
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Dashboard"
              onClick={() => router.push("/dashboard")}
              className="w-full justify-start rounded-md bg-zinc-800/70 text-zinc-100 hover:bg-zinc-700 border border-zinc-700 shadow-sm transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Dashboard
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
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
