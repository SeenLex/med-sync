"use client";

import React from "react";
import { Search } from "lucide-react";

type DoctorFiltersProps = {
  filters: {
    searchQuery: string;
    specialtyId: string;
    availability: string;
  };
  onFilterChange: (
    name: keyof DoctorFiltersProps["filters"],
    value: string
  ) => void;
  specialties: { value: string, label: string }[];
};

const DoctorFilters: React.FC<DoctorFiltersProps> = ({
  filters,
  onFilterChange,
  specialties,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex w-full md:w-auto gap-4">
          <select
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            value={filters.specialtyId}
            onChange={(e) => onFilterChange("specialtyId", e.target.value)}
          >
            {specialties.map((spec) => (
              <option key={spec.value} value={spec.value}>
                {spec.label}
              </option>
            ))}
          </select>

          <select
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            value={filters.availability}
            onChange={(e) => onFilterChange("availability", e.target.value)}
          >
            <option value="Any Availability">Any Availability</option>
            <option value="Virtual">Virtual</option>
            <option value="In-Person">In-Person</option>
          </select>
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by doctor name or specialty"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 w-full"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorFilters;