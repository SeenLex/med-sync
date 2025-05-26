import { Bell } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Sidebar from "@/components/profile/Sidebar";


export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <Button variant="outline" className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar />

          <div className="lg:col-span-3 space-y-6">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
