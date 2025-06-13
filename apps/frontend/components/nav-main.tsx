"use client";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  const pathname = usePathname();

  switch (pathname) {
    case "/dashboard":
      items.map((item) => {
        if (item.title === "Home") {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
        return item;
      });
      break;
    case "/dashboard/rooms":
      items.map((item) => {
        if (item.title === "My Rooms") {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
        return item;
      });
  }

  const router = useRouter();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`cursor-pointer ${item.isActive ? "shadow shadow-black" : ""}`}
                  onClick={() => {
                    router.push(item.url);
                  }}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
