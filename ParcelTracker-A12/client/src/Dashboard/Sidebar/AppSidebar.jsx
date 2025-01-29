import React from "react";
import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import useRole from "@/Hooks/useRole";
import UserMenu from "./UserMenu/UserMenu";
import DeliveryMenMenu from "./DeliveryMenMenu/DeliveryMenMenu";
import AdminMenu from "./AdminMenu/AdminMenu";
import LoadingSpinner from "@/Shared/LoadingSpinner";

const AppSidebar = () => {
  const { role, isLoading } = useRole();
  
  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <Sidebar className="pt-16 pl-5 bg-[#FAFAFA]">
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="pl-0 text-sm">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="text-[14.5px] mt-5">
                {role === "user" && <UserMenu />}
                {role === "deliverymen" && <DeliveryMenMenu />}
                {role === "admin" && <AdminMenu />}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
export default AppSidebar;
