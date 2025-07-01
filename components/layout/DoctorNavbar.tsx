'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X, Calendar, Bell, Users, MessageSquare, User } from "lucide-react";
import Button from "@/components/ui/Button";
import { logout } from "@/actions/auth";

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

const Navbar: React.FC = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className="bg-white shadow-md sticky top-0 z-200"
    >
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-emerald-600 font-bold text-2xl">
                  MedSync
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-6">
            <div
              className="flex items-center  lg:ml-4 pl-2 lg:pl-4 border-l border-gray-300 gap-1 lg:gap-4"
            >
              <form action={logout}>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center px-2 lg:px-3 py-2"
                >
                  <LogOut className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                  <span className="text-s lg:text-base">Logout</span>
                </Button>
              </form>
            </div>
          </div>

          {/* Hamburger menu for mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <form action={logout} className="mt-2 px-3 hidden md:block">
              <Button
                variant="primary"
                size="sm"
                className="flex items-center w-full justify-center"
              >
                <LogOut className="h-4 w-4 mr-2 flex-shrink-0" />
                Logout
              </Button>
            </form>
            <form action={logout}>
              <Button className="flex w-full items-center px-3 py-2
                                 rounded-md text-gray-700
                                 hover:text-red-600 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </Button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
