'use client';

import React from "react";
import Link from "next/link";
import { Calendar, Video, FileText, Shield, ArrowRight, Check, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
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
              <Link href="#features">
                <div className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  Features
                </div>
              </Link>
              <Link href="#how-it-works">
                <div className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  How It Works
                </div>
              </Link>
              <Link href="#testimonials">
                <div className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  Testimonials
                </div>
              </Link>
              <Link href="#pricing">
                <div className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  Pricing
                </div>
              </Link>
              <div className="flex items-center ml-4 pl-4 border-l border-gray-300">
                <Link href="/login">
                  <div className="px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                    Login
                  </div>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
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
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#features">
                <div className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  Features
                </div>
              </Link>
              <Link href="#how-it-works">
                <div className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  How It Works
                </div>
              </Link>
              <Link href="#testimonials">
                <div className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  Testimonials
                </div>
              </Link>
              <Link href="#pricing">
                <div className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  Pricing
                </div>
              </Link>
              <Link href="/login">
                <div className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-gray-100">
                  Login
                </div>
              </Link>
              <Link href="/register">
                <div className="block px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
                  Sign Up
                </div>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Health,</span>
                  <span className="block text-emerald-600">Seamlessly Connected</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Access healthcare services anytime, anywhere. Schedule appointments, consult with doctors, and manage your medical records all in one place.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/register">
                      <Button variant="primary" size="lg" className="w-full">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link href="#how-it-works">
                      <Button variant="outline" size="lg" className="w-full">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Doctor with patient"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to manage your healthcare
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              MedSync provides a comprehensive suite of features designed to make healthcare more accessible and convenient.
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Easy Appointment Scheduling</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Book appointments with your preferred healthcare providers in just a few clicks. Choose between in-person visits or virtual consultations.
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Telemedicine Services</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Connect with healthcare professionals from the comfort of your home through secure video calls and messaging.
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Medical Records Management</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Access your complete medical history and share it securely with your healthcare providers when needed.
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
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Secure & Private</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Your health information is protected with industry-leading security measures and complies with healthcare privacy regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Simple steps to better healthcare
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Getting started with MedSync is easy. Follow these simple steps to take control of your healthcare journey.
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              {/* Steps connector line */}
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              
              {/* Steps */}
              <div className="relative flex justify-between">
                <div className="text-center">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                    1
                  </span>
                  <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-medium text-gray-900">Create an Account</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Sign up for MedSync in minutes with your email address.
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                    2
                  </span>
                  <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-medium text-gray-900">Find a Doctor</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Search for healthcare providers by specialty, location, or availability.
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                    3
                  </span>
                  <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-medium text-gray-900">Book Appointment</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Schedule an in-person visit or virtual consultation at your convenience.
                    </p>
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mx-auto">
                    4
                  </span>
                  <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-medium text-gray-900">Receive Care</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Connect with your doctor and get the care you need, when you need it.
                    </p>
                  </div>
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

      {/* Testimonials Section */}
      <div id="testimonials" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What our users are saying
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Sarah M."
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Sarah M.</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "MedSync has made managing my healthcare so much easier. I can book appointments, talk to my doctor, and access my records all in one place. It's been a game-changer!"
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/men/54.jpg"
                  alt="Robert J."
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Robert J.</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone with a chronic condition, I need to see my doctor regularly. The virtual consultations have saved me so much time and made it easier to stay on top of my health."
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Lisa T."
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Lisa T.</h3>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I love how easy it is to keep all my medical records in one place. I recently changed doctors, and being able to share my history seamlessly made the transition so smooth."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="pricing" className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:text-center">
                <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Pricing</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Affordable plans for everyone
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  Choose a plan that fits your needs and start managing your health today.
                </p>
              </div>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {/* Basic Plan */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-600">
                  <h3 className="text-xl font-semibold mb-4 text-center">Basic</h3>
                  <p className="text-4xl font-bold text-center mb-4">$0<span className="text-lg font-normal">/month</span></p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      Access to basic features
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      Book virtual appointments
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      Access medical records
                    </li>
                  </ul>
                  <div className="text-center">
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </div>
                </div>
                {/* Standard Plan */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-600">
                  <h3 className="text-xl font-semibold mb-4 text-center">Standard</h3>
                  <p className="text-4xl font-bold text-center mb-4">$9.99<span className="text-lg font-normal">/month</span></p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      All basic features
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      Priority appointment booking
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      Access to premium doctors
                    </li>
                  </ul>
                  <div className="text-center">
                    <Button variant="primary" className="w-full">
                      Sign Up
                    </Button>
                  </div>
                </div>
                {/* Premium Plan */}
                <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-600">
                  <h3 className="text-xl font-semibold mb-4 text-center">Premium</h3>
                  <p className="text-4xl font-bold text-center mb-4">$19.99<span className="text-lg font-normal">/month</span></p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      All standard features
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      24/7 priority support
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-emerald-600 mr-2" />
                      Personal health coach
                    </li>
                  </ul>
                  <div className="text-center">
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="py-12 bg-emerald-600 text-white text-center">
            <h2 className="text-3xl font-extrabold mb-4">Ready to take control of your health?</h2>
            <p className="mb-8 text-lg">Join thousands of users managing their health with MedSync today.</p>
            <Link href="/register">
              <Button variant="secondary" size="lg" className="mx-auto">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;