import HomepageLayout from "@/components/layout/HomepageLayout";
import Features from "@/components/sections/homepage/Features";
import HeroSection from "@/components/sections/homepage/HeroSection";
import HowItWorks from "@/components/sections/homepage/HowItWorks";
import React from "react";

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HomepageLayout>
        <HeroSection />
        <Features />
        <HowItWorks />
      </HomepageLayout>
    </div>
  );
};

export default Homepage;
