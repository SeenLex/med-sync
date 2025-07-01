"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import {
  Calendar,
  Users,
  FileText,
  Bell,
  Mail,
  Phone,
  MessageSquare,
  UserCircle,
} from "lucide-react";
import Layout from "@/components/layout/DoctorLayout";
import PendingAppointmentsList from "@/components/doctor-dashboard/PendingAppointmentsList";
import { type UserInfo } from "@/actions/user";
import AllDoctorAppointmentsList from "@/components/doctor-dashboard/AllDoctorAppointments";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorPatients, type DoctorPatient } from "@/actions/patients";
import { MEDICAL_RECORDS_PAGE_SIZE } from "@/lib/constants";
import PaginationControls from "@/components/ui/PaginationControls";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Sidebar from "@/components/doctor-dashboard/Sidebar";
import DoctorProfile from "@/components/doctor-dashboard/DoctorProfile";
import { useRouter } from "next/navigation";
import Image from "next/image";
import defaultProfilePic from "@/assets/profile.jpg";

type MyPatientsListProps = {
  doctorId: number;
};

export const MyPatientsList: React.FC<MyPatientsListProps> = ({ doctorId }) => {
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["doctor-patients", doctorId, page],
    queryFn: () => fetchDoctorPatients({ doctorId, page }),
    placeholderData: (previousData) => previousData,
  });

  const patients = data?.patients || [];
  const totalPages = Math.ceil(
    (data?.totalCount || 0) / MEDICAL_RECORDS_PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
        {patients.length > 0 ? (
          patients.map((patient: DoctorPatient) => (
            <Card key={patient.id} className="p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={patient.user.profileImage || defaultProfilePic}
                    alt={patient.user.fullName}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                    unoptimized
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {patient.user.fullName}
                    </p>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <Mail className="h-4 w-4 mr-2" />
                      {patient.user.email}
                    </div>
                    {patient.user.phone && (
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-2" />
                        {patient.user.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                  <Link href={`/dashboard/patients/${patient.id}`}>
                    <Button size="sm" variant="outline">
                      View Records
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">You have no patients yet.</p>
        )}
      </div>
      {totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

type Props = {
  userInfo: UserInfo;
};

const DoctorDashboard: React.FC<Props> = ({ userInfo }) => {
  const [activeTab, setActiveTab] = useState("patients");
  const { doctor } = userInfo;
  const router = useRouter();

  if (!doctor) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          Error: Doctor profile data is missing.
        </div>
      </Layout>
    );
  }

  const navItems = [
    {
      id: "pending-appointments",
      label: "Pending Appointments",
      icon: Bell,
    },
    {
      id: "all-appointments",
      label: "All Appointments",
      icon: Calendar,
    },
    { id: "patients", label: "My Patients", icon: Users },
    {
      id: "records",
      label: "Medical Records",
      icon: FileText,
    },
    {
      id: "profile",
      label: "Profile",
      icon: UserCircle,
    },
    {
      id: "messages",
      label: "My Messages",
      icon: MessageSquare,
    },
  ];

  const handleTabChange = (id: string) => {
    if (id === "messages") {
      router.push("/messages");
      return;
    }
    setActiveTab(id);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "pending-appointments":
        return (
          <Card className="p-6">
            <PendingAppointmentsList doctorId={doctor.id} />
          </Card>
        );
      case "all-appointments":
        return (
          <Card className="p-6">
            <AllDoctorAppointmentsList doctorId={doctor.id} />
          </Card>
        );
      case "patients":
        return (
          <Card className="p-6">
            <MyPatientsList doctorId={doctor.id} />
          </Card>
        );
      case "profile":
        return <DoctorProfile userInfo={userInfo} />;
      case "records":
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recent Medical Records
            </h2>
            <p className="text-gray-500">Coming soon...</p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <Sidebar
            navItems={navItems}
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />

          <main className="flex-1">{renderTabContent()}</main>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;