"use client";

import React, { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import type { FindDoctor } from "@/actions/user";
import Card from "@/components/ui/Card";
import DoctorFilters from "@/components/doctors/DoctorFilters";
import DoctorCard from "@/components/doctors/DoctorCard";

type Props = {
  doctors: FindDoctor;
};

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

const FindDoctorPage: React.FC<Props> = ({ doctors }) => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    specialty: "All Specialties",
    availability: "Any Availability",
  });

  const handleFilterChange = (
    name: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const name = doctor.fullName.toLowerCase();
      const spec = doctor.doctor?.specialization?.toLowerCase() || "";

      const matchesSearch =
        filters.searchQuery === "" ||
        name.includes(filters.searchQuery.toLowerCase()) ||
        spec.includes(filters.searchQuery.toLowerCase());

      const matchesSpecialty =
        filters.specialty === "All Specialties" ||
        spec === filters.specialty.toLowerCase();

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, filters]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find a Doctor</h1>

        <DoctorFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          specialties={specialties}
        />

        <div className="space-y-6">
          <p className="text-gray-600">
            {filteredDoctors.length}{" "}
            {filteredDoctors.length === 1 ? "doctor" : "doctors"} found
          </p>

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
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

export default FindDoctorPage;