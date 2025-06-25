import type { FindDoctor } from "@/actions/user";
import React from "react";
import Image from "next/image";
import { formatDateDDMMYYYY } from "@/lib/utils";

type Step4Props = {
  selectedDoctor: FindDoctor[number] | null;
  selectedDate: Date | undefined;
  selectedTime: string | null;
  appointmentType: "IN_PERSON" | "VIRTUAL" | null;
  notes: string;
  setNotes: (notes: string) => void;
};

const Step4: React.FC<Step4Props> = ({
  selectedDoctor,
  selectedDate,
  selectedTime,
  appointmentType,
  notes,
  setNotes,
}) => {
  if (!selectedDoctor || !selectedDate || !selectedTime || !appointmentType) {
    return (
      <div className="text-red-500">
        Error: Missing appointment details for confirmation.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-gray-900">
        Confirm Your Appointment
      </h2>
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <Image
            src={
              selectedDoctor.profileImage ||
              `https://randomuser.me/api/portraits/lego/${
                Number(selectedDoctor.id) % 10
              }.jpg`
            }
            alt={selectedDoctor.fullName}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover flex-shrink-0"
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {selectedDoctor.fullName}
            </h3>
            <p className="text-sm text-gray-500">
              {selectedDoctor.doctor?.specialization || "N/A"}
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-base text-gray-900">
                  {formatDateDDMMYYYY(selectedDate)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Time</p>
                <p className="text-base text-gray-900">{selectedTime}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Appointment Type
                </p>
                <p className="text-base text-gray-900">
                  {appointmentType === "IN_PERSON"
                    ? "In-Person Visit"
                    : "Virtual Consultation"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-gray-900">
          Reason for Visit
        </h3>
        <textarea
          className="w-full border rounded-md p-3 focus:outline-none border-gray-400 text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
          rows={3}
          placeholder="Briefly describe your symptoms or reason..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2V9a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              {appointmentType === "VIRTUAL"
                ? "You will receive a link to join the video consultation 15 minutes before your appointment time."
                : "Please arrive 15 minutes before your appointment time. The clinic address will be confirmed via email."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
