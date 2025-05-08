"use client"

import React from "react";
import Container from "../ui/Container";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import ServiceItem from "../ui/ServiceItem";

export default function TestResultsSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="bg-gray-50">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                Test Results
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Enter your TEST CODE and ACCESS CODE in the fields below to
                access your test results.
              </p>
              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <Input
                  id="test-code"
                  label="Test Code"
                  placeholder="Enter test code"
                  required
                />
                <Input
                  id="access-code"
                  label="Access Code"
                  placeholder="Enter access code"
                  required
                />
                <Button type="submit" className="w-full justify-center">
                  View Results
                </Button>
              </form>
            </div>
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Services
              </h3>
              <ul className="space-y-4">
                <ServiceItem>Online appointment scheduling</ServiceItem>
                <ServiceItem>Secure access to medical records</ServiceItem>
                <ServiceItem>Telemedicine video consultations</ServiceItem>
                <ServiceItem>Prescription renewals</ServiceItem>
                <ServiceItem>Lab results and notifications</ServiceItem>
              </ul>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
