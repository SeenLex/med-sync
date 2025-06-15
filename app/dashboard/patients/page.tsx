import Card from "@/components/ui/Card";
import { MyPatientsList } from "@/components/doctors/DoctorDashboard";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";

const PatientsPage = async () => {
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

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Patients</h1>
      </div>
      <Card className="p-6">
        <MyPatientsList doctorId={userInfo.doctor.id} />
      </Card>
    </>
  );
};

export default PatientsPage; 