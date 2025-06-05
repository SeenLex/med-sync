"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Clock, Video, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Appointment } from "@/actions/appointments";

type Props = {
  all: Appointment[];
};

const AppointmentsTab: React.FC<Props> = ({ all }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        My Appointments
      </h2>
      {all.length > 0 ? (
        <div className="space-y-4">
          {all.map((appt) => (
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
                    {/* 2. Updated Status Badge Logic */}
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

                {/* 3. Copied the exact same button logic from Appointments.tsx */}
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  {/* Rule 1: If PENDING or CONFIRMED, show Cancel button */}
                  {(appt.status === "CONFIRMED" ||
                    appt.status === "PENDING") && (
                    <>
                      {appt.status === "CONFIRMED" &&
                        appt.type === "VIRTUAL" && (
                          <Button variant="primary" size="sm">
                            Join Call
                          </Button>
                        )}
                      <Button variant="danger" size="sm">
                        Cancel
                      </Button>
                    </>
                  )}

                  {/* Rule 2: If CANCELED or COMPLETED, show Reschedule button */}
                  {(appt.status === "COMPLETED" ||
                    appt.status === "CANCELED") && (
                    <>
                      {appt.status === "COMPLETED" && (
                        <Link
                          href={`/medical-records?appointment=${appt.id}`}
                        >
                          <Button variant="secondary" size="sm">
                            View Records
                          </Button>
                        </Link>
                      )}
                      <Link
                        href={`/appointments/new/reschedule/${appt.doctorId}?type=${appt.type}`}
                      >
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-gray-500">You have no appointments.</p>
          <Button className="mt-4">Book an Appointment</Button>
        </Card>
      )}
    </div>
  );
};

export default AppointmentsTab;