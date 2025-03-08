
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserSquare,
  Users,
  X,
  ClipboardList,
  LineChart
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Users, label: "Students", path: "/students" },
  { icon: UserSquare, label: "Teachers", path: "/teachers" },
  { icon: GraduationCap, label: "Classes", path: "/classes" },
  { icon: Calendar, label: "Schedule", path: "/schedule" },
  { icon: ClipboardList, label: "Attendance", path: "/attendance" },
  { icon: LineChart, label: "Grades", path: "/grades" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Desktop Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 z-50 flex-col hidden md:flex bg-card shadow-lg transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold">SchoolSync</h1>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="rounded-full">
            {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="px-2 space-y-1">
            {navItems.map((item) => (
              <Tooltip key={item.path} delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start mb-1 transition-all",
                      sidebarOpen ? "px-3" : "px-3 justify-center"
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className={cn("h-5 w-5", sidebarOpen ? "mr-2" : "")} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {!sidebarOpen && <TooltipContent side="right">{item.label}</TooltipContent>}
              </Tooltip>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className={cn("flex items-center", sidebarOpen ? "justify-between" : "justify-center")}>
            {sidebarOpen && (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium line-clamp-1">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Logout</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-card border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 ml-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">SchoolSync</h1>
          </div>
        </div>
        <Avatar className="h-8 w-8" onClick={() => navigate('/settings')}>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-card flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">SchoolSync</h1>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 py-4 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="w-full justify-start mb-1"
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.label}</span>
                  </Button>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        "md:ml-20",
        sidebarOpen && "md:ml-64",
        "mt-14 md:mt-0"
      )}>
        <div className="container mx-auto p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
