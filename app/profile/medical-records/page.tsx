import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { fetchPaginatedMedicalRecords } from "@/actions/medical-records";
import MedicalRecords from "@/components/profile/MedicalRecordsTab";

const MedicalRecordsPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return <div>Please log in to view your profile.</div>;
  }

  const userInfo = await getUserInfo(user.email);
  const patientId = userInfo.patient?.id;
  if (!patientId) {
    return <div>No patient information found.</div>;
  }

  const initialData = await fetchPaginatedMedicalRecords({
    patientId,
    page: 1,
  });

  if (!initialData.medicalRecords || initialData.medicalRecords.length === 0) {
    return (
      <div className="flex justify-center pt-16 text-gray-700 text-xl">
        No medical records found.
      </div>
    );
  }

  return <MedicalRecords initialData={initialData} patientId={patientId} />;
};

export default MedicalRecordsPage;