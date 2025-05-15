import React from "react";
import { Calendar, Video, FileText, Shield } from "lucide-react";

const Features: React.FC = () => {
  return (
    <div id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A better way to manage your healthcare
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            MedSync provides a comprehensive suite of features designed to
            make healthcare more accessible and convenient.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Easy Appointment Scheduling
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Book appointments with your preferred healthcare providers
                  in just a few clicks. Choose between in-person visits or
                  virtual consultations.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                  <Video className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Telemedicine Services
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Connect with healthcare professionals from the comfort of
                  your home through secure video calls and messaging.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Medical Records Management
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Access your complete medical history and share it securely
                  with your healthcare providers when needed.
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Secure & Private
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Your health information is protected with industry-leading
                  security measures and complies with healthcare privacy
                  regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
