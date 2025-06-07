"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type SidebarProps = {
  navItems: NavItem[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  activeTab,
  setActiveTab,
}) => {
  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-emerald-100 text-emerald-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;