'use client';

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Filter,
  ChevronDown,
  Calendar,
  Video,
  MessageSquare,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Layout from "@/components/layout/Layout";
import Pagination from "@/components/ui/Pagination";

const ITEMS_PER_PAGE = 5;

const FindDoctor: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviewCount: 124,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      availableFor: ["IN_PERSON", "VIRTUAL"],
      education: "Harvard Medical School",
      experience: "15 years",
      location: "Medical Center, Floor 3",
      nextAvailable: "Today",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.8,
      reviewCount: 98,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      availableFor: ["IN_PERSON", "VIRTUAL"],
      education: "Johns Hopkins University",
      experience: "12 years",
      location: "Dermatology Clinic, Floor 2",
      nextAvailable: "Tomorrow",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      rating: 4.7,
      reviewCount: 87,
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      availableFor: ["VIRTUAL"],
      education: "Stanford University",
      experience: "10 years",
      location: "Neurology Center",
      nextAvailable: "May 25, 2025",
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Psychiatrist",
      rating: 4.9,
      reviewCount: 156,
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      availableFor: ["VIRTUAL"],
      education: "Yale University",
      experience: "18 years",
      location: "Mental Health Clinic",
      nextAvailable: "May 24, 2025",
    },
    {
      id: "5",
      name: "Dr. Lisa Thompson",
      specialty: "Ophthalmologist",
      rating: 4.6,
      reviewCount: 72,
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      availableFor: ["IN_PERSON"],
      education: "Columbia University",
      experience: "8 years",
      location: "Eye Care Center, Floor 1",
      nextAvailable: "May 26, 2025",
    },
    {
      id: "6",
      name: "Dr. Kevin Lee",
      specialty: "Pediatrician",
      rating: 4.7,
      reviewCount: 110,
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      availableFor: ["IN_PERSON", "VIRTUAL"],
      education: "University of Pennsylvania",
      experience: "9 years",
      location: "Children's Clinic, Suite A",
      nextAvailable: "Today",
    },
    {
      id: "7",
      name: "Dr. Amanda White",
      specialty: "Gynecologist",
      rating: 4.8,
      reviewCount: 130,
      image: "https://randomuser.me/api/portraits/women/51.jpg",
      availableFor: ["IN_PERSON"],
      education: "Cornell University",
      experience: "11 years",
      location: "Women's Health Pavilion",
      nextAvailable: "Tomorrow",
    },
    {
      id: "8",
      name: "Dr. Brian Green",
      specialty: "Orthopedist",
      rating: 4.6,
      reviewCount: 85,
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      availableFor: ["IN_PERSON", "VIRTUAL"],
      education: "Duke University",
      experience: "13 years",
      location: "Sports Medicine Center",
      nextAvailable: "May 27, 2025",
    },
  ];

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
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      specialty === "" ||
      specialty === "All Specialties" ||
      doctor.specialty === specialty;

    const matchesAvailability =
      availability === "" ||
      (availability === "Virtual" &&
        doctor.availableFor.includes("VIRTUAL")) ||
      (availability === "In-Person" &&
        doctor.availableFor.includes("IN_PERSON"));

    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, specialty, availability]);

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Find a Doctor
        </h1>

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Any time</option>
                    <option>Today</option>
                    <option>Next 3 days</option>
                    <option>Next week</option>
                    <option>Next month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Any gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
                    <option>Any language</option>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Mandarin</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600">
              {filteredDoctors.length}{" "}
              {filteredDoctors.length === 1 ? "doctor" : "doctors"} found
            </p>
            <select className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500">
              <option>Sort by: Recommended</option>
              <option>Sort by: Rating (high to low)</option>
              <option>Sort by: Availability</option>
              <option>Sort by: Experience</option>
            </select>
          </div>

          {currentDoctors.length > 0 ? (
            currentDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex flex-col items-center md:items-start md:flex-row md:flex-1">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {doctor.name}
                      </h2>
                      <p className="text-gray-600">{doctor.specialty}</p>

                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(doctor.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {doctor.rating} ({doctor.reviewCount} reviews)
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          <span>Next available: {doctor.nextAvailable}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-4 w-4 mr-1 text-gray-400" />
                          <span>{doctor.experience} experience</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            className="h-4 w-4 mr-1 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          <span>{doctor.education}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {doctor.availableFor.includes("IN_PERSON") && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <MapPin className="h-3 w-3 mr-1" />
                            In-Person
                          </span>
                        )}
                        {doctor.availableFor.includes("VIRTUAL") && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Video className="h-3 w-3 mr-1" />
                            Virtual
                          </span>
                        )}
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

          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FindDoctor;
