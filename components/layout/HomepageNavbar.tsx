"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Star,
  MessageSquare,
  DollarSign,
  LogIn,
  UserPlus,
  Wrench,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Link as ScrollLink, animateScroll } from "react-scroll";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLinkClick = () => setIsMenuOpen(false);
  const handleLogoClick = () => animateScroll.scrollToTop({ duration: 500 });

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
      className="bg-white shadow-md sticky z-200 top-0"
      
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleLogoClick}
          >
            <span className="text-emerald-600 font-bold text-2xl">MedSync</span>
          </div>

          <div className="hidden md:flex items-center xl:space-x-4 ml-6">
            <ScrollLink
              to="features"
              smooth
              duration={500}
              offset={-30}
              className="flex items-center lg:px-3 py-2 rounded-md
                         text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <Star className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="text-xs lg:text-base">Features</span>
            </ScrollLink>

            <ScrollLink
              to="how-it-works"
              smooth
              duration={500}
              offset={-30}
              className="flex items-center px-2 lg:px-3 py-2 rounded-md
                         text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <Wrench className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
              <span className="text-xs lg:text-base">How It Works</span>
            </ScrollLink>

            <div
              className="flex items-center ml-2 lg:ml-4 pl-2 lg:pl-4
                         border-l border-gray-300 gap-1 lg:gap-4"
            >
              <Link
                href="/login"
                className="flex items-center px-2 lg:px-3 py-2 rounded-md
                           text-gray-700 hover:text-emerald-600 hover:bg-gray-100"
                onClick={handleLinkClick}
              >
                <LogIn className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                <span className="text-xs lg:text-base">Login</span>
              </Link>

              <Link href="/register" passHref>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleLinkClick}
                  className="flex items-center px-2 lg:px-3 py-2"
                >
                  <UserPlus className="h-5 w-5 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                  <span className="text-xs lg:text-base">Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center
                         p-2 rounded-md text-gray-700
                         hover:text-emerald-600 hover:bg-gray-100
                         focus:outline-none"
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
              smooth
              duration={500}
              offset={-30}
              className="flex items-center px-3 py-2 rounded-md
                         text-gray-700 hover:text-emerald-600
                         hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <Star className="h-4 w-4 mr-2 flex-shrink-0" />
              Features
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth
              duration={500}
              offset={-30}
              className="flex items-center px-3 py-2 rounded-md
                         text-gray-700 hover:text-emerald-600
                         hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <Wrench className="h-4 w-4 mr-2 flex-shrink-0" />
              How It Works
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth
              duration={500}
              offset={-30}
              className="flex items-center px-3 py-2 rounded-md
                         text-gray-700 hover:text-emerald-600
                         hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
              Testimonials
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth
              duration={500}
              offset={-30}
              className="flex items-center px-3 py-2 rounded-md
                         text-gray-700 hover:text-emerald-600
                         hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
              Pricing
            </ScrollLink>
            <Link
              href="/login"
              className="flex items-center px-3 py-2 rounded-md
                         text-gray-700 hover:text-emerald-600
                         hover:bg-gray-100"
              onClick={handleLinkClick}
            >
              <LogIn className="h-4 w-4 mr-2 flex-shrink-0" />
              Login
            </Link>
            <Link href="/register">
              <div
                className="flex items-center px-3 py-2 rounded-md
                           bg-emerald-600 text-white hover:bg-emerald-700"
                onClick={handleLinkClick}
              >
                <UserPlus className="h-4 w-4 mr-2 flex-shrink-0" />
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
