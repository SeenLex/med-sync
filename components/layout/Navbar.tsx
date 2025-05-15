'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, User, Calendar, FileText, Home, LogOut } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-emerald-600 font-bold text-2xl">MedSync</span>
              </div>
            </Link>
          </div>  
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              
            </Link>
            <Link href="/appointments">
              <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <Calendar className="h-5 w-5 mr-1" />
                <span>Appointments</span>
              </div>
            </Link>
            <Link href="/medical-records">
              <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <FileText className="h-5 w-5 mr-1" />
                <span>Medical Records</span>
              </div>
            </Link>
            <div className="flex items-center ml-4 pl-4 border-l border-gray-300">
              <Link href="/profile">
                <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  <User className="h-5 w-5 mr-1" />
                  <span>Profile</span>
                </div>
              </Link>
              <button className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100">
                <LogOut className="h-5 w-5 mr-1" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
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
              <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <Home className="h-5 w-5 mr-2" />
                <span>Home</span>
              </div>
            </Link>
            <Link href="/appointments">
              <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Appointments</span>
              </div>
            </Link>
            <Link href="/medical-records">
              <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <FileText className="h-5 w-5 mr-2" />
                <span>Medical Records</span>
              </div>
            </Link>
            <Link href="/profile">
              <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                <User className="h-5 w-5 mr-2" />
                <span>Profile</span>
              </div>
            </Link>
            <button className="flex w-full items-center px-3 py-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100">
              <LogOut className="h-5 w-5 mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
