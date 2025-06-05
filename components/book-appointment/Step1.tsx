import React from "react";
import { Video, MapPin } from "lucide-react";

interface Step1 {
  appointmentType: "IN_PERSON" | "VIRTUAL" | null;
  setAppointmentType: (type: "IN_PERSON" | "VIRTUAL" | null) => void;
}

const Step1: React.FC<Step1> = ({
  appointmentType,
  setAppointmentType,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Select Appointment Type
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => setAppointmentType("IN_PERSON")}
          className={`border rounded-lg p-6 cursor-pointer transition-all ${
            appointmentType === "IN_PERSON"
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center mb-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">
              In-Person Visit
            </h3>
          </div>
          <p className="text-gray-600">
            Visit the doctor at their office for a face-to-face consultation.
            Ideal for physical examinations and procedures.
          </p>
        </div>
        <div
          onClick={() => setAppointmentType("VIRTUAL")}
          className={`border rounded-lg p-6 cursor-pointer transition-all ${
            appointmentType === "VIRTUAL"
              ? "border-emerald-500 bg-emerald-50"
              : "border-gray-300 hover:border-emerald-300 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Video className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="ml-4 text-lg font-medium text-gray-900">
              Virtual Consultation
            </h3>
          </div>
          <p className="text-gray-600">
            Connect with the doctor through a secure video call from the comfort
            of your home. Ideal for follow-ups and consultations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step1;