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

      {isFetching && <div className="text-center p-2">Loading...</div>}

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
                        {new Date(appt.startTime).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span suppressHydrationWarning>
                        {new Date(appt.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="mt-2">
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
                      <span
                        className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appt.type === "VIRTUAL"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {appt.type === "VIRTUAL" ? "Virtual" : "In-Person"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  {(appt.status === "PENDING" ||
                    appt.status === "COMPLETED" ||
                    appt.status === "CANCELED") && (
                    <Link
                      href={`/appointments/new/reschedule/${appt.doctorId}?type=${appt.type}`}
                    >
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </Link>
                  )}
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