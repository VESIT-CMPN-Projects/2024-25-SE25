import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Car,
  FileText,
  Users,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            {/* Removing image import */}
            {!sidebarCollapsed && (
              <div className="ml-2">
                <h1 className="text-sm font-semibold">RTMS Admin</h1>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </Button>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            <Link
              to="/admin"
              className={`flex items-center px-4 py-3 rounded-md ${
                isActive("/admin")
                  ? "bg-rtms-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={20} />
              {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
            </Link>

            <Link
              to="/admin/vehicles"
              className={`flex items-center px-4 py-3 rounded-md ${
                isActive("/admin/vehicles")
                  ? "bg-rtms-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Car size={20} />
              {!sidebarCollapsed && <span className="ml-3">Vehicles</span>}
            </Link>

            <Link
              to="/admin/fines"
              className={`flex items-center px-4 py-3 rounded-md ${
                isActive("/admin/fines")
                  ? "bg-rtms-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <FileText size={20} />
              {!sidebarCollapsed && <span className="ml-3">Fines</span>}
            </Link>

            <Link
              to="/admin/users"
              className={`flex items-center px-4 py-3 rounded-md ${
                isActive("/admin/users")
                  ? "bg-rtms-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Users size={20} />
              {!sidebarCollapsed && <span className="ml-3">Users</span>}
            </Link>

            <Link
              to="/admin/reports"
              className={`flex items-center px-4 py-3 rounded-md ${
                isActive("/admin/reports")
                  ? "bg-rtms-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BarChart size={20} />
              {!sidebarCollapsed && <span className="ml-3">Reports</span>}
            </Link>

            <Link
              to="/admin/settings"
              className={`flex items-center px-4 py-3 rounded-md ${
                isActive("/admin/settings")
                  ? "bg-rtms-blue text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Settings size={20} />
              {!sidebarCollapsed && <span className="ml-3">Settings</span>}
            </Link>
          </nav>
        </div>

        <div className="p-4">
          <Button
            variant="ghost"
            className="flex items-center w-full justify-start px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                View Public Site
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
