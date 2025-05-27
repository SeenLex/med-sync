import { fetchMedicalRecords } from '@/actions/medical-records';
import { getUserInfo } from '@/actions/user';
import MedicalRecords from '@/components/profile/MedicalRecordsTab';
import { createClient } from '@/utils/supabase/server';
import React from 'react'

const page = async () => {
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
    return <MedicalRecords all={medicalRecords} page={1} setPage={() => {}} getTypeInfo={() => ({ label: '', color: '' })}/>;
}

export default page