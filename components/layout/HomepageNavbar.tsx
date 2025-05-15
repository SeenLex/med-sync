"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";  
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <ScrollLink
              to="top"
              smooth={true}
              duration={500}
              className="cursor-pointer flex items-center"
              onClick={handleLinkClick}
            >
              <span className="text-emerald-600 font-bold text-2xl">MedSync</span>
            </ScrollLink>
          </div>

          <div className="hidden md:flex items-center space-x-4 gap-4">
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              How It Works
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              Testimonials
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              Pricing
            </ScrollLink>
            <div className="flex items-center ml-4 pl-4 border-l border-gray-300 gap-4">
              <ScrollLink
                to="login"
                smooth={true}
                duration={500}
                className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
                onClick={handleLinkClick}
              >
                Login
              </ScrollLink>
              <Link href="/register" passHref>
                <Button variant="primary" size="sm" onClick={handleLinkClick}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              How It Works
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              Testimonials
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              Pricing
            </ScrollLink>
            <ScrollLink
              to="login"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer"
              onClick={handleLinkClick}
            >
              Login
            </ScrollLink>
            <Link href="/register" passHref>
              <div
                className="block px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                onClick={handleLinkClick}
              >
                Sign Up
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
