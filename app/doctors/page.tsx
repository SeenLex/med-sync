import { getAllDoctors } from '@/actions/user';
import FindDoctor from '@/app/doctors/FindDoctors';
import { createClient } from '@/utils/supabase/server';
import React from 'react';

const FindDoctorsPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return <div>Please log in to view your profile.</div>;
  }

  const doctors = await getAllDoctors();

  return <FindDoctor doctors={doctors} />;
};

export default FindDoctorsPage;
