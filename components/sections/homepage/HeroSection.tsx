"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Link as ScrollLink } from "react-scroll";

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-gray-100">
        <div className="relative z-10 pb-8 bg-gray-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 bg-gray-100">
          <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 bg-gray-100">
            <div className="sm:text-center lg:text-left ">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Your Health,</span>
                <span className="block text-emerald-600">
                  Seamlessly Connected
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Access healthcare services anytime, anywhere. Schedule
                appointments, consult with doctors, and manage your medical
                records all in one place.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/register">
                    <Button variant="primary" size="lg" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 ">
                  <ScrollLink
                    to="how-it-works"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer flex items-center"
                  >
                    <Button variant="outline" size="lg" className="w-full">
                      Learn More
                    </Button>
                  </ScrollLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
