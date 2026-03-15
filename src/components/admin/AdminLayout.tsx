import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import { Menu, X, Bell } from "lucide-react";
import { notifications as mockNotifications } from "@/lib/mockData";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
interface AdminLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export function AdminLayout({ children, showNavbar = true }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  // const notifications = mockNotifications;

  const { data: notificationsData } = useQuery<any>({
    queryKey: ["notifications"],
  })

  useEffect(() => { 
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);

  const timeAgo = (iso: string) => {
    try {
      const then = new Date(iso).getTime();
      const diff = Date.now() - then;
      const sec = Math.floor(diff / 1000);
      if (sec < 60) return `${sec}s ago`;
      const min = Math.floor(sec / 60);
      if (min < 60) return `${min}m ago`;
      const hr = Math.floor(min / 60);
      if (hr < 24) return `${hr}h ago`;
      const days = Math.floor(hr / 24);
      if (days < 7) return `${days}d ago`;
      return new Date(iso).toLocaleDateString();
    } catch {
      return iso;
    }
  };

  const readNotifications = async (notId: string) => { 
    try {
      await apiRequest('POST', `/notifications/${notId}/seen`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* {showNavbar && <Navbar />} */}
      <div className={`flex flex-1 ]transition-all duration-300 ${sidebarOpen ? "blur-sm" : ""}`}>
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-8 right-8 z-40 bg-primary text-white p-3 rounded-full shadow-lg"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <main className="flex-1 max-h-screen overflow-auto">
          <div className="h-full flex flex-col">
            {/* Dashboard header */}
            <div className="flex items-center justify-between p-4 border-b bg-background">
              <div className="flex items-center gap-3">
                <nav className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Dashboard</span>
                  <span className="mx-2">/</span>
                  <span>Admin</span>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-md hover:bg-accent"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 bg-destructive text-white text-xs rounded-full px-1">{notifications.filter(n => !n.seen).length}</span>
                </button>
              </div>
            </div>

            {children}
          </div>
        </main>

        {/* Notifications sidebar */}
        <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${notificationsOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b flex items-center justify-between">
            <h4 className="font-semibold">Notifications</h4>
            <button onClick={() => setNotificationsOpen(false)} className="text-sm text-muted-foreground">Close</button>
          </div>
          <div className="p-4 overflow-y-auto h-screen">
            {notifications.map((n) => (
              <Link href={`${n.linkTo}`} onClick={()=>readNotifications(n._id)} key={n._id} className="mb-3 cursor-pointer border rounded-lg p-3 block hover:bg-muted-foreground/10 transition-colors">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-muted-foreground">{n.description}</div>
                <div className="flex items-end justify-end mt-2">
                  <div className="text-xs text-muted-foreground">{n.createdAt ? timeAgo(n.createdAt) : ''}</div>
                  {/* <div className="text-xs text-muted-foreground">{n.date ? new Date(n.date).toLocaleString() : ''}</div> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
