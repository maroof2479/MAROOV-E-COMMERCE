
import React from "react";
import { useNavigate } from "react-router-dom";
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
import { ThemeProvider } from "./ThemeContext";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users
  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin-login');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <ThemeProvider>
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
              <div className="flex items-center justify-between p-4">
                <SidebarMenuButton tooltip="Log Out" onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Log Out</span>
                </SidebarMenuButton>
                <ThemeToggle />
              </div>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="overflow-y-auto">
            <div className="relative">
              <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-background border-b px-4">
                <SidebarTrigger />
                <div className="md:hidden">
                  <ThemeToggle />
                </div>
              </header>
              <main>{children}</main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};
