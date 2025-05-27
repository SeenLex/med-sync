import React from "react";
import { Calendar, Clock, Video, MapPin } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { Appointment } from "@/actions/appointments";

type Props = {
  all: Appointment[];
  page: number;
  setPage: (p: number) => void;
};

const PAGE_SIZE = 5;

const AppointmentsTab: React.FC<Props> = ({ all, page, setPage }) => {
  const total = Math.ceil(all.length / PAGE_SIZE);
  const slice = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        My Appointments
      </h2>
      {slice.length > 0 ? (
        <>
          <div className="space-y-4">
            {slice.map((appt) => (
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
                        {appt.startTime.toLocaleDateString()}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {appt.endTime.toLocaleTimeString()}
                      </div>
                      {appt.type && (
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appt.type}
                        </div>
                      )}
                      <div className="mt-2 space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            appt.status === "CONFIRMED"
                              ? "bg-green-100 text-green-800"
                              : appt.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {appt.status.toLowerCase()}
                        </span>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                    {appt.status === "CONFIRMED" && (
                      <>
                        {appt.type === "VIRTUAL" && (
                          <Button size="sm" variant="primary">
                            Join Call
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="danger">
                          Cancel
                        </Button>
                      </>
                    )}
                    {appt.status === "COMPLETED" && (
                      <>
                        <Button size="sm" variant="secondary">
                          View Records
                        </Button>
                        <Button size="sm" variant="outline">
                          Book Follow-up
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {total > 1 && (
            <Pagination
              currentPage={page}
              totalPages={total}
              onPageChange={setPage}
            />
          )}
        </>
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
