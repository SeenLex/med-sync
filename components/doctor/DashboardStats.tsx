import React, { useState, useEffect } from "react";
import { Calendar, Users, Clock, CheckCircle } from "lucide-react";
import Card from "../ui/Card";

interface DashboardStatsProps {
  doctorId: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ doctorId }) => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    hoursWorked: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats({
          totalPatients: 147,
          upcomingAppointments: 23,
          completedAppointments: 1254,
          hoursWorked: 2160,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [doctorId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Patients</p>
            <p className="text-3xl font-bold mt-1">{stats.totalPatients}</p>
            <p className="text-sm text-green-600 mt-2">+5% from last month</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Upcoming Appointments</p>
            <p className="text-3xl font-bold mt-1">{stats.upcomingAppointments}</p>
            <p className="text-sm text-gray-500 mt-2">Next: Today at 2:30 PM</p>
          </div>
          <div className="p-3 bg-green-100 rounded-full">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Completed Appointments</p>
            <p className="text-3xl font-bold mt-1">{stats.completedAppointments}</p>
            <p className="text-sm text-gray-500 mt-2">All time</p>
          </div>
          <div className="p-3 bg-purple-100 rounded-full">
            <CheckCircle className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Hours Worked</p>
            <p className="text-3xl font-bold mt-1">{stats.hoursWorked}</p>
            <p className="text-sm text-gray-500 mt-2">All time</p>
          </div>
          <div className="p-3 bg-amber-100 rounded-full">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;
