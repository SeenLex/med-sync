"use client";

import React, { useEffect, useState } from "react";
import {
  User,
  Calendar,
  FileText,
  Clock,
  Video,
  MapPin,
  Edit,
  Camera,
  Shield,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import Image from "next/image";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apptPage, setApptPage] = useState(1);
  const [recPage, setRecPage] = useState(1);

  // Mock user
  const [user, setUser] = useState({
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
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, CA 94123",
  });

  useEffect(() => {
    setFormattedDate(new Date(user.dateOfBirth).toLocaleDateString());
  }, [user.dateOfBirth]);

  const handleEditClick = () => {
    setEditValues({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
    });
    setIsEditing(true);
  };

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
    setUser({
      ...user,
      fullName: editValues.fullName,
      email: editValues.email,
      phone: editValues.phone,
      address: editValues.address,
    });
    setIsEditing(false);
  };

  useEffect(() => {
    setFormattedDate(new Date(user.dateOfBirth).toLocaleDateString());
  }, [user.dateOfBirth]);

  const appointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 15, 2025",
      time: "10:30 AM",
      type: "VIRTUAL",
      status: "CONFIRMED",
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
    // ...more if needed
  ];

  const medicalRecords = [
    {
      id: "1",
      title: "Annual Physical Examination",
      doctorName: "Dr. Sarah Johnson",
      date: "April 15, 2025",
      type: "VISIT_SUMMARY",
    },
    {
      id: "2",
      title: "Blood Test Results",
      doctorName: "Dr. Michael Chen",
      date: "March 28, 2025",
      type: "LAB_RESULT",
    },
    {
      id: "3",
      title: "Hypertension Medication",
      doctorName: "Dr. Emily Rodriguez",
      date: "March 10, 2025",
      type: "PRESCRIPTION",
    },
  ];

  // Helpers
  const pageSize = 5;
  const totalApptPages = Math.ceil(appointments.length / pageSize);
  const paginatedAppointments = appointments.slice(
    (apptPage - 1) * pageSize,
    apptPage * pageSize
  );

  const totalRecPages = Math.ceil(medicalRecords.length / pageSize);
  const paginatedRecords = medicalRecords.slice(
    (recPage - 1) * pageSize,
    recPage * pageSize
  );

  const getRecordTypeInfo = (type: string) => {
    switch (type) {
      case "LAB_RESULT":
        return { label: "Lab Result", color: "bg-blue-100 text-blue-800" };
      case "PRESCRIPTION":
        return {
          label: "Prescription",
          color: "bg-purple-100 text-purple-800",
        };
      case "VISIT_SUMMARY":
        return {
          label: "Visit Summary",
          color: "bg-emerald-100 text-emerald-800",
        };
      case "MEDICAL_HISTORY":
        return {
          label: "Medical History",
          color: "bg-amber-100 text-amber-800",
        };
      default:
        return { label: "Other", color: "bg-gray-100 text-gray-800" };
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            My Profile
          </h1>
          <Button variant="outline" className="flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
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
                {[
                  {
                    key: "profile",
                    icon: <User />,
                    label: "Personal Information",
                  },
                  {
                    key: "appointments",
                    icon: <Calendar />,
                    label: "Appointments",
                  },
                  {
                    key: "records",
                    icon: <FileText />,
                    label: "Medical Records",
                  },
                  { key: "security", icon: <Shield />, label: "Security" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === tab.key
                        ? "bg-emerald-100 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card className="p-6 space-y-6">
                <div className="flex flex-col items-start space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Personal Information
                  </h2>

                  <div className="w-full flex justify-start space-x-2 md:w-auto">
                    {isEditing ? (
                      <>
                        <Button
                          variant="primary1"
                          size="sm"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline1"
                          size="sm"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline1"
                        size="sm"
                        className="flex items-center"
                        onClick={handleEditClick}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name (read-only) */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Full Name
                    </h3>
                    {isEditing ? (
                      <input
                        type="fullName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
                        value={editValues.fullName}
                        onChange={(e) =>
                          setEditValues((v) => ({
                            ...v,
                            email: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="text-gray-900">{user.fullName}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Email
                    </h3>
                    {isEditing ? (
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
                        value={editValues.email}
                        onChange={(e) =>
                          setEditValues((v) => ({
                            ...v,
                            email: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="text-gray-900">{user.email}</p>
                    )}
                  </div>
                  {/* Phone */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Phone Number
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
                        value={editValues.phone}
                        onChange={(e) =>
                          setEditValues((v) => ({
                            ...v,
                            phone: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="text-gray-900">{user.phone}</p>
                    )}
                  </div>
                  {/* Date of Birth (read-only) */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Date of Birth
                    </h3>
                    <p className="text-gray-900">
                      {formattedDate ?? "Loading..."}
                    </p>
                  </div>
                  {/* Gender (read-only) */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Gender
                    </h3>
                    <p className="text-gray-900">{user.gender}</p>
                  </div>
                  {/* Address */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      Address
                    </h3>
                    {isEditing ? (
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-emerald-500 focus:border-emerald-500"
                        value={editValues.address}
                        onChange={(e) =>
                          setEditValues((v) => ({
                            ...v,
                            address: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <p className="text-gray-900">{user.address}</p>
                    )}
                  </div>
                </div>

                {/* Medical Information stays unchanged */}
                <div className="pt-6 border-t border-gray-200 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Medical Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      ["Insurance Information", user.insuranceInfo],
                      ["Emergency Contact", user.emergencyContact],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                          {label}
                        </h3>
                        <p className="text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    My Appointments
                  </h2>
                </div>
                {paginatedAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {paginatedAppointments.map((appt) => (
                      <Card
                        key={appt.id}
                        className="p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`p-2 rounded-full ${
                                appt.type === "VIRTUAL"
                                  ? "bg-blue-100"
                                  : "bg-green-100"
                              }`}
                            >
                              {appt.type === "VIRTUAL" ? (
                                <Video className="h-6 w-6 text-blue-600" />
                              ) : (
                                <MapPin className="h-6 w-6 text-green-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {appt.doctorName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {appt.specialty}
                              </p>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{appt.date}</span>
                              </div>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{appt.time}</span>
                              </div>
                              {appt.location && (
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{appt.location}</span>
                                </div>
                              )}
                              <div className="mt-2">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    appt.status === "CONFIRMED"
                                      ? "bg-green-100 text-green-800"
                                      : appt.status === "PENDING"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {appt.status === "CONFIRMED"
                                    ? "Confirmed"
                                    : appt.status === "PENDING"
                                    ? "Pending"
                                    : "Completed"}
                                </span>
                                <span
                                  className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    appt.type === "VIRTUAL"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-emerald-100 text-emerald-800"
                                  }`}
                                >
                                  {appt.type === "VIRTUAL"
                                    ? "Virtual"
                                    : "In-Person"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                            {appt.status === "CONFIRMED" && (
                              <>
                                {appt.type === "VIRTUAL" && (
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
                            {appt.status === "COMPLETED" && (
                              <>
                                <Button variant="secondary" size="sm">
                                  View Records
                                </Button>
                                <Button variant="outline" size="sm">
                                  Book Follow-up
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                    {totalApptPages > 1 && (
                      <Pagination
                        currentPage={apptPage}
                        totalPages={totalApptPages}
                        onPageChange={(p: number) => setApptPage(p)}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="p-6 text-center">
                    <p className="text-gray-500">
                      You have no appointments scheduled.
                    </p>
                    <Button className="mt-4">Book an Appointment</Button>
                  </Card>
                )}
              </div>
            )}

            {/* Records Tab */}
            {activeTab === "records" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Medical Records
                  </h2>
                </div>
                {paginatedRecords.length > 0 ? (
                  <div className="space-y-4">
                    {paginatedRecords.map((rec) => {
                      const typeInfo = getRecordTypeInfo(rec.type);
                      return (
                        <Card
                          key={rec.id}
                          className="p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="bg-emerald-100 p-2 rounded-full">
                                <FileText className="h-6 w-6 text-emerald-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">
                                  {rec.title}
                                </h3>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <User className="h-4 w-4 mr-1" />
                                  <span>{rec.doctorName}</span>
                                </div>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{rec.date}</span>
                                </div>
                                <div className="mt-2">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}
                                  >
                                    {typeInfo.label}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="secondary" size="sm">
                                Download
                              </Button>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                    {totalRecPages > 1 && (
                      <Pagination
                        currentPage={recPage}
                        totalPages={totalRecPages}
                        onPageChange={(p: number) => setRecPage(p)}
                      />
                    )}
                  </div>
                ) : (
                  <Card className="p-6 text-center">
                    <p className="text-gray-500">
                      You have no medical records yet.
                    </p>
                    <Button className="h-5 w-5 sm:hidden mr-2">
                      Upload Records
                    </Button>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Security Settings
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4">
                      {/* Current Password */}
                      <div>
                        <label
                          htmlFor="current-password"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Current Password
                        </label>
                        <div className="relative mt-1">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            id="current-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your current password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                            onClick={() => setShowCurrentPassword((v) => !v)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          New Password
                        </label>
                        <div className="relative mt-1">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            id="new-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your new password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                            onClick={() => setShowNewPassword((v) => !v)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Confirm New Password */}
                      <div>
                        <label
                          htmlFor="confirm-password"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Confirm New Password
                        </label>
                        <div className="relative mt-1">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm-password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-gray-800 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Confirm your new password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button variant="primary">Update Password</Button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </p>
                    <Button variant="outline">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Login Sessions
                    </h3>
                    <p className="text-gray-600 mb-4">
                      These are the devices that are currently logged into your
                      account.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">
                            Current Session
                          </p>
                          <p className="text-sm text-gray-500">
                            Chrome on Windows • IP: 192.168.1.1
                          </p>
                          <p className="text-sm text-gray-500">
                            Last active: Just now
                          </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                    <Button variant="danger">
                      Sign Out All Other Sessions
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
