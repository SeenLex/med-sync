"use client";

import React, { useState } from "react";
import { FileText, User, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  MedicalRecord,
  fetchPaginatedMedicalRecords,
  downloadMedicalRecord,
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

const MedicalRecordsTab: React.FC<Props> = ({ initialData, patientId }) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["profile-medical-records", page],
    queryFn: () => fetchPaginatedMedicalRecords({ patientId, page }),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (previousData) => previousData,
    enabled: patientId > 0,
  });

  const totalPages = Math.ceil(
    (data?.totalCount || 0) / MEDICAL_RECORDS_PAGE_SIZE
  );
  const medicalRecords = data?.medicalRecords || [];

  const getTypeInfo = (type: string) => {
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Medical Records</h2>

      {isFetching && <div className="text-center p-2">Loading...</div>}

      <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
        {medicalRecords.length > 0 ? (
          medicalRecords.map((rec) => {
            const info = getTypeInfo(rec.type);
            return (
              <Card
                key={rec.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <FileText className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {rec.title}
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {rec.doctor.user.fullName}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span suppressHydrationWarning>
                          {rec.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${info.color}`}
                        >
                          {info.label}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => rec.fileUrl && window.open(rec.fileUrl, "_blank")}
                      disabled={!rec.fileUrl}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={async () => {
                        if (!rec.fileUrl) return;
                        const blob = await downloadMedicalRecord(rec.fileUrl);
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = rec.title || "medical-record";
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      disabled={!rec.fileUrl}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <Card className="p-6 text-center">
            <p className="text-gray-500">No medical records yet.</p>
          </Card>
        )}
      </div>

      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default MedicalRecordsTab;