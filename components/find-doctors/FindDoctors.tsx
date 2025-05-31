"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Filter,
  ChevronDown,
  Video,
  MessageSquare,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Layout from "@/components/layout/Layout";
import type { FindDoctor as FindDoctorType } from "@/actions/user";

type Props = {
  doctors: FindDoctorType;
};

const FindDoctor: React.FC<Props> = ({ doctors }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const specialties = [
    "All Specialties",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Psychiatrist",
    "Ophthalmologist",
    "Pediatrician",
    "Orthopedist",
    "Gynecologist",
    "Urologist",
    "Endocrinologist",
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.fullName.toLowerCase();
    const spec = doctor.doctor?.specialization?.toLowerCase() || "";

    const matchesSearch =
      searchQuery === "" ||
      name.includes(searchQuery.toLowerCase()) ||
      spec.includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      specialty === "" ||
      specialty === "All Specialties" ||
      spec === specialty.toLowerCase();

    const matchesAvailability = availability === "" || true;

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Doctor</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by doctor name or specialty"
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center md:justify-start px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
                <ChevronDown
                  className={`h-5 w-5 ml-2 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div className="flex flex-wrap gap-2">
                <select
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="">Any Availability</option>
                  <option value="Virtual">Virtual</option>
                  <option value="In-Person">In-Person</option>
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 mt-4"></div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">
              {filteredDoctors.length}{" "}
              {filteredDoctors.length === 1 ? "doctor" : "doctors"} found
            </p>
          </div>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col items-center md:items-start md:flex-row md:flex-1">
                    <img
                      src={
                        doctor.profileImage ||
                        `https://randomuser.me/api/portraits/lego/${
                          doctor.id % 10
                        }.jpg`
                      }
                      alt={doctor.fullName}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {doctor.fullName}
                      </h2>
                      <p className="text-gray-600">
                        {doctor.doctor?.specialization || "Unknown"}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          <MapPin className="h-3 w-3 mr-1" />
                          In-Person
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Video className="h-3 w-3 mr-1" />
                          Virtual
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0 flex flex-col space-y-2 md:justify-center">
                    <Button variant="primary" className="w-full md:w-auto">
                      Book Appointment
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full md:w-auto flex items-center justify-center"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <a
                      href={`/doctors/${doctor.id}`}
                      className="text-emerald-600 text-sm text-center hover:text-emerald-700 mt-2"
                    >
                      View Full Profile
                    </a>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-500 mb-4">
                No doctors found matching your criteria.
              </p>
              <p className="text-gray-500">
                Try adjusting your filters or search terms.
              </p>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FindDoctor;
