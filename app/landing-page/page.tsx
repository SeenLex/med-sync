// pages/index.tsx
import React from "react";
import Link from "next/link";
import { Calendar, FileText, Video, Bell, Clock, Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const LandingPage: React.FC = () => {
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: "1",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 15, 2025",
      time: "10:30 AM",
      type: "VIRTUAL",
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "May 20, 2025",
      time: "2:15 PM",
      type: "IN_PERSON",
    },
  ];

  // Mock data for recent notifications
  const recentNotifications = [
    {
      id: "1",
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Sarah Johnson has been confirmed.",
      time: "2 hours ago",
      type: "APPOINTMENT_CONFIRMED",
    },
    {
      id: "2",
      title: "New Message",
      message: "You have a new message from Dr. Michael Chen.",
      time: "Yesterday",
      type: "NEW_MESSAGE",
    },
    {
      id: "3",
      title: "Medical Record Updated",
      message: "Your medical records have been updated with recent lab results.",
      time: "2 days ago",
      type: "MEDICAL_RECORD_UPDATE",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Your Health, Seamlessly Connected
            </h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              Access healthcare services anytime, anywhere. Schedule appointments, consult with
              doctors, and manage your medical records all in one place.
            </p>
            <div className="mt-10 flex justify-center">
              <Link href="/appointments/new">
                <Button
                  variant="secondary"
                  size="lg"
                  className="mr-4 font-semibold shadow-lg"
                >
                  Book Appointment
                </Button>
              </Link>
              <Link href="/doctors">
                <Button variant="outline" size="lg" className="bg-white font-semibold shadow-lg">
                  Find a Doctor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Link href="/appointments/new">
                <div className="flex flex-col items-center cursor-pointer">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Calendar className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Book Appointment</h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">
                    Schedule an in-person or virtual consultation
                  </p>
                </div>
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Link href="/medical-records">
                <div className="flex flex-col items-center cursor-pointer">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <FileText className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Medical Records</h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">
                    View and manage your health information
                  </p>
                </div>
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Link href="/telemedicine">
                <div className="flex flex-col items-center cursor-pointer">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Video className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Telemedicine</h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">
                    Connect with doctors through video consultations
                  </p>
                </div>
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Link href="/doctors">
                <div className="flex flex-col items-center cursor-pointer">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Search className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Find Doctors</h3>
                  <p className="mt-1 text-sm text-gray-500 text-center">
                    Search for healthcare providers by specialty
                  </p>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Appointments */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Appointments</h2>
                <Link href="/appointments">
                  <span className="text-emerald-600 hover:text-emerald-700 text-sm font-medium cursor-pointer">
                    View All
                  </span>
                </Link>
              </div>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="bg-emerald-100 p-2 rounded-full">
                            {appointment.type === "VIRTUAL" ? (
                              <Video className="h-6 w-6 text-emerald-600" />
                            ) : (
                              <Calendar className="h-6 w-6 text-emerald-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {appointment.doctorName}
                            </h3>
                            <p className="text-sm text-gray-500">{appointment.specialty}</p>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                {appointment.date} at {appointment.time}
                              </span>
                            </div>
                            <div className="mt-1">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  appointment.type === "VIRTUAL"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {appointment.type === "VIRTUAL"
                                  ? "Virtual Consultation"
                                  : "In-Person Visit"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {appointment.type === "VIRTUAL" && (
                            <Button variant="primary" size="sm">
                              Join Call
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-6 text-center">
                  <p className="text-gray-500">You have no upcoming appointments.</p>
                  <Link href="/appointments/new">
                    <Button className="mt-4">Book an Appointment</Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* Notifications */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <Link href="/notifications">
                  <span className="text-emerald-600 hover:text-emerald-700 text-sm font-medium cursor-pointer">
                    View All
                  </span>
                </Link>
              </div>
              <Card className="p-4">
                {recentNotifications.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {recentNotifications.map((notification) => (
                      <div key={notification.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`p-1.5 rounded-full ${
                              notification.type === "APPOINTMENT_CONFIRMED"
                                ? "bg-green-100"
                                : notification.type === "NEW_MESSAGE"
                                ? "bg-blue-100"
                                : "bg-yellow-100"
                            }`}
                          >
                            <Bell
                              className={`h-5 w-5 ${
                                notification.type === "APPOINTMENT_CONFIRMED"
                                  ? "text-green-600"
                                  : notification.type === "NEW_MESSAGE"
                                  ? "text-blue-600"
                                  : "text-yellow-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                            <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No new notifications.</p>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose MedSync?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers a comprehensive suite of features designed to make healthcare
              more accessible and convenient for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto bg-emerald-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Easy Scheduling</h3>
              <p className="mt-2 text-gray-600">
                Book appointments with your preferred healthcare providers in just a few clicks.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-emerald-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                <Video className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Virtual Consultations</h3>
              <p className="mt-2 text-gray-600">
                Connect with healthcare professionals from the comfort of your home through secure
                video calls.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto bg-emerald-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
                <FileText className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-gray-900">Medical Records</h3>
              <p className="mt-2 text-gray-600">
                Access your complete medical history and share it securely with your healthcare
                providers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;