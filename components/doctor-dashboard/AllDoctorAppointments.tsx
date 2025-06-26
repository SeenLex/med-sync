"use client";

import React, { useState } from "react";
import {
  fetchPaginatedDoctorAppointments,
} from "@/actions/appointments";
import { useQuery } from "@tanstack/react-query";
import { APPOINTMENTS_PAGE_SIZE } from "@/lib/constants";
import Card from "../ui/Card";
import { Calendar, Clock, Video, MapPin } from "lucide-react";
import PaginationControls from "../ui/PaginationControls";
import Link from "next/link";
import { formatDateDDMMYYYY, formatTimeHHMM } from "@/lib/utils";
import Button from "../ui/Button";

type Props = {
  doctorId: number;
};

const AllDoctorAppointmentsList: React.FC<Props> = ({ doctorId }) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["doctor-all-appointments", doctorId, page],
    queryFn: () => fetchPaginatedDoctorAppointments({ doctorId, page }),
    placeholderData: (previousData) => previousData,
  });

  const appointments = data?.appointments || [];
  const totalPages = Math.ceil(
    (data?.totalCount || 0) / APPOINTMENTS_PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">All Appointments</h2>
      <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <Card key={appt.id} className="p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${appt.type === "VIRTUAL" ? "bg-blue-100" : "bg-green-100"}`}>
                    {appt.type === "VIRTUAL" ? (
                      <Video className="h-6 w-6 text-blue-600" />
                    ) : (
                      <MapPin className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {appt.patient.user.fullName}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span suppressHydrationWarning>
                        {formatDateDDMMYYYY(appt.startTime)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      <span suppressHydrationWarning>
                        {formatTimeHHMM(appt.startTime)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-4 sm:mt-0 gap-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      appt.status === "CONFIRMED"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : appt.status === "CANCELED"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                  {appt.type === "VIRTUAL" && appt.meetingLink && (
                    <Link target="_blank" href={appt.meetingLink}>
                      <Button variant="primary" size="sm">
                        Join Meeting
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No appointments found.</p>
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

export default AllDoctorAppointmentsList;