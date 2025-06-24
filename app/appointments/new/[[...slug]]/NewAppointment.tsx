"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  bookAppointment,
  fetchDoctorAppointmentsForDate,
} from "@/actions/appointments";
import { UserInfo, type FindDoctor } from "@/actions/user";
import Steps from "@/components/book-appointment/Steps";
import Step1 from "@/components/book-appointment/Step1";
import Step2 from "@/components/book-appointment/Step2";
import Step3 from "@/components/book-appointment/Step3";
import Step4 from "@/components/book-appointment/Step4";
import NavigationButtons from "@/components/book-appointment/NavigationButtons";
import { useRouter } from "next/navigation";

type Props = {
  userInfo: UserInfo;
  doctors: FindDoctor;
  doctorToReschedule: FindDoctor[number] | null;
  initialType: "IN_PERSON" | "VIRTUAL" | null;
  specialties: string[];
};

const NewAppointment: React.FC<Props> = ({
  userInfo,
  doctors: initialDoctors,
  doctorToReschedule,
  initialType,
  specialties,
}) => {
  const router = useRouter();
  const [step, setStep] = useState(doctorToReschedule ? 3 : 1);
  const [appointmentType, setAppointmentType] = useState(initialType);
  const [selectedDoctor, setSelectedDoctor] = useState(doctorToReschedule);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [notes, setNotes] = useState<string>("");

  const specialtiesList = specialties;

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: [
      "fetchDoctorAppointmentsForDate",
      selectedDoctor?.doctor?.id,
      selectedDate,
    ],
    queryFn: () => {
      if (!selectedDoctor?.doctor?.id || !selectedDate) {
        return Promise.resolve([]);
      }
      return fetchDoctorAppointmentsForDate(
        String(selectedDoctor.doctor.id),
        selectedDate
      );
    },
    enabled: !!selectedDoctor?.doctor?.id && !!selectedDate,
  });

  const submitAppointment = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      alert("Appointment booked successfully!");
      router.push("/");
      setStep(1);
      setAppointmentType(null);
      setSelectedDoctor(null);
      setSelectedDate(undefined);
      setSelectedTime(null);
      setSearchQuery("");
      setSpecialty("");
      setNotes("");
    },
    onError: (error: Error) => {
      console.error("Booking error:", error);
      alert(
        "Failed to book appointment: " +
          (error.message || "An unknown error occurred.")
      );
    },
  });

  const handleNextStep = () => {
    if (step === 1 && appointmentType) {
      setStep(2);
    } else if (step === 2 && selectedDoctor) {
      if (!selectedDoctor.doctor) {
        alert(
          "The selected user is not fully registered as a doctor. Please choose another."
        );
        return;
      }
      setStep(3);
    } else if (step === 3 && selectedDate && selectedTime) {
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      if (step === 3 && doctorToReschedule) {
        setStep(1);
        setSelectedDoctor(null);
        setAppointmentType(null);
      } else {
        setStep(step - 1);
      }
    }
  };

  const getCanProceed = () => {
    switch (step) {
      case 1:
        return !!appointmentType;
      case 2:
        return !!selectedDoctor && !!selectedDoctor.doctor;
      case 3:
        return !!selectedDate && !!selectedTime;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const stepLabels = [
    "Appointment Type",
    "Select Doctor",
    "Date & Time",
    "Confirm",
  ];

  function handleSubmit() {
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedDoctor ||
      !selectedDoctor.doctor ||
      !appointmentType ||
      !userInfo.patient?.id
    ) {
      alert(
        "Please ensure all appointment details are complete before submitting."
      );
      return;
    }

    const newStartDate = new Date(selectedDate);
    const [hours, minutes] = selectedTime.split(":").map(Number);
    newStartDate.setHours(hours, minutes, 0, 0);

    const newEndDate = new Date(newStartDate);
    newEndDate.setMinutes(newStartDate.getMinutes() + 30);

    const input = {
      patientId: userInfo.patient.id,
      doctorId: selectedDoctor.doctor.id,
      startTime: newStartDate,
      endTime: newEndDate,
      type: appointmentType,
      notes: notes || null,
    };

    submitAppointment.mutate(input);
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {doctorToReschedule ? "Reschedule Appointment" : "Book an Appointment"}
        </h1>

        <Steps step={step} stepLabels={stepLabels} />

        <Card className="w-full p-4 sm:p-6">
          {step === 1 && (
            <Step1
              appointmentType={appointmentType}
              setAppointmentType={setAppointmentType}
            />
          )}

          {step === 2 && (
            <Step2
              doctors={initialDoctors}
              specialties={specialtiesList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              specialty={specialty}
              setSpecialty={setSpecialty}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              appointmentType={appointmentType}
            />
          )}

          {step === 3 &&
            selectedDoctor && (
              <Step3
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                appointmentsLoading={appointmentsLoading}
                appointments={appointments || []}
              />
            )}

          {step === 4 && (
            <Step4
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              appointmentType={appointmentType}
              notes={notes}
              setNotes={setNotes}
            />
          )}

          <NavigationButtons
            step={step}
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
            handleSubmit={handleSubmit}
            canProceed={getCanProceed()}
          />
        </Card>
      </div>
    </Layout>
  );
};

export default NewAppointment;