'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import Button from "@/components/ui/Button";
import { logout } from "@/actions/auth";

const Navbar: React.FC = () => {
  const [lastScrollY, setLastScrollY] = useState(0);

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

          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 ml-6">
            <div
              className="flex items-center  lg:ml-4 pl-2 lg:pl-4
                         border-l border-gray-300 gap-1 lg:gap-4"
            >

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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
