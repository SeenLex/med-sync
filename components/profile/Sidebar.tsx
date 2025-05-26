import React from "react";
import Image from "next/image";
import { User, Calendar, FileText, Shield, Camera } from "lucide-react";
import Card from "@/components/ui/Card";

export type UserInfo = {
  profileImage: string;
  fullName: string;
  email: string;
};

type SidebarProps = {
  user: UserInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabs = [
  { key: "profile", icon: <User />, label: "Personal Information" },
  { key: "appointments", icon: <Calendar />, label: "Appointments" },
  { key: "records", icon: <FileText />, label: "Medical Records" },
  { key: "security", icon: <Shield />, label: "Security" },
];

const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  setActiveTab,
}) => (
  <div className="space-y-6 lg:col-span-1">
    <Card className="p-6">
      <div className="flex flex-col items-center">
        <div className="relative">
          <Image
            src={user.profileImage}
            alt={user.fullName}
            width={128}
            height={128}
            className="h-32 w-32 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {user.fullName}
        </h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </Card>

    <Card className="p-4">
      <nav className="space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === tab.key
                ? "bg-emerald-100 text-emerald-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab.icon}
            <span className="ml-2">{tab.label}</span>
          </button>
        ))}
      </nav>
    </Card>
  </div>
);

export default Sidebar;
