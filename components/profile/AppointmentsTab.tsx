"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Clock, Video, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Appointment,
  fetchPaginatedAppointments,
} from "@/actions/appointments";
import { useQuery } from "@tanstack/react-query";
import PaginationControls from "@/components/ui/PaginationControls";
import { APPOINTMENTS_PAGE_SIZE } from "@/lib/constants";
import { formatDateDDMMYYYY, formatTimeHHMM } from "@/lib/utils";

type Props = {
  initialData: {
    appointments: Appointment[];
    totalCount: number;
  };
  patientId: number;
};

const AppointmentsTab: React.FC<Props> = ({ initialData, patientId }) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["profile-appointments", page],
    queryFn: () => fetchPaginatedAppointments({ patientId, page }),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (previousData) => previousData,
    enabled: patientId > 0,
  });

  const totalPages = Math.ceil(
    (data?.totalCount || 0) / APPOINTMENTS_PAGE_SIZE
  );
  const appointments = data?.appointments || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        My Appointments
      </h2>

      <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <Card
              key={appt.id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      appt.type === "VIRTUAL"
                        ? "bg-blue-100"
                        : "bg-green-100"
                    }`}
                  >
                    {appt.type === "VIRTUAL" ? (
                      <Video className="h-6 w-6 text-blue-600" />
                    ) : (
                      <MapPin className="h-6 w-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {appt.doctor.user.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {appt.doctor.specialization}
                    </p>
                    <div className="mt-2 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span suppressHydrationWarning>
                        {formatDateDDMMYYYY(appt.startTime)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span suppressHydrationWarning>
                        {formatTimeHHMM(appt.startTime)}
                      </span>
                    </div>
                    <div className="mt-2">
                      {/* Additional appointment status or type tags can go here if needed */}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6 text-center">
            <p className="text-gray-500">You have no appointments.</p>
            <Link href="/appointments/new">
              <Button className="mt-4">Book an Appointment</Button>
            </Link>
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

export default AppointmentsTab;