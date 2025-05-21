'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  Calendar,
  FileText,
  Home,
  LogOut
} from "lucide-react";
import Button from "@/components/ui/Button";
import { logout } from "@/actions/auth";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsNavbarVisible(currentY <= lastScrollY);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white shadow-md sticky top-0 z-50
         transition-transform duration-300 ${
           isNavbarVisible ? "translate-y-0" : "-translate-y-full"
         }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/landing-page">
              <div className="flex items-center cursor-pointer">
                <span className="text-emerald-600 font-bold text-2xl">
                  MedSync
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-6">
            <Link href="/appointments">
              <div
                className="flex items-center  lg:px-3 py-2 rounded-md
                           text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
              >
                <Calendar
                  className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2"
                />
                <span className="text-s lg:text-base">
                  Appointments
                </span>
              </div>
            </Link>

            <Link href="/medical-records">
              <div
                className="flex items-center px-2 lg:px-3 py-2 rounded-md
                           text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
              >
                <FileText
                  className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2"
                />
                <span className="text-s lg:text-base">
                  Medical Records
                </span>
              </div>
            </Link>

            <div
              className="flex items-center  lg:ml-4 pl-2 lg:pl-4
                         border-l border-gray-300 gap-1 lg:gap-4"
            >
              <Link href="/profile">
                <div
                  className="flex items-center px-2 lg:px-3 py-2 rounded-md
                             text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
                >
                  <User
                    className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2"
                  />
                  <span className="text-s lg:text-base">
                    Profile
                  </span>
                </div>
              </Link>

              <form action={logout}>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex items-center px-2 lg:px-3 py-2"
                >
                  <LogOut
                    className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2"
                  />
                  <span className="text-s lg:text-base">
                    Logout
                  </span>
                </Button>
              </form>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center
                         p-2 rounded-md text-gray-700
                         hover:text-emerald-600 hover:bg-gray-100
                         focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <div className="flex items-center px-3 py-2 rounded-md
                              text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <Home className="h-4 w-4 mr-2" />
                <span>Home</span>
              </div>
            </Link>
            <Link href="/appointments">
              <div className="flex items-center px-3 py-2 rounded-md
                              text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Appointments</span>
              </div>
            </Link>
            <Link href="/medical-records">
              <div className="flex items-center px-3 py-2 rounded-md
                              text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <FileText className="h-4 w-4 mr-2" />
                <span>Medical Records</span>
              </div>
            </Link>
            <Link href="/profile">
              <div className="flex items-center px-3 py-2 rounded-md
                              text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </div>
            </Link>
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
