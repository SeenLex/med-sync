
import { fetchMedicalRecords } from '@/actions/medical-records';
import { createClient } from '@/utils/supabase/server';
import React from 'react';
import MedicalRecords from '@/components/medical-records/MedicalRecords';
import { getUserInfo } from '@/actions/user';



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
      const medicalRecords = await fetchMedicalRecords(patientId);
      if (!medicalRecords || medicalRecords.length === 0) {
          return <div>No medical records found.</div>;
      }

  return <MedicalRecords medicalRecords={medicalRecords} />;
};

export default MedicalRecordsPage;
