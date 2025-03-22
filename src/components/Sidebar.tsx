import React from "react";
import {
  BookOpen,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
  BookMarked,
  Heart,
  History,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/clerk-react";
import logo from "/logo.png";

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
    <span className="hidden sm:block font-medium">{label}</span>
  </button>
);

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isAdmin: boolean | null | undefined;
  username: string | undefined;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onViewChange,
  isAdmin,
  username,
}) => {
  const { isSignedIn } = useUser();

  return (
    <div className="w-32 sm:w-64 flex flex-col h-screen bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <img width={"48px"} src={logo} />{" "}
          <h1 className="text-xl font-bold hidden sm:block">LibraTrack</h1>
        </div>
      </div>

      <nav className="space-y-2">
        <SidebarItem
          icon={<BookOpen className="w-5 h-5" />}
          label="Dashboard"
          active={activeView === "dashboard"}
          onClick={() => onViewChange("dashboard")}
        />
        <SidebarItem
          icon={<BookOpen className="w-5 h-5" />}
          label="Books"
          active={activeView === "books"}
          onClick={() => onViewChange("books")}
        />
        {isSignedIn && (
          <>
            <SidebarItem
              icon={<BookMarked className="w-5 h-5" />}
              label="My Borrowed Books"
              active={activeView === "borrowed"}
              onClick={() => onViewChange("borrowed")}
            />
            <SidebarItem
              icon={<Heart className="w-5 h-5" />}
              label="Favorites"
              active={activeView === "favorites"}
              onClick={() => onViewChange("favorites")}
            />
            <SidebarItem
              icon={<History className="w-5 h-5" />}
              label="Transaction History"
              active={activeView === "transactions"}
              onClick={() => onViewChange("transactions")}
            />
          </>
        )}
        {isAdmin && (
          <>
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase mb-2">
                Admin Controls
              </p>
              <SidebarItem
                icon={<Users className="w-5 h-5" />}
                label="Users"
                active={activeView === "users"}
                onClick={() => onViewChange("users")}
              />
              <SidebarItem
                icon={<ShoppingCart className="w-5 h-5" />}
                label="All Transactions"
                active={activeView === "all-transactions"}
                onClick={() => onViewChange("all-transactions")}
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
            </div>
          </>
        )}
      </nav>
      <div className="mt-auto flex items-center gap-2 px-4">
        {isSignedIn && <UserButton afterSignOutUrl="/" />}
        <p className="hidden sm:block">{username}</p>
      </div>
    </div>
  );
};
