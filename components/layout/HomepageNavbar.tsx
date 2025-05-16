'use client';

import { useEffect, useState } from "react";
import { Menu, X, Star, MessageSquare, DollarSign, LogIn, UserPlus, Wrench } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Link as ScrollLink, animateScroll } from "react-scroll";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    animateScroll.scrollToTop({ duration: 500 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsNavbarVisible(false);
      } else {
        setIsNavbarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={handleLogoClick}>
            <span className="text-emerald-600 font-bold text-2xl">MedSync</span>
          </div>

          <div className="hidden md:flex items-center space-x-4 gap-4">
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <Star className="h-4 w-4 mr-2" /> Features
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <Wrench className="h-4 w-4 mr-2" /> How It Works
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Testimonials
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={500}
              className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
            >
              <DollarSign className="h-4 w-4 mr-2" /> Pricing
            </ScrollLink>
            <div className="flex items-center ml-4 pl-4 border-l border-gray-300 gap-4">
              <Link
                href="/login"
                className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <LogIn className="h-4 w-4 mr-2" /> Login
              </Link>
              <Link href="/register" passHref>
                <Button variant="primary" size="sm" onClick={handleLinkClick} className="flex items-center">
                  <UserPlus className="h-4 w-4 mr-2" /> Sign Up
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
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={handleLinkClick}
            >
              <Star className="h-4 w-4 mr-2" /> Features
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={handleLinkClick}
            >
              <Wrench className="h-4 w-4 mr-2" /> How It Works
            </ScrollLink>
            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={handleLinkClick}
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Testimonials
            </ScrollLink>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={500}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={handleLinkClick}
            >
              <DollarSign className="h-4 w-4 mr-2" /> Pricing
            </ScrollLink>
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={handleLinkClick}
            >
              <LogIn className="h-4 w-4 mr-2" /> Login
            </Link>
            <Link href="/register">
              <div
                className="block px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer flex items-center"
                onClick={handleLinkClick}
              >
                <UserPlus className="h-4 w-4 mr-2" /> Sign Up
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
