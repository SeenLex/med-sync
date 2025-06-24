"use client";

import React from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import type { FindDoctor } from "@/actions/user";
import defaultProfilePic from "@/assets/profile.jpg";

type Step2Props = {
  doctors: FindDoctor;
  specialties: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  selectedDoctor: FindDoctor[number] | null;
  setSelectedDoctor: (doctor: FindDoctor[number] | null) => void;
  appointmentType: "IN_PERSON" | "VIRTUAL" | null;
};

const Step2: React.FC<Step2Props> = ({
  doctors,
  specialties,
  searchQuery,
  setSearchQuery,
  specialty,
  setSpecialty,
  selectedDoctor,
  setSelectedDoctor,
  appointmentType,
}) => {
  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.fullName.toLowerCase();
    const docSpecialization =
      doctor.doctor?.specialization?.toLowerCase() || "";

    const matchesSearch =
      searchQuery === "" ||
      name.includes(searchQuery.toLowerCase()) ||
      (docSpecialization &&
        docSpecialization.includes(searchQuery.toLowerCase()));

    const matchesSpecialty =
      specialty === "" ||
      (docSpecialization && docSpecialization === specialty.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Select a Doctor
      </h2>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
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
              className={`border rounded-lg p-4 cursor-pointer transition-all flex items-center ${
                selectedDoctor?.id === doctor.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50"
              }`}
            >
              <Image
                src={
                  doctor.profileImage &&
                  (doctor.profileImage.startsWith("http://") || doctor.profileImage.startsWith("https://") || doctor.profileImage.startsWith("/"))
                    ? doctor.profileImage
                    : defaultProfilePic
                }
                alt={doctor.fullName}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover flex-shrink-0"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {doctor.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {doctor.doctor?.specialty?.name || doctor.doctor?.specialization || "N/A"}
                </p>
                <div className="mt-2 flex space-x-2">
                  {appointmentType === "IN_PERSON" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      In-Person
                    </span>
                  )}
                  {appointmentType === "VIRTUAL" && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Virtual
                    </span>
                  )}
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
  );
};

export default Step2;