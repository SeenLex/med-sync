"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Filter,
  Search,
  Calendar,
  User,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Layout from "@/components/layout/Layout";
import {
  MedicalRecord,
  fetchPaginatedMedicalRecords,
} from "@/actions/medical-records";
import { useQuery } from "@tanstack/react-query";
import PaginationControls from "@/components/ui/PaginationControls";
import { MEDICAL_RECORDS_PAGE_SIZE } from "@/lib/constants";

type Props = {
  initialData: {
    medicalRecords: MedicalRecord[];
    totalCount: number;
  };
  patientId: number;
};

const MedicalRecords: React.FC<Props> = ({ initialData, patientId }) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isFetching } = useQuery({
    queryKey: ["medical-records", page],
    queryFn: () => fetchPaginatedMedicalRecords({ patientId, page }),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (previousData) => previousData,
    enabled: patientId > 0,
  });

  const totalPages = Math.ceil(
    (data?.totalCount || 0) / MEDICAL_RECORDS_PAGE_SIZE
  );
  const medicalRecords = data?.medicalRecords || [];

  const filteredRecords = medicalRecords.filter(
    (medicalRecord: MedicalRecord) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "lab-results" && medicalRecord.type === "LAB_RESULT") ||
        (filter === "prescriptions" && medicalRecord.type === "PRESCRIPTION") ||
        (filter === "visit-summaries" &&
          medicalRecord.type === "VISIT_SUMMARY") ||
        (filter === "medical-history" &&
          medicalRecord.type === "MEDICAL_HISTORY");

      const matchesSearch =
        searchQuery === "" ||
        medicalRecord.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicalRecord.doctor.user.fullName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    }
  );

  const getRecordTypeInfo = (type: string) => {
    switch (type) {
      case "LAB_RESULT":
        return { label: "Lab Result", color: "bg-blue-100 text-blue-800" };
      case "PRESCRIPTION":
        return {
          label: "Prescription",
          color: "bg-purple-100 text-purple-800",
        };
      case "VISIT_SUMMARY":
        return {
          label: "Visit Summary",
          color: "bg-emerald-100 text-emerald-800",
        };
      case "MEDICAL_HISTORY":
        return {
          label: "Medical History",
          color: "bg-amber-100 text-amber-800",
        };
      default:
        return { label: "Other", color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Medical Records
        </h1>

        {/* Enhanced Filter/Search Section */}
        <div className="sticky top-0 z-10 bg-white rounded-lg shadow-lg p-4 mb-6 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-semibold text-gray-800 mr-2">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: "All" },
                { key: "lab-results", label: "Lab Results" },
                { key: "prescriptions", label: "Prescriptions" },
                { key: "visit-summaries", label: "Visit Summaries" },
                { key: "medical-history", label: "Medical History" },
              ].map((f) => (
                <button
                  key={f.key}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400
                    ${filter === f.key
                      ? "bg-emerald-600 text-white border-emerald-600 shadow"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-700"}
                  `}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search medical records"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 w-full bg-gray-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <hr className="mb-6 border-gray-200" />

        {isFetching && <div className="text-center p-4">Loading...</div>}

        <div className={`grid gap-4 ${isFetching ? "opacity-50" : ""} grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`}>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record: MedicalRecord) => {
              const typeInfo = getRecordTypeInfo(record.type);
              return (
                <Card
                  key={record.id}
                  className="p-4 hover:shadow-lg transition-shadow border border-gray-100 flex flex-col justify-between min-h-[200px]"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <FileText className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {record.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {record.description}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span suppressHydrationWarning>
                            {new Date(record.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          <span>
                            {record.doctor.user.fullName} - {record.doctor.specialization}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center hover:bg-emerald-50 focus:ring-2 focus:ring-emerald-400"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex items-center shadow hover:shadow-md focus:ring-2 focus:ring-blue-400"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="text-center text-gray-500">
              No medical records found.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              isFetching={isFetching}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MedicalRecords;