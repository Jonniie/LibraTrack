import React from "react";
import {
  BookOpen,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
}) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex items-center space-x-3 mb-8">
        <BookOpen className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl font-bold">LibraTrack</h1>
      </div>

      <nav className="space-y-2">
        <SidebarItem
          icon={<BookOpen className="w-5 h-5" />}
          label="Books"
          active={activeView === "books"}
          onClick={() => onViewChange("books")}
        />
        <SidebarItem
          icon={<Users className="w-5 h-5" />}
          label="Users"
          active={activeView === "users"}
          onClick={() => onViewChange("users")}
        />
        <SidebarItem
          icon={<ShoppingCart className="w-5 h-5" />}
          label="Transactions"
          active={activeView === "transactions"}
          onClick={() => onViewChange("transactions")}
        />
        <SidebarItem
          icon={<BarChart2 className="w-5 h-5" />}
          label="Reports"
          active={activeView === "reports"}
          onClick={() => onViewChange("reports")}
        />
        <SidebarItem
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          active={activeView === "settings"}
          onClick={() => onViewChange("settings")}
        />
      </nav>
    </div>
  );
};
