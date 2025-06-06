"use client";

import React, { useState } from "react";
import DashboardStats from "@/components/doctor-dashboard/DashboardStats";
import DoctorSchedule from "@/components/doctor-dashboard/DoctorSchedule";
import Card from "@/components/ui/Card";
import {
  Calendar,
  Users,
  Clock,
  FileText,
  Bell,
  User,
  Mail,
  Phone,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import PendingAppointmentsList from "@/components/doctor-dashboard/PendingAppointmentsList";
import { type UserInfo } from "@/actions/user";
import AllDoctorAppointmentsList from "@/components/doctor-dashboard/AllDoctorAppointments";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctorPatients, type DoctorPatient } from "@/actions/patients";
import { MEDICAL_RECORDS_PAGE_SIZE } from "@/lib/constants";
import PaginationControls from "@/components/ui/PaginationControls";
import Button from "@/components/ui/Button";
import Link from "next/link";

type MyPatientsListProps = {
  doctorId: number;
};

const MyPatientsList: React.FC<MyPatientsListProps> = ({ doctorId }) => {
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
      <h2 className="text-xl font-semibold text-gray-900">My Patients</h2>
      {isFetching && <div className="text-center p-2">Loading...</div>}
      <div className={`space-y-4 ${isFetching ? "opacity-50" : ""}`}>
        {patients.length > 0 ? (
          patients.map((patient: DoctorPatient) => (
            <Card key={patient.id} className="p-4">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 p-3 rounded-full">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
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
                  <Link href={`/patients/${patient.id}/records`}>
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
  // Default to the new "Pending" tab
  const [activeTab, setActiveTab] = useState("pending-appointments");

  const { doctor } = userInfo;

  if (!doctor) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          Error: Doctor profile data is missing.
        </div>
      </Layout>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "pending-appointments": // This is the new actionable tab
        return (
          <Card className="p-6">
            <PendingAppointmentsList doctorId={doctor.id} />
          </Card>
        );
      case "all-appointments": // This is the new historical view
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
      case "schedule":
        return (
          <Card className="p-6">
            <DoctorSchedule doctorId={doctor.id.toString()} />
          </Card>
        );
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <div className="text-right">
            <h2 className="text-xl font-semibold">{userInfo.fullName}</h2>
            <p className="text-gray-500">{doctor.specialization}</p>
          </div>
        </div>

        <DashboardStats doctorId={doctor.id.toString()} />

        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px flex-wrap">
              {/* New "Pending Appointments" Tab */}
              <button
                onClick={() => setActiveTab("pending-appointments")}
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm ${
                  activeTab === "pending-appointments"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Bell className="h-4 w-4" />
                Pending Requests
              </button>

              {/* New "All Appointments" Tab */}
              <button
                onClick={() => setActiveTab("all-appointments")}
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm ${
                  activeTab === "all-appointments"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Calendar className="h-4 w-4" />
                All Appointments
              </button>

              {/* Other existing tabs */}
              <button
                onClick={() => setActiveTab("patients")}
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm ${
                  activeTab === "patients"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Users className="h-4 w-4" />
                My Patients
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm ${
                  activeTab === "schedule"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Clock className="h-4 w-4" />
                Schedule
              </button>
              <button
                onClick={() => setActiveTab("records")}
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm ${
                  activeTab === "records"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="h-4 w-4" />
                Medical Records
              </button>
            </nav>
          </div>

          <div className="mt-6">{renderTabContent()}</div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;