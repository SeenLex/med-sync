import React from "react";
import { Calendar } from "@/components/shadcn/calendar";
import { Loader2 } from "lucide-react";

interface Appointment {
  status: string;
  startTime: Date;
}

interface Step3Props {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  appointmentsLoading: boolean;
  appointments: Appointment[] | undefined;
  patientAppointments?: Appointment[];
}

const Step3: React.FC<Step3Props> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  appointmentsLoading,
  appointments,
  patientAppointments = [],
}) => {
  const allTimeSlots = [];
  for (let startingHour = 9; startingHour <= 17; startingHour++) {
    allTimeSlots.push(`${startingHour}:00`);
    if (startingHour < 17) {
      allTimeSlots.push(`${startingHour}:30`);
    }
  }

  const patientBookedTimes = patientAppointments.map((appt) => {
    const hour = new Date(appt.startTime).getHours();
    const minute = new Date(appt.startTime).getMinutes();
    return `${hour}:${minute < 10 ? "0" + minute : minute}`;
  });

  const reservedAppointments = appointments?.filter(
    (appointment) => appointment.status !== "CANCELED"
  );

  const availableTimeSlots = reservedAppointments
    ? allTimeSlots.filter(
        (time) =>
          !reservedAppointments.some((appointment) => {
            const appointmentTimeHour = new Date(
              appointment.startTime
            ).getHours();
            const appointmentTimeMinute = new Date(
              appointment.startTime
            ).getMinutes();
            const formattedTime = `${appointmentTimeHour}:$${
              appointmentTimeMinute < 10
                ? "0" + appointmentTimeMinute
                : appointmentTimeMinute
            }`;
            return formattedTime === time;
          }) && !patientBookedTimes.includes(time)
      )
    : allTimeSlots.filter((time) => !patientBookedTimes.includes(time));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Select Date & Time
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendar Section */}
        <div className="md:w-1/2">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Choose a Date</h3>
          <Calendar
            mode="single"
            className="rounded-md border"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => {
              const today = new Date();
              const futureDate = new Date();
              const yesterday = new Date();
              yesterday.setDate(today.getDate() - 1);
              futureDate.setDate(today.getDate() + 14);
              return (
                date < yesterday ||
                date > futureDate ||
                date.getDay() === 0 ||
                date.getDay() === 6
              );
            }}
          />
          <p className="text-xs text-gray-500 mt-2">
            * Only weekdays within the next 2 weeks are available.
          </p>
        </div>

        {/* Time Slots Section */}
        <div className="md:w-1/2">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Choose a Time</h3>
          {appointmentsLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="animate-spin h-6 w-6 text-emerald-500" />
              <span className="ml-2 text-emerald-700">Loading available times...</span>
            </div>
          ) : selectedDate ? (
            availableTimeSlots.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {allTimeSlots.map((time) => {
                  const isAvailable = availableTimeSlots.includes(time);
                  return (
                    <button
                      key={time}
                      onClick={() => isAvailable && setSelectedTime(time)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition
                        ${
                          selectedTime === time
                            ? "bg-emerald-600 text-white border-emerald-600 shadow cursor-default"
                            : isAvailable
                            ? "bg-white text-emerald-700 border-emerald-300 hover:bg-emerald-50 cursor-pointer"
                            : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        }
                      `}
                      disabled={!isAvailable || selectedTime === time}
                      aria-selected={selectedTime === time}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                No available time slots for this date.
              </div>
            )
          ) : (
            <div className="text-center text-gray-400 mt-8">
              Please select a date to see available times.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3;