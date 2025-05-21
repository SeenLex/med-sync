import React, { useState, useEffect } from "react";
import { Availability, Appointment } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

interface DoctorScheduleProps {
  doctorId: string;
}

const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ doctorId }) => {
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  useEffect(() => {
    const fetchScheduleData = async () => {
      setIsLoading(true);
      try {
        // Mock data for doctor availability
        const mockAvailability: Availability[] = [
          {
            id: "avail-1",
            doctorId,
            dayOfWeek: 1, // Monday
            startTime: "09:00",
            endTime: "17:00",
            isAvailable: true,
          },
          {
            id: "avail-2",
            doctorId,
            dayOfWeek: 2, // Tuesday
            startTime: "09:00",
            endTime: "17:00",
            isAvailable: true,
          },
          {
            id: "avail-3",
            doctorId,
            dayOfWeek: 3, // Wednesday
            startTime: "09:00",
            endTime: "17:00",
            isAvailable: true,
          },
          {
            id: "avail-4",
            doctorId,
            dayOfWeek: 4, // Thursday
            startTime: "09:00",
            endTime: "17:00",
            isAvailable: true,
          },
          {
            id: "avail-5",
            doctorId,
            dayOfWeek: 5, // Friday
            startTime: "09:00",
            endTime: "15:00",
            isAvailable: true,
          },
        ];

        // Mock appointments data
        const mockAppointments: Appointment[] = [];
        
        // Generate some mock appointments for the current week
        for (let i = 0; i < 10; i++) {
          const dayOfWeek = 1 + (i % 5); // Monday to Friday
          const appointmentDate = addDays(currentWeekStart, dayOfWeek - 1);
          
          const hour = 9 + Math.floor(i / 2);
          const minutes = (i % 2) * 30;
          
          appointmentDate.setHours(hour, minutes, 0);
          
          const endTime = new Date(appointmentDate);
          endTime.setMinutes(appointmentDate.getMinutes() + 30);
          
          mockAppointments.push({
            id: `week-appointment-${i}`,
            patientId: `patient-${i % 5 + 1}`,
            doctorId,
            startTime: appointmentDate,
            endTime,
            status: i % 5 === 0 ? "PENDING" : "CONFIRMED",
            type: i % 2 === 0 ? "VIRTUAL" : "IN_PERSON",
            createdAt: new Date(),
            updatedAt: new Date(),
            patient: {
              id: `patient-${i % 5 + 1}`,
              userId: `user-${i % 5 + 1}`,
              user: {
                id: `user-${i % 5 + 1}`,
                email: `patient${i % 5 + 1}@example.com`,
                fullName: `Patient ${i % 5 + 1}`,
                role: "PATIENT",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            },
            doctor: {
              id: doctorId,
              userId: "doctor-user-id",
              user: {
                id: "doctor-user-id",
                email: "doctor@example.com",
                fullName: "Dr. Sarah Smith",
                role: "DOCTOR",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
              specialization: "Cardiologist",
            },
          });
        }

        setAvailability(mockAvailability);
        setAppointments(mockAppointments);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScheduleData();
  }, [doctorId, currentWeekStart]);

  const previousWeek = () => {
    const prevWeek = new Date(currentWeekStart);
    prevWeek.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(prevWeek);
  };

  const nextWeek = () => {
    const nextWeek = new Date(currentWeekStart);
    nextWeek.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(nextWeek);
  };

  const weekDays = Array.from({ length: 5 }).map((_, index) => {
    return addDays(currentWeekStart, index);
  });

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(appointment.startTime, date)
    ).sort((a, b) => 
      a.startTime.getTime() - b.startTime.getTime()
    );
  };

  const getAvailabilityForDay = (dayOfWeek: number) => {
    return availability.find(a => a.dayOfWeek === dayOfWeek);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading schedule...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Weekly Schedule</h2>
        <div className="flex space-x-4 items-center">
          <Button variant="outline" size="sm" onClick={previousWeek}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-gray-700 font-medium">
            {format(currentWeekStart, "MMM d")} - {format(addDays(currentWeekStart, 4), "MMM d, yyyy")}
          </span>
          <Button variant="outline" size="sm" onClick={nextWeek}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {weekDays.map((day, index) => {
          const dayNumber = index + 1; // 1-based (Monday = 1)
          const dayAvailability = getAvailabilityForDay(dayNumber);
          const dayAppointments = getAppointmentsForDay(day);
          
          return (
            <div key={index} className="border rounded-lg overflow-hidden bg-white">
              <div className={`p-3 text-center ${
                dayAvailability?.isAvailable 
                  ? "bg-emerald-100 text-emerald-800" 
                  : "bg-gray-100 text-gray-500"
              }`}>
                <div className="font-medium">{format(day, "EEE")}</div>
                <div className="text-sm">{format(day, "MMM d")}</div>
              </div>
              
              <div className="p-2">
                {dayAvailability?.isAvailable ? (
                  <div className="text-xs text-gray-500 text-center mb-2">
                    {dayAvailability.startTime} - {dayAvailability.endTime}
                  </div>
                ) : (
                  <div className="text-xs text-gray-500 text-center mb-2">
                    Not Available
                  </div>
                )}

                <div className="space-y-2 overflow-y-auto max-h-[300px]">
                  {dayAppointments.length > 0 ? (
                    dayAppointments.map(appointment => (
                      <div 
                        key={appointment.id} 
                        className={`text-xs p-2 rounded ${
                          appointment.status === "CONFIRMED"
                            ? "bg-green-50 border-l-2 border-green-500"
                            : "bg-yellow-50 border-l-2 border-yellow-500"
                        }`}
                      >
                        <div className="font-medium">
                          {format(appointment.startTime, "h:mm a")} - {format(appointment.endTime, "h:mm a")}
                        </div>
                        <div className="mt-1">{appointment.patient.user.fullName}</div>
                        <div className="mt-1 text-gray-500">
                          {appointment.type === "VIRTUAL" ? "Virtual" : "In-Person"}
                        </div>
                      </div>
                    ))
                  ) : dayAvailability?.isAvailable ? (
                    <div className="text-center text-xs text-gray-500 py-4">
                      No appointments
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" size="sm">
          View Full Calendar
        </Button>
        <Button variant="outline" size="sm">
          Edit Availability
        </Button>
      </div>
    </div>
  );
};

export default DoctorSchedule;
