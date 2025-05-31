import React, { useState, useEffect } from "react";
import { Appointment, Patient, Doctor, AppointmentStatus } from "@/types";
import Button from "@/components/ui/Button";
import { Calendar, Clock, Video, MapPin, User } from "lucide-react";
import { format } from "date-fns";
import Pagination from "@/components/ui/Pagination";

interface UpcomingAppointmentsProps {
  doctorId: number;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ doctorId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const mockPatients: Patient[] = [
          {
            id: 1,
            userId: 11,
            user: {
              id: 1,
              email: "john.doe@example.com",
              fullName: "John Doe",
              role: "PATIENT",
              phone: "+1 (555) 111-2222",
              dateOfBirth: new Date("1985-05-15"),
              gender: "Male",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
          {
            id: 2,
            userId: 22,
            user: {
              id: 2,
              email: "jane.smith@example.com",
              fullName: "Jane Smith",
              role: "PATIENT",
              phone: "+1 (555) 222-3333",
              dateOfBirth: new Date("1990-10-20"),
              gender: "Female",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
          {
            id: 3,
            userId: 33,
            user: {
              id: 3,
              email: "robert.johnson@example.com",
              fullName: "Robert Johnson",
              role: "PATIENT",
              phone: "+1 (555) 333-4444",
              dateOfBirth: new Date("1978-03-12"),
              gender: "Male",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        ];

        const mockDoctor: Doctor = {
          id: doctorId,
          userId: 12,
          user: {
            id: 12,
            email: "dr.smith@example.com",
            fullName: "Dr. Sarah Smith",
            role: "DOCTOR",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          specialization: "Cardiologist",
        };

        const today = new Date();
        const mockAppointments: Appointment[] = [];
        
        for (let i = 0; i < 12; i++) {
          const startTime = new Date(today);
          startTime.setDate(today.getDate() + Math.floor(i / 3));
          startTime.setHours(9 + (i % 3) * 2, 0, 0);
          
          const endTime = new Date(startTime);
          endTime.setMinutes(startTime.getMinutes() + 30);
          
          mockAppointments.push({
            id: i,
            patientId: mockPatients[i % 3].id,
            doctorId,
            startTime,
            endTime,
            status: i % 5 === 0 ? "PENDING" : "CONFIRMED",
            type: i % 2 === 0 ? "VIRTUAL" : "IN_PERSON",
            notes: i % 3 === 0 ? "Follow-up appointment" : undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
            patient: mockPatients[i % 3],
            doctor: mockDoctor,
          });
        }

        setAppointments(mockAppointments);
        setTotalPages(Math.ceil(mockAppointments.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusBadgeClasses = (status: AppointmentStatus) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading appointments...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        <Button variant="primary" size="sm">
          Add New Appointment
        </Button>
      </div>

      {paginatedAppointments.length > 0 ? (
        <div className="space-y-4">
          {paginatedAppointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full h-12 w-12 bg-gray-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">
                      {appointment.patient.user.fullName}
                    </h3>
                    <div className="mt-2 flex space-x-6">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{format(appointment.startTime, 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {format(appointment.startTime, 'h:mm a')} - {format(appointment.endTime, 'h:mm a')}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-2">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(appointment.status)}`}
                      >
                        {appointment.status}
                      </span>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.type === "VIRTUAL" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {appointment.type === "VIRTUAL" ? (
                          <><Video className="h-3 w-3 mr-1" /> Virtual</>
                        ) : (
                          <><MapPin className="h-3 w-3 mr-1" /> In-Person</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                  {appointment.status === "CONFIRMED" && appointment.type === "VIRTUAL" && (
                    <Button variant="primary" size="sm">
                      Join Call
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No upcoming appointments
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default UpcomingAppointments;
