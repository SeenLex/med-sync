// app/dashboard/appointments/new/page.tsx (or wherever NewAppointment is located)
"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  bookAppointment,
  fetchDoctorAppointmentsForDate,
} from "@/actions/appointments";
import { UserInfo, type FindDoctor } from "@/actions/user"; // Assuming FindDoctor is User[]
import Steps from "@/components/book-appointment/Steps";
import Step1 from "@/components/book-appointment/Step1";
import Step2 from "@/components/book-appointment/Step2";
import Step3 from "@/components/book-appointment/Step3";
import Step4 from "@/components/book-appointment/Step4";
import NavigationButtons from "@/components/book-appointment/NavigationButtons";
// import { useRouter } from "next/navigation"; // If you want to redirect after booking

type Props = {
  userInfo: UserInfo; // Assuming UserInfo contains patient details
  doctors: FindDoctor; // This is the array of User objects who are doctors
};

const NewAppointment: React.FC<Props> = ({
  userInfo,
  doctors: initialDoctors,
}) => {
  // const router = useRouter();
  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState<
    "IN_PERSON" | "VIRTUAL" | null
  >(null);
  const [selectedDoctor, setSelectedDoctor] = useState<
    FindDoctor[number] | null
  >(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");

  // This could be derived or passed if specialties are dynamic
  const specialtiesList = [
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Psychiatrist",
    "Ophthalmologist",
    "Pediatrician",
    "Orthopedist",
    "Gynecologist",
    "Urologist",
    "Endocrinologist",
  ];

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: [
      "fetchDoctorAppointmentsForDate",
      selectedDoctor?.doctor?.id, // Use the actual Doctor ID
      selectedDate,
    ],
    queryFn: () => {
      if (!selectedDoctor?.doctor?.id || !selectedDate) {
        // This should ideally not be reached if 'enabled' is working correctly
        return Promise.resolve([]); // Or reject, depending on desired behavior
      }
      return fetchDoctorAppointmentsForDate(
        String(selectedDoctor.doctor.id), // Pass the actual Doctor ID
        selectedDate
      );
    },
    enabled: !!selectedDoctor?.doctor?.id && !!selectedDate, // Query only if doctor's specific ID and date are selected
  });

  const submitAppointment = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      alert("Appointment booked successfully!");
      // Optionally reset state or redirect
      // router.push("/dashboard/appointments");
      setStep(1);
      setAppointmentType(null);
      setSelectedDoctor(null);
      setSelectedDate(undefined);
      setSelectedTime(null);
      setSearchQuery("");
      setSpecialty("");
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
      // Ensure the selected doctor actually has a doctor profile if that's a requirement
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
      setStep(step - 1);
    }
  };

  const getCanProceed = () => {
    switch (step) {
      case 1:
        return !!appointmentType;
      case 2:
        return !!selectedDoctor && !!selectedDoctor.doctor; // Ensure doctor profile exists
      case 3:
        return !!selectedDate && !!selectedTime;
      case 4: // For step 4, canProceed is true as it's the confirmation step
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
      !selectedDoctor.doctor || // Crucial check for the Doctor's specific ID
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
    newStartDate.setHours(hours, minutes, 0, 0); // Set seconds and ms to 0

    const newEndDate = new Date(newStartDate);
    newEndDate.setMinutes(newStartDate.getMinutes() + 30); // Assuming 30 min appointments

    const input = {
      patientId: userInfo.patient.id, // Assumes userInfo.patient.id is valid
      doctorId: selectedDoctor.doctor.id, // Use the ID from the nested doctor object
      startTime: newStartDate,
      endTime: newEndDate,
      type: appointmentType,
      // reason: "User provided reason" // If you add a reason field in Step4
    };

    submitAppointment.mutate(input);
  }

  // Filter doctors based on appointmentType if your doctor data includes availability
  // This is a simplified example; you might need more robust filtering
  // const availableDoctorsForType = initialDoctors.filter(doc => {
  //   if (!appointmentType) return true; // Show all if no type selected yet (or handle in Step 2)
  //   // Assuming `doc.doctor.availableFor` or similar field exists
  //   return doc.doctor?.availableFor?.includes(appointmentType);
  // });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Book an Appointment
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
              doctors={initialDoctors} // Pass the initial list, Step2 will filter
              specialities={specialtiesList}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              specialty={specialty}
              setSpecialty={setSpecialty}
              selectedDoctor={selectedDoctor}
              setSelectedDoctor={setSelectedDoctor}
              appointmentType={appointmentType} // Pass for display or further filtering in Step2
            />
          )}

          {step === 3 &&
            selectedDoctor && ( // Ensure selectedDoctor exists for Step3
              <Step3
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedTime={selectedTime}
                setSelectedTime={setSelectedTime}
                appointmentsLoading={appointmentsLoading}
                appointments={appointments || []} // Pass empty array if appointments is undefined
              />
            )}

          {step === 4 && (
            <Step4
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              appointmentType={appointmentType}
              // Pass reason if you add a state for it
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
