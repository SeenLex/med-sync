"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Filter,
  Plus,
  Search,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import {
  Appointment,
  cancelAppointment,
  fetchPaginatedAppointments,
} from "@/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PaginationControls from "@/components/ui/PaginationControls";
import { APPOINTMENTS_PAGE_SIZE } from "@/lib/constants";

type Props = {
  initialData: {
    appointments: Appointment[];
    totalCount: number;
  };
  patientId: number;
};

const Appointments: React.FC<Props> = ({ initialData, patientId }) => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cancelingId, setCancelingId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["appointments", page],
    queryFn: () => fetchPaginatedAppointments({ patientId, page }),
    initialData: page === 1 ? initialData : undefined,
    placeholderData: (previousData) => previousData,
  });

  const cancelAppointmentMutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments", page] });
      alert("Appointment canceled successfully.");
    },
    onError: (error) => {
      console.error("Failed to cancel appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    },
    onSettled: () => {
      setCancelingId(null);
    },
  });

  const handleCancel = (appointmentId: number) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      setCancelingId(appointmentId);
      cancelAppointmentMutation.mutate(appointmentId);
    }
  };

  const totalPages = Math.ceil(
    (data?.totalCount || 0) / APPOINTMENTS_PAGE_SIZE
  );

  const filteredAppointments =
    data?.appointments.filter((appointment: Appointment) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "upcoming" &&
          ["CONFIRMED", "PENDING"].includes(appointment.status)) ||
        (filter === "completed" && appointment.status === "COMPLETED") ||
        (filter === "canceled" && appointment.status === "CANCELED") ||
        (filter === "virtual" && appointment.type === "VIRTUAL") ||
        (filter === "in-person" && appointment.type === "IN_PERSON");

      const matchesSearch =
        searchQuery === "" ||
        appointment.doctor.user.fullName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        appointment.doctor.specialization
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    }) || [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            My Appointments
          </h1>
          <Link href="/appointments/new">
            <Button className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Book New Appointment
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "all",
                  "upcoming",
                  "completed",
                  "canceled",
                  "virtual",
                  "in-person",
                ].map((f) => (
                  <button
                    key={f}
                    className={`px-3 py-1 text-sm rounded-full ${
                      filter === f
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative text-gray-800">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by doctor or specialty"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md
                           focus:outline-none focus:ring-emerald-500
                           focus:border-emerald-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {isFetching && <div className="text-center p-4">Loading...</div>}

        <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-full ${
                        appointment.type === "VIRTUAL"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}
                    >
                      {appointment.type === "VIRTUAL" ? (
                        <Video className="h-6 w-6 text-blue-600" />
                      ) : (
                        <MapPin className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {appointment.doctor.user.fullName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {appointment.doctor.specialization}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span suppressHydrationWarning>
                          {new Date(appointment.startTime).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span suppressHydrationWarning>
                          {new Date(appointment.startTime).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : appointment.status === "CANCELED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appointment.type === "VIRTUAL"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {appointment.type === "VIRTUAL"
                            ? "Virtual"
                            : "In-Person"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    {appointment.status === "PENDING" && (
                      <>
                        <Link
                          href={`/appointments/new/reschedule/${appointment.doctorId}?type=${appointment.type}`}
                        >
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancel(appointment.id)}
                          disabled={cancelingId === appointment.id}
                        >
                          {cancelingId === appointment.id
                            ? "Canceling..."
                            : "Cancel"}
                        </Button>
                      </>
                    )}
                    {(appointment.status === "COMPLETED" ||
                      appointment.status === "CANCELED") && (
                      <Link
                        href={`/appointments/new/reschedule/${appointment.doctorId}?type=${appointment.type}`}
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
              <p className="text-gray-500">
                No appointments found matching your criteria.
              </p>
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
    </Layout>
  );
};

export default Appointments;