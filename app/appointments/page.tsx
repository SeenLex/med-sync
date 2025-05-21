'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Filter,
  Plus,
  Search,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";

const Appointments: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  // Mock data for appointments
  const appointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 15, 2025",
      time: "10:30 AM",
      type: "VIRTUAL",
      status: "CONFIRMED",
      location: null,
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "May 20, 2025",
      time: "2:15 PM",
      type: "IN_PERSON",
      status: "CONFIRMED",
      location: "Medical Center, Floor 3, Room 302",
    },
    {
      id: "3",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "April 28, 2025",
      time: "9:00 AM",
      type: "IN_PERSON",
      status: "COMPLETED",
      location: "Neurology Clinic, Floor 2, Room 215",
    },
    {
      id: "4",
      doctorName: "Dr. James Wilson",
      specialty: "Psychiatrist",
      date: "April 10, 2025",
      time: "3:30 PM",
      type: "VIRTUAL",
      status: "COMPLETED",
      location: null,
    },
    {
      id: "5",
      doctorName: "Dr. Lisa Thompson",
      specialty: "Ophthalmologist",
      date: "June 5, 2025",
      time: "11:45 AM",
      type: "IN_PERSON",
      status: "PENDING",
      location: "Eye Care Center, Floor 1, Room 105",
    },
    // ...add more appointments as needed
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "upcoming" &&
        ["CONFIRMED", "PENDING"].includes(appointment.status)) ||
      (filter === "completed" && appointment.status === "COMPLETED") ||
      (filter === "virtual" && appointment.type === "VIRTUAL") ||
      (filter === "in-person" && appointment.type === "IN_PERSON");

    const matchesSearch =
      searchQuery === "" ||
      appointment.doctorName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.specialty
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const pageSize = 5;
  const totalPages = Math.ceil(filteredAppointments.length / pageSize);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            My Appointments
          </h1>
          <Link href="/appointments/new">
            <Button className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Book New Appointment
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter by:
              </span>
              <div className="flex flex-wrap gap-2">
                {["all", "upcoming", "completed", "virtual", "in-person"].map(
                  (f) => (
                    <button
                      key={f}
                      className={`px-3 py-1 text-sm rounded-full ${
                        filter === f
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setFilter(f)}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="relative text-gray-800">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by doctor or specialty"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md 
                           focus:outline-none focus:ring-emerald-500 
                           focus:border-emerald-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {paginatedAppointments.length > 0 ? (
            paginatedAppointments.map((appointment) => (
              <Card
                key={appointment.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`p-2 rounded-full ${
                        appointment.type === "VIRTUAL"
                          ? "bg-blue-100"
                          : "bg-green-100"
                      }`}
                    >
                      {appointment.type === "VIRTUAL" ? (
                        <Video className="h-6 w-6 text-blue-600" />
                      ) : (
                        <MapPin className="h-6 w-6 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {appointment.doctorName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {appointment.specialty}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{appointment.time}</span>
                      </div>
                      {appointment.location && (
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{appointment.location}</span>
                        </div>
                      )}
                      <div className="mt-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full
                                     text-xs font-medium ${
                                       appointment.status === "CONFIRMED"
                                         ? "bg-green-100 text-green-800"
                                         : appointment.status === "PENDING"
                                         ? "bg-yellow-100 text-yellow-800"
                                         : "bg-gray-100 text-gray-800"
                                     }`}
                        >
                          {appointment.status === "CONFIRMED"
                            ? "Confirmed"
                            : appointment.status === "PENDING"
                            ? "Pending"
                            : "Completed"}
                        </span>
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5
                                     rounded-full text-xs font-medium ${
                                       appointment.type === "VIRTUAL"
                                         ? "bg-blue-100 text-blue-800"
                                         : "bg-emerald-100 text-emerald-800"
                                     }`}
                        >
                          {appointment.type === "VIRTUAL"
                            ? "Virtual"
                            : "In-Person"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    {appointment.status === "CONFIRMED" && (
                      <>
                        {appointment.type === "VIRTUAL" && (
                          <Button variant="primary" size="sm">
                            Join Call
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="danger" size="sm">
                          Cancel
                        </Button>
                      </>
                    )}
                    {appointment.status === "COMPLETED" && (
                      <>
                        <Link
                          href={`/medical-records?appointment=${appointment.id}`}
                        >
                          <Button variant="secondary" size="sm">
                            View Records
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm">
                          Book Follow-up
                        </Button>
                      </>
                    )}
                    {appointment.status === "PENDING" && (
                      <>
                        <Button variant="primary" size="sm">
                          Confirm
                        </Button>
                        <Button variant="danger" size="sm">
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-6 text-center">
              <p className="text-gray-500">
                No appointments found matching your criteria.
              </p>
              <Link href="/appointments/new">
                <Button className="mt-4">Book an Appointment</Button>
              </Link>
            </Card>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Appointments;
