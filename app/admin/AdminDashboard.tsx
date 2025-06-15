'use client';
import React, { useState, useEffect, useMemo } from "react";
import {
  Users as UsersIcon,
  User as UserIcon,
  Calendar as CalendarIcon,
  Shield as ShieldIcon,
  Search as SearchIcon,
  Trash2 as TrashIcon,
  Loader2,
  CalendarIcon as CalendarLucide,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { format, parseISO, startOfDay, differenceInDays, subMonths, isBefore, isAfter, subYears } from 'date-fns';
import Button from "@/components/ui/Button";
import Layout from "@/components/layout/Layout";
import { User } from "@/prisma/generated/prisma";
import { deleteUser } from "@/actions/user";
import { Stats as StatsType } from "@/actions/stats";
import { Appointment } from "@/prisma/generated/prisma";
import { Calendar } from "@/components/shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { cn } from "@/lib/utils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type RoleFilter = "ALL" | "DOCTOR" | "PATIENT" | "ADMIN";

const ROLES: RoleFilter[] = ["ALL", "DOCTOR", "PATIENT", "ADMIN"];

type PeriodOption = 'last_year' | 'last_2_years' | 'all_time' | 'custom';

const AdminDashboard: React.FC<{ allUsers: User[], stats: StatsType, appointments: Appointment[] }> = ({ allUsers, stats, appointments }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>('last_year');
  const [customStartDate, setCustomStartDate] = useState<string>('');
  const [customEndDate, setCustomEndDate] = useState<string>('');

  // Get date range based on selected period
  const getDateRange = useMemo(() => {
    const today = new Date();
    
    switch (selectedPeriod) {
      case 'last_year':
        return {
          start: subMonths(today, 11),
          end: today
        };
      case 'last_2_years':
        return {
          start: subYears(today, 2),
          end: today
        };
      case 'all_time':
        if (appointments.length === 0) return { start: today, end: today };
        const sortedAppointments = [...appointments].sort((a, b) => 
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        );
        return {
          start: new Date(sortedAppointments[0].startTime),
          end: today
        };
      case 'custom':
        return {
          start: customStartDate ? new Date(customStartDate) : subMonths(today, 11),
          end: customEndDate ? new Date(customEndDate) : today
        };
      default:
        return {
          start: subMonths(today, 11),
          end: today
        };
    }
  }, [selectedPeriod, customStartDate, customEndDate, appointments]);

  // Process appointments data for the chart
  const chartData = useMemo(() => {
    if (!appointments || appointments.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: 'Appointments per Month',
          data: [],
          backgroundColor: 'rgb(16, 185, 129)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
          borderRadius: 5,
        }]
      };
    }

    const { start, end } = getDateRange;
    
    // Generate all months in the range
    const months: string[] = [];
    const currentDate = new Date(start);
    
    while (!isAfter(currentDate, end)) {
      months.push(format(currentDate, 'yyyy-MM'));
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    // Filter and group appointments by month for the selected period
    const appointmentsByMonth = appointments.reduce((acc, appointment) => {
      const appointmentDate = new Date(appointment.startTime);
      if (!isBefore(appointmentDate, start) && !isAfter(appointmentDate, end)) {
        const monthKey = format(appointmentDate, 'yyyy-MM');
        acc[monthKey] = (acc[monthKey] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const labels = months.map(month => format(parseISO(month + '-01'), 'MMM yyyy'));
    const data = months.map(month => appointmentsByMonth[month] || 0);

    return {
      labels,
      datasets: [{
        label: 'Appointments per Month',
        data,
        backgroundColor: 'rgb(16, 185, 129)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
        borderRadius: 5,
      }]
    };
  }, [appointments, getDateRange]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Appointments (Last 12 Months)',
        font: {
          size: 16,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Appointments',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
    barThickness: 'flex',
  };

  const filtered = allUsers
    .filter((u) => {
      const q = searchQuery.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    })
    .filter((u) => roleFilter === "ALL" || u.role === roleFilter);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    setIsDeleting(true);
    await deleteUser(id, true, "/admin");
    setIsDeleting(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <ShieldIcon className="h-5 w-5 text-emerald-500" />,
              label: "Total Users",
              value: stats.users,
            },
            {
              icon: <UserIcon className="h-5 w-5 text-emerald-500" />,
              label: "Total Patients",
              value: stats.patients,
            },
            {
              icon: <UsersIcon className="h-5 w-5 text-emerald-500" />,
              label: "Total Doctors",
              value: stats.doctors,
            },
            {
              icon: <CalendarIcon className="h-5 w-5 text-emerald-500" />,
              label: "Appointments",
              value: stats.appointments,
            },
          ].map(({ icon, label, value }) => (
            <div
              key={label}
              className="relative bg-white p-6 rounded-lg shadow"
            >
              <div className="absolute top-4 right-4 bg-emerald-100 p-2 rounded-full">
                {icon}
              </div>
              <dt className="text-sm font-medium text-gray-500 uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {value}
              </dd>
            </div>
          ))}
        </div>

        {/* Appointments Chart */}
        <div className="bg-white shadow rounded-lg p-6 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Monthly Appointments
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as PeriodOption)}
              >
                <option value="last_year">Last Year</option>
                <option value="last_2_years">Last 2 Years</option>
                <option value="all_time">All Time</option>
                <option value="custom">Custom Range</option>
              </select>

              {selectedPeriod === 'custom' && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          !customStartDate && "text-muted-foreground"
                        )}
                      >
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <CalendarLucide className="h-4 w-4" />
                          {customStartDate ? format(new Date(customStartDate), 'PPP') : "Pick start date"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={customStartDate ? new Date(customStartDate) : undefined}
                        onSelect={(date) => {
                          date && setCustomStartDate(format(date, 'yyyy-MM-dd'));
                        }}
                        disabled={(date) => 
                          customEndDate ? isAfter(date, new Date(customEndDate)) : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className={cn(
                          "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          !customEndDate && "text-muted-foreground"
                        )}
                      >
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <CalendarLucide className="h-4 w-4" />
                          {customEndDate ? format(new Date(customEndDate), 'PPP') : "Pick end date"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={customEndDate ? new Date(customEndDate) : undefined}
                        onSelect={(date) => {
                          date && setCustomEndDate(format(date, 'yyyy-MM-dd'));
                        }}
                        disabled={(date) => 
                          customStartDate ? isBefore(date, new Date(customStartDate)) : false
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>
          </div>
          <div className="w-full h-[400px]">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-medium text-gray-900">
              Manage Users
            </h2>

            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    roleFilter === r
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {r === "ALL"
                    ? "All"
                    : r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-700
                           focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-[450px] divide-y divide-gray-300">
            <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 sticky top-0">
              <div className="text-xs font-medium text-gray-500 uppercase">
                Name
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase">
                Email
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase">
                Role
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase text-center">
                Actions
              </div>
            </div>

            {filtered.length > 0 ? (
              filtered.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 px-6 py-4 bg-white rounded-lg
                             hover:bg-gray-50"
                >
                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Name
                    </span>
                    <div className="text-sm text-gray-900 truncate">
                      {u.fullName}
                    </div>
                  </div>

                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Email
                    </span>
                    <div className="text-sm text-gray-500 truncate">
                      {u.email}
                    </div>
                  </div>

                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Role
                    </span>
                    <div className="text-sm text-gray-900">{u.role}</div>
                  </div>

                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </span>
                    <div className="mt-1 md:flex-row flex justify-start sm:justify-end gap-2 py-4">
                      <Button
                        variant="danger"
                        size="sm"
                        className="flex items-center text-red-600"
                        onClick={() => handleDelete(u.id.toString())}
                        disabled={isDeleting}
                      >
                        {isDeleting ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <TrashIcon className="h-4 w-4 mr-1" />} Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default AdminDashboard;
