"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorPatients, DoctorPatient } from "@/actions/patients";
import { MEDICAL_RECORDS_PAGE_SIZE } from "@/lib/constants";
import Card from "../ui/Card";
import { User, Mail, Phone } from "lucide-react";
import PaginationControls from "../ui/PaginationControls";
import Button from "../ui/Button";
import Link from "next/link";

type Props = {
  doctorId: number;
};

const MyPatientsList: React.FC<Props> = ({ doctorId }) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["doctor-patients", doctorId, page],
    queryFn: () => fetchDoctorPatients({ doctorId, page }),
    placeholderData: (previousData) => previousData,
  });

  const patients = data?.patients || [];
  const totalPages = Math.ceil(
    (data?.totalCount || 0) / MEDICAL_RECORDS_PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">My Patients</h2>
      {isFetching && <div className="text-center p-2">Loading...</div>}
      <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
        {patients.length > 0 ? (
          patients.map((patient: DoctorPatient) => (
            <Card key={patient.id} className="p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {patient.user.fullName}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {patient.user.email}
                    </div>
                    {patient.user.phone && (
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2" />
                        {patient.user.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Link href={`/patients/${patient.id}/records`}>
                    <Button size="sm" variant="outline">
                      View Records
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">You have no patients yet.</p>
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

export default MyPatientsList;