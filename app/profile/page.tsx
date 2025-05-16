'use client';

import React, { useEffect, useState } from "react";
import { User, Calendar, FileText, Clock, Video, MapPin, Edit, Camera, Shield, Bell } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formattedDate, setFormattedDate] = useState<string | null>(null);
  useEffect(() => {
  setFormattedDate(new Date(user.dateOfBirth).toLocaleDateString());
}, []);
  const user = {
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
  };

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">My Profile</h1>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{user.fullName}</h2>
                <p className="text-gray-500">{user.email}</p>
                <Button variant="outline" className="mt-4 w-full flex items-center justify-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "profile"
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="h-5 w-5 mr-3" />
                  Personal Information
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "appointments"
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("appointments")}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Appointments
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "records"
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("records")}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Medical Records
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === "security"
                      ? "bg-emerald-100 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="h-5 w-5 mr-3" />
                  Security
                </button>
              </nav>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Full Name</h3>
                    <p className="text-gray-900">{user.fullName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Phone Number</h3>
                    <p className="text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Date of Birth</h3>
                    <p className="text-gray-900">{formattedDate ?? "Loading..."}</p>  
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Gender</h3>
                    <p className="text-gray-900">{user.gender}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
                    <p className="text-gray-900">{user.address}</p>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Medical Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Insurance Information</h3>
                      <p className="text-gray-900">{user.insuranceInfo}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Emergency Contact</h3>
                      <p className="text-gray-900">{user.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "appointments" && (
              <div>
                <div className="flex items-center justify-between mb-6 ">
                  <h2 className="text-xl font-semibold text-gray-900">My Appointments</h2>
                  <Button variant="primary" size="sm" className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book New Appointment
                  </Button>
                </div>

                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
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
                                <Video
                                  className={`h-6 w-6 ${
                                    appointment.type === "VIRTUAL"
                                      ? "text-blue-600"
                                      : "text-green-600"
                                  }`}
                                />
                              ) : (
                                <MapPin
                                  className={`h-6 w-6 ${
                                    appointment.type === "VIRTUAL"
                                      ? "text-blue-600"
                                      : "text-green-600"
                                  }`}
                                />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {appointment.doctorName}
                              </h3>
                              <p className="text-sm text-gray-500">{appointment.specialty}</p>
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
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                                  className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                  </div>
                ) : (
                  <Card className="p-6 text-center">
                    <p className="text-gray-500">You have no appointments scheduled.</p>
                    <Button className="mt-4">Book an Appointment</Button>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "records" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Medical Records</h2>
                  <Button variant="primary" size="sm" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Records
                  </Button>
                </div>

                {medicalRecords.length > 0 ? (
                  <div className="space-y-4">
                    {medicalRecords.map((record) => {
                      const typeInfo = getRecordTypeInfo(record.type);
                      return (
                        <Card key={record.id} className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="bg-emerald-100 p-2 rounded-full">
                                <FileText className="h-6 w-6 text-emerald-600" />
                              </div>
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{record.title}</h3>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <User className="h-4 w-4 mr-1" />
                                  <span>{record.doctorName}</span>
                                </div>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  <span>{record.date}</span>
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
                  </div>
                ) : (
                  <Card className="p-6 text-center">
                    <p className="text-gray-500">You have no medical records yet.</p>
                    <Button className="mt-4">Upload Records</Button>
                  </Card>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your current password"
                        />
                      </div>
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Confirm your new password"
                        />
                      </div>
                      <Button variant="primary">Update Password</Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">Enable Two-Factor Authentication</Button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Login Sessions</h3>
                    <p className="text-gray-600 mb-4">
                      These are the devices that are currently logged into your account.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">Current Session</p>
                          <p className="text-sm text-gray-500">Chrome on Windows • IP: 192.168.1.1</p>
                          <p className="text-sm text-gray-500">Last active: Just now</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                    <Button variant="danger">Sign Out All Other Sessions</Button>
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
