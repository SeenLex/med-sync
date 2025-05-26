import React from "react";
import Image from "next/image";
import { User, Calendar, FileText, Shield, Camera } from "lucide-react";
import Card from "@/components/ui/Card";
import defaultProfilePic from "@/assets/profile.jpg";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getUserInfo } from "@/actions/user";

const links = [
  { href: "/profile", icon: <User />, label: "Personal Information" },
  { href: "/profile/appointments", icon: <Calendar />, label: "Appointments" },
  { href: "/profile/records", icon: <FileText />, label: "Medical Records" },
  { href: "/profile/security", icon: <Shield />, label: "Security" },
];

const Sidebar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) {
    return <div>Please log in to view your profile.</div>;
  }
  const userInfo = await getUserInfo(user.email);

  return (
    <div className="space-y-6 lg:col-span-1">
      <Card className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={userInfo.profileImage || defaultProfilePic}
              alt={userInfo.fullName}
              width={128}
              height={128}
              className="h-32 w-32 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {userInfo.fullName}
          </h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>
      </Card>

      <Card className="p-4">
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="w-full  flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              {link.icon}
              <span className="ml-2">{link.label}</span>
            </Link>
          ))}
        </nav>
      </Card>
    </div>
  );
};

export default Sidebar;
