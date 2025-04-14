
import React from "react";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart4, 
  Settings,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="flex items-center px-4 py-2">
            <Link to="/admin" className="flex items-center font-bold text-lg">
              <span>Admin Panel</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <Link to="/admin">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Products">
                      <Link to="/shop">
                        <ShoppingBag size={18} />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Customers">
                      <Link to="#">
                        <Users size={18} />
                        <span>Customers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Analytics">
                      <Link to="#">
                        <BarChart4 size={18} />
                        <span>Analytics</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <Link to="#">
                        <Settings size={18} />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center p-4">
              <SidebarMenuButton asChild tooltip="Log Out">
                <Link to="/">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </Link>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="overflow-y-auto">
          <div className="relative">
            <header className="sticky top-0 z-10 flex h-14 items-center bg-background border-b px-4">
              <SidebarTrigger />
            </header>
            <main>{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
