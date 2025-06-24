import Layout from "@/components/layout/Layout";
import Sidebar from "@/components/profile/Sidebar";
import { getUserInfo } from "@/actions/user";
import { createClient } from "@/utils/supabase/server";

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let userInfo = null;
  if (user?.email) {
    userInfo = await getUserInfo(user.email);
  }
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar userInfo={userInfo} />

          <div className="lg:col-span-3 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
