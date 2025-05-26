import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import ProfileTab from "@/components/profile/ProfileTab";

const ProfilePage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return <div>Please log in to view your profile.</div>;
  }
  const userInfo = await getUserInfo(user.email);
  return <ProfileTab userInfo={userInfo} />;
};

export default ProfilePage;
