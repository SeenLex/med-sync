"use client";

import React, { useState } from "react";
import {
  confirmAppointment,
  declineAppointment,
  fetchPendingDoctorAppointments,
} from "@/actions/appointments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { APPOINTMENTS_PAGE_SIZE } from "@/lib/constants";
import Card from "../ui/Card";
import { Calendar, Clock } from "lucide-react";
import Button from "../ui/Button";
import PaginationControls from "../ui/PaginationControls";

type Props = {
  doctorId: number;
};

const PendingAppointmentsList: React.FC<Props> = ({ doctorId }) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["doctor-pending-appointments", doctorId, page],
    queryFn: () => fetchPendingDoctorAppointments({ doctorId, page }),
    placeholderData: (previousData) => previousData,
  });

  const handleSuccess = () => {
    // When status is updated, refetch the list to remove the item
    queryClient.invalidateQueries({
      queryKey: ["doctor-pending-appointments"],
    });
    alert("Appointment status updated successfully.");
  };

  const confirmMutation = useMutation({
    mutationFn: confirmAppointment,
    onSuccess: handleSuccess,
  });

  const declineMutation = useMutation({
    mutationFn: declineAppointment,
    onSuccess: handleSuccess,
  });

  const appointments = data?.appointments || [];
  const totalPages = Math.ceil(
    (data?.totalCount || 0) / APPOINTMENTS_PAGE_SIZE
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Pending Appointment Requests
      </h2>
      {isFetching && <div className="text-center p-2">Loading...</div>}
      <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
        {appointments.length > 0 ? (
          appointments.map((appt) => (
            <Card key={appt.id} className="p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {appt.patient.user.fullName}
                  </p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span suppressHydrationWarning>
                      {new Date(appt.startTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    <span suppressHydrationWarning>
                      {new Date(appt.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  {appt.notes && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      &quot;{appt.notes}&quot;
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => confirmMutation.mutate(appt.id)}
                    disabled={
                      confirmMutation.isPending || declineMutation.isPending
                    }
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => declineMutation.mutate(appt.id)}
                    disabled={
                      confirmMutation.isPending || declineMutation.isPending
                    }
                  >
                    Decline
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No pending appointment requests.</p>
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

export default PendingAppointmentsList;