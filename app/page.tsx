import HomepageLayout from "@/components/layout/HomepageLayout";
import CallToAction from "@/components/sections/homepage/CallToAction";
import Features from "@/components/sections/homepage/Features";
import HeroSection from "@/components/sections/homepage/HeroSection";
import HowItWorks from "@/components/sections/homepage/HowItWorks";
import Pricing from "@/components/sections/homepage/Pricing";
import Testimonials from "@/components/sections/homepage/Testimonials";
import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HomepageLayout>
        
        <HeroSection />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </HomepageLayout>
    </div>
  );
};

export default Homepage;
