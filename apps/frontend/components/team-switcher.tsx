"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Building2 } from "lucide-react";

export function TeamSwitcher({ name }: { name: string }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="group flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-gradient-to-r from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100 border border-gray-200/50 hover:border-gray-300/70 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md">
          {/* Left Section: Icon + Name */}
          <div className="flex items-center gap-3">
            {/* Icon with Modern Styling */}
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-black shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <Building2 className="h-4 w-4 text-white" />
            </div>

            {/* Team Name */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                {name}
              </span>
            </div>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
