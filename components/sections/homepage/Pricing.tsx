import React from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";

const Pricing: React.FC = () => {
  return (
    <div id="pricing" className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
            Pricing
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Affordable plans for everyone
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Choose a plan that fits your needs and start managing your health
            today.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3 mb-20">
          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-600">
            <h3 className="text-xl font-semibold mb-4 text-center">Basic</h3>
            <p className="text-4xl font-bold text-center mb-4">
              $0<span className="text-lg font-normal">/month</span>
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                Access to basic features
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                Book virtual appointments
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                Access medical records
              </div>
            </div>
            <div className="text-center">
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-600">
            <h3 className="text-xl font-semibold mb-4 text-center">Standard</h3>
            <p className="text-4xl font-bold text-center mb-4">
              $9.99<span className="text-lg font-normal">/month</span>
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                All basic features
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                Priority appointment booking
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                Access to premium doctors
              </div>
            </div>
            <div className="text-center">
              <Button variant="primary" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-600">
            <h3 className="text-xl font-semibold mb-4 text-center">Premium</h3>
            <p className="text-4xl font-bold text-center mb-4">
              $19.99<span className="text-lg font-normal">/month</span>
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                All standard features
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                24/7 priority support
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-emerald-600 mr-2" />
                Personal health coach
              </div>
            </div>
            <div className="text-center">
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
