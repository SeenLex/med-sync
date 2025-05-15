'use client';

import React, { useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Filter,
  Search,
  Calendar,
  User,
  FileType2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Layout from "@/components/layout/Layout";

const MedicalRecords: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const medicalRecords = [
    {
      id: "1",
      title: "Annual Physical Examination",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Primary Care",
      date: "April 15, 2025",
      type: "VISIT_SUMMARY",
      description:
        "Comprehensive annual physical examination results and recommendations.",
      fileUrl: "/sample-files/physical-exam.pdf",
    },
    {
      id: "2",
      title: "Blood Test Results",
      doctorName: "Dr. Michael Chen",
      specialty: "Hematology",
      date: "March 28, 2025",
      type: "LAB_RESULT",
      description: "Complete blood count (CBC) and metabolic panel results.",
      fileUrl: "/sample-files/blood-test.pdf",
    },
    {
      id: "3",
      title: "Hypertension Medication",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Cardiology",
      date: "March 10, 2025",
      type: "PRESCRIPTION",
      description:
        "Prescription for hypertension medication with dosage instructions.",
      fileUrl: "/sample-files/prescription.pdf",
    },
    {
      id: "4",
      title: "MRI Scan - Lower Back",
      doctorName: "Dr. James Wilson",
      specialty: "Radiology",
      date: "February 22, 2025",
      type: "LAB_RESULT",
      description: "MRI scan results for lower back pain assessment.",
      fileUrl: "/sample-files/mri-scan.pdf",
    },
    {
      id: "5",
      title: "Allergy Test Results",
      doctorName: "Dr. Lisa Thompson",
      specialty: "Immunology",
      date: "January 15, 2025",
      type: "LAB_RESULT",
      description:
        "Comprehensive allergy panel test results and recommendations.",
      fileUrl: "/sample-files/allergy-test.pdf",
    },
  ];

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "lab-results" && record.type === "LAB_RESULT") ||
      (filter === "prescriptions" && record.type === "PRESCRIPTION") ||
      (filter === "visit-summaries" && record.type === "VISIT_SUMMARY") ||
      (filter === "medical-history" && record.type === "MEDICAL_HISTORY");

    const matchesSearch =
      searchQuery === "" ||
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          My Medical Records
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === "all"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === "lab-results"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("lab-results")}
                >
                  Lab Results
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === "prescriptions"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("prescriptions")}
                >
                  Prescriptions
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === "visit-summaries"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("visit-summaries")}
                >
                  Visit Summaries
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === "medical-history"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setFilter("medical-history")}
                >
                  Medical History
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search medical records"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => {
              const typeInfo = getRecordTypeInfo(record.type);
              return (
                <Card
                  key={record.id}
                  className="p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <FileText className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {record.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {record.description}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{record.date}</span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <User className="h-4 w-4 mr-1" />
                          <span>
                            {record.doctorName} ({record.specialty})
                          </span>
                        </div>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}
                          >
                            {typeInfo.label}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex items-center"
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
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                No medical records found matching your criteria.
              </p>
            </Card>
          )}
        </div>

        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Medical Records
            </h2>
            <p className="text-gray-600 mb-4">
              You can upload your own medical records to keep track of your
              health information. Supported file formats: PDF, JPG, PNG.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileType2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="mx-auto">
                  Browse Files
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Maximum file size: 10MB
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="primary">Upload Records</Button>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MedicalRecords;
