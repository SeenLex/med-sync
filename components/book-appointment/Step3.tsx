import React from "react";
import { Calendar } from "@/components/shadcn/calendar";

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
}

const Step3: React.FC<Step3Props> = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  appointmentsLoading,
  appointments,
}) => {
  const allTimeSlots = [];
  for (let startingHour = 9; startingHour <= 17; startingHour++) {
    allTimeSlots.push(`${startingHour}:00`);
    if (startingHour < 17) {
      allTimeSlots.push(`${startingHour}:30`);
    }
  }

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
            const formattedTime = `${appointmentTimeHour}:${
              appointmentTimeMinute < 10
                ? "0" + appointmentTimeMinute
                : appointmentTimeMinute
            }`;
            return formattedTime === time;
          })
      )
    : allTimeSlots;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Select Date and Time
      </h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-900">
            Select Time
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {selectedDate &&
              !appointmentsLoading &&
              availableTimeSlots.map((time) => (
                <div
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`border rounded-md py-2 px-1 text-center cursor-pointer transition-all ${
                    selectedTime === time
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50 text-gray-400"
                  }`}
                >
                  <div className="text-sm font-medium">{time}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;