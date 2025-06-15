import { getPatient } from "@/actions/patients";
import PatientRecords from "./PatientRecords";
import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "@/actions/user";

export default async function PatientRecordsPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return null;
  }

  const userInfo = await getUserInfo(user.email);

  if (!userInfo.doctor) {
    return null;
  }

    const patient = await getPatient(parseInt(id));

    if (!patient) {
        return <div>Patient not found</div>;
    }


    const medicalRecords = patient.medicalRecords;

    return <PatientRecords doctor={userInfo.doctor} patient={patient} medicalRecords={medicalRecords} />;
}