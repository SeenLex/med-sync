'use client';

import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Sidebar, { UserInfo } from "@/components/profile/Sidebar";
import AppointmentsTab, { Appointment } from "@/components/profile/AppointmentsTab";
import RecordsTab, { Record } from "@/components/profile/RecordsTab";
import ProfileTab, { EditVals, UserFull } from "@/components/profile/ProfileTab";
import SecurityTab from "@/components/profile/SecurityTab";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [user, setUser] = useState<UserFull>({
    id: "1",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-05-15",
    gender: "Male",
    address: "123 Main St, Anytown, CA 94123",
    profileImage: "https://randomuser.me/api/portraits/men/44.jpg",
    insuranceInfo: "HealthPlus Insurance, Policy #12345678",
    emergencyContact: "Jane Doe, +1 (555) 987-6543 (Spouse)",
  });

  const sidebarUser: UserInfo = {
    profileImage: user.profileImage,
    fullName: user.fullName,
    email: user.email,
  };

  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<EditVals>({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  useEffect(() => {
    setFormattedDate(new Date(user.dateOfBirth).toLocaleDateString());
  }, [user.dateOfBirth]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditValues({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
    setIsEditing(false);
  };
  const handleSave = () => {
    setUser({ ...user, ...editValues });
    setIsEditing(false);
  };

  const appointments: Appointment[] = [
    /* same data as before */
  ];
  const [apptPage, setApptPage] = useState(1);

  const medicalRecords: Record[] = [
    /* same data as before */
  ];
  const [recPage, setRecPage] = useState(1);

  const getRecordTypeInfo = (type: string) => {
    switch (type) {
      case "LAB_RESULT":
        return { label: "Lab Result", color: "bg-blue-100 text-blue-800" };
      case "PRESCRIPTION":
        return { label: "Prescription", color: "bg-purple-100 text-purple-800" };
      case "VISIT_SUMMARY":
        return { label: "Visit Summary", color: "bg-emerald-100 text-emerald-800" };
      case "MEDICAL_HISTORY":
        return { label: "Medical History", color: "bg-amber-100 text-amber-800" };
      default:
        return { label: "Other", color: "bg-gray-100 text-gray-800" };
    }
  };

  const [showCurr, setShowCurr] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

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
          <Sidebar
            user={sidebarUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="lg:col-span-3 space-y-6">
            {activeTab === "profile" && (
              <ProfileTab
                user={user}
                formattedDate={formattedDate}
                isEditing={isEditing}
                editValues={editValues}
                setEditValues={setEditValues}
                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            )}
            {activeTab === "appointments" && (
              <AppointmentsTab
                all={appointments}
                page={apptPage}
                setPage={setApptPage}
              />
            )}
            {activeTab === "records" && (
              <RecordsTab
                all={medicalRecords}
                page={recPage}
                setPage={setRecPage}
                getTypeInfo={getRecordTypeInfo}
              />
            )}
            {activeTab === "security" && (
              <SecurityTab
                showCurr={showCurr}
                showNew={showNew}
                showConf={showConf}
                setShowCurr={setShowCurr}
                setShowNew={setShowNew}
                setShowConf={setShowConf}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
