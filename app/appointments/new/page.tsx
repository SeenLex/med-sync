"use client";

import React, { useState } from "react";
import { Video, MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const NewAppointment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState<
    "IN_PERSON" | "VIRTUAL" | null
  >(null);

  interface Doctor {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviewCount: number;
    image: string;
    availableFor: ("IN_PERSON" | "VIRTUAL")[];
  }

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");

  // Mock data for doctors
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviewCount: 124,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      availableFor: ["IN_PERSON", "VIRTUAL"],
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.8,
      reviewCount: 98,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      availableFor: ["IN_PERSON", "VIRTUAL"],
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      rating: 4.7,
      reviewCount: 87,
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      availableFor: ["VIRTUAL"],
    },
    {
      id: "4",
      name: "Dr. James Wilson",
      specialty: "Psychiatrist",
      rating: 4.9,
      reviewCount: 156,
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      availableFor: ["VIRTUAL"],
    },
    {
      id: "5",
      name: "Dr. Lisa Thompson",
      specialty: "Ophthalmologist",
      rating: 4.6,
      reviewCount: 72,
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      availableFor: ["IN_PERSON"],
    },
  ];

  // Mock data for specialties
  const specialties = [
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

  // Mock data for available dates
  const availableDates = [
    "2025-05-15",
    "2025-05-16",
    "2025-05-17",
    "2025-05-18",
    "2025-05-19",
    "2025-05-20",
    "2025-05-21",
  ];

  // Mock data for available time slots
  const availableTimeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialty === "" || doctor.specialty === specialty;
    const matchesType =
      appointmentType === null || doctor.availableFor.includes(appointmentType);
    return matchesSearch && matchesSpecialty && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleNextStep = () => {
    if (step === 1 && appointmentType) {
      setStep(2);
    } else if (step === 2 && selectedDoctor) {
      setStep(3);
    } else if (step === 3 && selectedDate && selectedTime) {
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const stepLabels = [
    "Appointment Type",
    "Select Doctor",
    "Date & Time",
    "Confirm",
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Book an Appointment
        </h1>

        {/* full tracker on md+ */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((n) => (
              <React.Fragment key={n}>
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step >= n
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {n}
                  </div>
                  <p
                    className={`ml-2 text-sm font-medium ${
                      step >= n ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {stepLabels[n - 1]}
                  </p>
                </div>
                {n < 4 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step > n ? "bg-emerald-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* simple label on xs–sm */}
        <div className="md:hidden flex items-center mb-6">
          <div
            className="flex items-center justify-center w-9 h-8 rounded-full
               bg-emerald-600 text-white flex-shrink-0 text-sm font-medium"
          >
            {step}/{stepLabels.length}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">
            {stepLabels[step - 1]}
          </span>
        </div>

        <Card className="w-full p-4 sm:p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                Select Appointment Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  onClick={() => setAppointmentType("IN_PERSON")}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    appointmentType === "IN_PERSON"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900">
                      In-Person Visit
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Visit the doctor at their office for a face-to-face
                    consultation. Ideal for physical examinations and
                    procedures.
                  </p>
                </div>
                <div
                  onClick={() => setAppointmentType("VIRTUAL")}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    appointmentType === "VIRTUAL"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Video className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="ml-4 text-lg font-medium text-gray-900">
                      Virtual Consultation
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    Connect with the doctor through a secure video call from the
                    comfort of your home. Ideal for follow-ups and
                    consultations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Select a Doctor</h2>
              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="relative w-full md:w-80">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-900" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by doctor name or specialty"
                    className="pl-10 pr-4 py-2 border rounded-md focus:outline-none text-gray-900 focus:ring-emerald-500 focus:border-emerald-500 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded-md py-2 pl-3 pr-10 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
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
              </div>
              <div className="space-y-4">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDoctor?.id === doctor.id
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {doctor.specialty}
                          </p>
                          <div className="mt-1 flex items-center">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(doctor.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 15.934l-6.18 3.254 1.18-6.875L.5 7.914l6.902-1.004L10
                                    .686l2.598 6.224 6.902 1.004-4.5 4.399 1.18
                                    6.875z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-1 text-sm text-gray-500">
                              {doctor.rating} ({doctor.reviewCount} reviews)
                            </span>
                          </div>
                          <div className="mt-2 flex space-x-2">
                            {doctor.availableFor.includes("IN_PERSON") && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                In-Person
                              </span>
                            )}
                            {doctor.availableFor.includes("VIRTUAL") && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Virtual
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No doctors found matching your criteria.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                Select Date and Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-900">Select Date</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableDates.map((date) => (
                      <div
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`border rounded-md p-2 text-center cursor-pointer transition-all ${
                          selectedDate === date
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50 text-gray-400"
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {new Date(date).toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="text-lg font-semibold">
                          {new Date(date).getDate()}
                        </div>
                        <div className="text-xs">
                          {new Date(date).toLocaleDateString("en-US", {
                            month: "short",
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-900">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {availableTimeSlots.map((time) => (
                      <div
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`border rounded-md py-2 px-1 text-center cursor-pointer transition-all ${
                          selectedTime === time
                            ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                            : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50 text-gray-400"
                        }`}
                      >
                        <div className="text-sm font-medium">{time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-900">
                Confirm Your Appointment
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-4">
                  {selectedDoctor && (
                    <img
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {selectedDoctor?.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedDoctor?.specialty}
                    </p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Date
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedDate && formatDate(selectedDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Time
                        </p>
                        <p className="text-base text-gray-900">
                          {selectedTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">
                          Appointment Type
                        </p>
                        <p className="text-base text-gray-900">
                          {appointmentType === "IN_PERSON"
                            ? "In-Person Visit"
                            : "Virtual Consultation"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-gray-900">Reason for Visit</h3>
                <textarea
                  className="w-full border rounded-md p-3 focus:outline-none border-gray-400 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={4}
                  placeholder="Please describe your symptoms or reason for the appointment..."
                ></textarea>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1
                          1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000
                          2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1
                          1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      {appointmentType === "VIRTUAL"
                        ? "You will receive a link to join the video consultation 15 minutes before your appointment time."
                        : "Please arrive 15 minutes before your appointment time. The address will be sent to your email."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 1}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={handleNextStep}
                disabled={
                  (step === 1 && !appointmentType) ||
                  (step === 2 && !selectedDoctor) ||
                  (step === 3 && (!selectedDate || !selectedTime))
                }
                className="w-full sm:w-auto"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            ) : (
              <Button className="w-full sm:w-auto">Confirm Appointment</Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default NewAppointment;
