import Navbar from "@/components/layout/HomepageNavbar";
import CallToAction from "@/components/sections/homepage/CallToAction";
import Features from "@/components/sections/homepage/Features";
import HeroSection from "@/components/sections/homepage/HeroSection";
import HowItWorks from "@/components/sections/homepage/HowItWorks";
import Pricing from "@/components/sections/homepage/Pricing";
import Testimonials from "@/components/sections/homepage/Testimonials";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CallToAction />
    </div>
  );
};

export default LandingPage;
