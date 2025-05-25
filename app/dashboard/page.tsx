'use client';

import React, { useState, useEffect } from "react";
import DashboardStats from "@/components/doctor/DashboardStats";
import UpcomingAppointments from "@/components/doctor/UpcomingAppointments";
import RecentPatients from "@/components/doctor/RecentPatients";
import DoctorSchedule from "@/components/doctor/DoctorSchedule";
import Card from "@/components/ui/Card";
import { Doctor } from "@/types";
import { Calendar, Users, Clock, FileText } from "lucide-react";
import Layout from "@/components/layout/Layout";

const DoctorDashboard: React.FC = () => {
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  
  // Fetch doctor data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchDoctorData = async () => {
      setIsLoading(true);
      try {
        // Mock data for demonstration
        const mockDoctor: Doctor = {
          id: "doctor-123",
          userId: "user-123",
          user: {
            id: "user-123",
            email: "dr.smith@example.com",
            fullName: "Dr. Sarah Smith",
            role: "DOCTOR",
            phone: "+1 (555) 123-4567",
            createdAt: new Date("2020-01-01"),
            updatedAt: new Date("2022-01-01"),
          },
          specialization: "Cardiologist",
          licenseNumber: "MED12345",
          biography: "Board-certified cardiologist with over 10 years of experience.",
        };
        
        setDoctorData(mockDoctor);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDoctorData();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!doctorData) {
    return <div>Error loading doctor data</div>;
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "appointments":
        return (
          <Card className="p-6">
            <UpcomingAppointments doctorId={doctorData.id} />
          </Card>
        );
      case "patients":
        return (
          <Card className="p-6">
            <RecentPatients doctorId={doctorData.id} />
          </Card>
        );
      case "schedule":
        return (
          <Card className="p-6">
            <DoctorSchedule doctorId={doctorData.id} />
          </Card>
        );
      case "records":
        return (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Medical Records</h2>
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
            <h2 className="text-xl font-semibold">{doctorData.user.fullName}</h2>
            <p className="text-gray-500">{doctorData.specialization}</p>
          </div>
        </div>

        <DashboardStats doctorId={doctorData.id} />

        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex items-center gap-2 py-4 px-6 font-medium text-sm ${
                  activeTab === "appointments"
                    ? "border-b-2 border-emerald-500 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Appointments
              </button>
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
          
          <div className="mt-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
