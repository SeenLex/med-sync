import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const HowItWorks: React.FC = () => {
  return (
    <div id="how-it-works" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Simple steps to better healthcare
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Getting started with MedSync is easy. Follow these simple steps to
            take control of your healthcare journey.
          </p>
        </div>

        <div className="mt-10">

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
            <div className="text-center">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                1
              </span>
              <div className="mt-4 bg-white rounded-lg shadow-md p-6">
                {" "}
                <h3 className="text-lg font-medium text-gray-900">
                  Create an Account
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Sign up for MedSync in minutes with your email address.
                </p>
              </div>
            </div>

            <div className="text-center">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                2
              </span>
              <div className="mt-4 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Find a Doctor
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Search for healthcare providers by specialty, location, or
                  availability.
                </p>
              </div>
            </div>

            <div className="text-center">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                3
              </span>
              <div className="mt-4 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Book Appointment
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Schedule an in-person visit or virtual consultation at your
                  convenience.
                </p>
              </div>
            </div>

            <div className="text-center">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                4
              </span>
              <div className="mt-4 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Receive Care
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Connect with your doctor and get the care you need, when you
                  need it.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/register">
              <Button variant="primary" className="inline-flex items-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
