import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
}

export function AdminLayout({ children, showNavbar = true }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <div className={`flex flex-1 ${showNavbar ? "pt-16" : ""}`}>
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
        <main className="flex-1 lg:ml-64 overflow-auto">
          <div className="h-full flex flex-col">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
