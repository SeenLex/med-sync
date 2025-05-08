import React from "react";
import Image from "next/image";
import Container from "../ui/Container";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <div className="bg-white">
      <Container>
        <div className="py-16 md:py-24 lg:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Download the MedSync mobile app
              </h1>
              <p className="mt-5 text-xl text-gray-500">
                Your doctor is always by your side.
              </p>
              <div className="mt-8 flex space-x-4">
                <Button href="/download/ios" variant="primary">
                  App Store
                </Button>
                <Button href="/download/android" variant="secondary">
                  Google Play
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/phone-mockup.png"
                alt="MedSync Mobile App"
                width={300}
                height={600}
                className="h-auto w-auto"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}