import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import AppSidebar from "../Dashboard/Sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Footer from "@/Shared/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font">
      <Navbar />
      <SidebarProvider>
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="flex-shrink-0">
            <AppSidebar />
          </div>

          {/* Main Content */}
          <SidebarInset className="flex-1 overflow-x-scroll">
            {/* Header with Trigger */}
            <div className="border-b p-4 flex items-center pt-16">
              <SidebarTrigger />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4">
              <div className="">
                <Outlet />
              </div>
            </div>
                <Footer></Footer>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
