"use client";

import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Star, MapPin, Calendar as CalendarIcon, Video } from "lucide-react";
import { Link as ScrollLink, Element } from "react-scroll";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  availableFor: string[];
  education: string;
  experience: string;
  location: string;
  nextAvailable: string;
  bio: string;
  languages: string[];
  contact: { phone: string; email: string };
  services: string[];
  schedule: {
    location: string;
    specialty: string;
    slots: { day: string; hours: string }[];
  }[];
}

interface DoctorProfileProps {
  doctor: Doctor;
}

export default function DoctorProfile({ doctor }: DoctorProfileProps) {
  const sections = [
    { id: "info", label: "Info" },
    { id: "schedule", label: "Schedule" },
    { id: "services", label: "Services" },
    { id: "locations", label: "Locations" },
    { id: "cv", label: "CV" },
    { id: "book", label: "Book" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 200;
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= pos) {
          document
            .querySelectorAll(".sidebar-link")
            .forEach((lnk) =>
              lnk.classList.remove("bg-emerald-600", "text-white")
            );
          document
            .querySelector(`.sidebar-link[data-target="${id}"]`)
            ?.classList.add("bg-emerald-600", "text-white");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-5 w-5 ${
        i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"
      }`}
      fill={i < Math.floor(doctor.rating) ? "currentColor" : "none"}
    />
  ));
  return (
    <Layout>
      {/* small / sm horizontal nav */}
      <div className="md:hidden overflow-x-auto bg-white border-b">
        <div className="flex space-x-3 px-4 py-2">
          {sections.map(({ id, label }) => (
            <ScrollLink
              key={id}
              to={id}
              smooth
              offset={-100}
              duration={300}
              className="sidebar-link flex-shrink-0 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
              data-target={id}
            >
              {label}
            </ScrollLink>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* md+ vertical sidebar */}
        <nav className="hidden md:block md:w-1/4 sticky top-24">
          <Card className="p-4 space-y-4">
            {sections.map(({ id, label }) => (
              <ScrollLink
                key={id}
                to={id}
                smooth
                offset={-120}
                duration={300}
                className="sidebar-link block px-4 py-2 rounded-md text-gray-900 hover:bg-emerald-600 hover:text-white text-sm font-medium"
                data-target={id}
              >
                {label}
              </ScrollLink>
            ))}
          </Card>
        </nav>

        {/* main */}
        <div className="flex-1 space-y-12">
          {/* header */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-700">{doctor.name}</h1>
            <p className="text-lg text-gray-600 ">{doctor.specialty}</p>
            <div className="inline-flex items-center mt-2 space-x-1">
              {stars}
              <span className="text-sm text-gray-500">
                {doctor.rating} ({doctor.reviewCount})
              </span>
            </div>
          </div>

          {/* Info */}
          <Element name="info" id="info" className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">About</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-32 w-32 rounded-full object-cover"
              />
              <div className="space-y-2">
                <p className="text-gray-700">{doctor.bio}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {doctor.availableFor.includes("IN_PERSON") && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                      <MapPin className="h-3 w-3 mr-1" /> In-Person
                    </span>
                  )}
                  {doctor.availableFor.includes("VIRTUAL") && (
                    <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                      <Video className="h-3 w-3 mr-1" /> Virtual
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Element>

          {/* Schedule */}
          <Element name="schedule" id="schedule" className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Schedule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {doctor.schedule.map((loc, i) => (
                <Card key={i} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {loc.location}
                  </h3>
                  <p className="text-gray-700 mb-2 text-gray-700">
                    {loc.specialty}
                  </p>
                  {loc.slots.map((s, j) => (
                    <div
                      key={j}
                      className="flex items-center text-gray-600 text-sm mb-1"
                    >
                      <CalendarIcon className="h-5 w-5 mr-2" />
                      <span>
                        {s.day}: {s.hours}
                      </span>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </Element>

          {/* Services */}
          <Element name="services" id="services" className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Services</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {doctor.services.map((svc, i) => (
                <li key={i}>{svc}</li>
              ))}
            </ul>
          </Element>

          {/* Locations */}
          <Element name="locations" id="locations" className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Locations</h2>
            <p className="text-gray-600">
              All locations and hours are listed in the schedule above.
            </p>
          </Element>

          {/* CV */}
          <Element name="cv" id="cv" className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">CV</h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Education:</strong> {doctor.education}
              </p>
              <p>
                <strong>Experience:</strong> {doctor.experience}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs"
                >
                  {lang}
                </span>
              ))}
            </div>
          </Element>

          {/* Book */}
          <Element name="book" id="book" className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Book Appointment
            </h2>
            <div className="space-y-4">
              <Button variant="primary">Book Online</Button>
              <p className="text-gray-600">
                Or call{" "}
                <a
                  href={`tel:${doctor.contact.phone}`}
                  className="font-semibold"
                >
                  {doctor.contact.phone}
                </a>
              </p>
            </div>
          </Element>
        </div>
      </div>
    </Layout>
  );
}
