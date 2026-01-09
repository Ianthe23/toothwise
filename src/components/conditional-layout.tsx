"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";

export function ConditionalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col px-[16px] py-[10px] gap-[20px] max-h-screen w-full">
        <div className="relative flex flex-row -mt-[10px] py-[10px] items-center gap-[14px]">
          <BackgroundRippleEffect rows={4} cellSize={46} />
          <SidebarTrigger className="relative z-20" />
          <p className="relative z-20 text-[16px] font-semibold tracking-tight leading-none text-zinc-200">
            ToothWise
          </p>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
