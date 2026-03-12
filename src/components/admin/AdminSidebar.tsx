import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  MessageSquare,
  UserCheck,
  MapPin,
  LogOut,
  Home,
  Info,
  Hand,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { useState,useEffect } from "react";

// simple button component that triggers logout helper and closes sidebar
function LogoutButton({ onClose }: { onClose: () => void }) {
  const { logout, isLoading } = useAuth();
  return (
    <Button
      variant="outline"
      className="w-full gap-2"
      onClick={() => {
        onClose();
        logout();
      }}
      disabled={isLoading}
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  );
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const [location] = useLocation();

  const [messages, setMessages] = useState<any[]>([]);
  const {data:messagesData} = useQuery<any[]>({
    queryKey: ["messages",'all'],
  });

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
   }, [messagesData]);
   
  const adminItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    // {
    //   href: "/admin/analytics",
    //   label: "Analytics",
    //   icon: <BarChart3 className="w-5 h-5" />,
    // },
    // {
    //   href: "/admin/programs",
    //   label: "Programs",
    //   icon: <BookOpen className="w-5 h-5" />,
    // },
    {
      href: "/admin/visits",
      label: "Visits",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      href: "/admin/blogs",
      label: "Blogs",
      icon: <Newspaper className="w-5 h-5" />,
    },
    {
      href: "/admin/staff",
      label: "Staff",
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      href: "/admin/messages",
      label: "Messages",
      icon: <MessageSquare className="w-5 h-5" />,
    },
     
    // {
    //   href: "/admin/settings",
    //   label: "Settings",
    //   icon: <Settings className="w-5 h-5" />,
    // },
  ];

  const sitePages = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="w-5 h-5" />,
    },
    {
      href: "/about",
      label: "About",
      icon: <Info className="w-5 h-5" />,
    },
    {
      href: "/programs",
      label: "Programs",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      href: "/communities",
      label: "Communities",
      icon: <Building2 className="w-5 h-5" />,
    },
    // {
    //   href: "/talent",
    //   label: "Talent Discovery",
    //   icon: <Sparkles className="w-5 h-5" />,
    // },
    {
      href: "/get-involved",
      label: "Get Involved",
      icon: <Hand className="w-5 h-5" />,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location === "/admin";
    }
    if (href === "/") {
      return location === "/";
    }
    return location.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          onClick={onClose}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 w-96 h-screen bg-card border-r border-border transition-transform duration-300 z-40 lg:relative lg:top-0 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                ICH
              </div>
              <div>
                <p className="font-bold text-sm">Admin Panel</p>
                <p className="text-xs text-muted-foreground">v1.0</p>
              </div>
            </div>
          </div>

          {/* Admin Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Admin Section */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-3">
                Admin
              </p>

             
              <div className="space-y-2">
                {adminItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted-foreground/10"
                      }`}
                    >
                      
                      {item.icon}<span className="font-medium">{item.label}</span> {item.label === "Messages" && messages.filter((m) => !m.isRead).length > 0  && (
                        <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-secondary rounded-full">
                         
                        </span>
                      )}
                    </a>
                  </Link>
                ))}
              </div>
            </div>

            {/* Site Pages Section */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase px-3 mb-3">
                Site Pages
              </p>
              <div className="space-y-2">
                {sitePages.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted-foreground/10"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            {/* logout button should clear auth state via context */}
          <LogoutButton onClose={onClose} />
          </div>
        </div>
      </aside>
    </>
  );
}
