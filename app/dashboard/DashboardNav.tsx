"use client";

import { Calendar, Bell, Users, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/dashboard/pending",
    label: "Pending Appointments",
    icon: Bell,
  },
  {
    href: "/dashboard/appointments",
    label: "All Appointments",
    icon: Calendar,
  },
  {
    href: "/dashboard/patients",
    label: "My Patients",
    icon: Users,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/messages",
    label: "My Messages",
    icon: MessageSquare,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive 
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}
              `}
            >
              <Icon
                className={`
                  flex-shrink-0 -ml-1 mr-3 h-6 w-6 transition-colors
                  ${isActive 
                    ? "text-gray-900"
                    : "text-gray-400 group-hover:text-gray-500"}
                `}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 