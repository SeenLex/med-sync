import React from "react";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Video,
  Search,
  Clock,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Appointment } from "@/actions/appointments";

type Props = {
  appointments: Appointment[];
};

const LandingPage: React.FC<Props> = ({ appointments }) => {


  const quickActions = [
    {
      href: "/appointments/new",
      Icon: Calendar,
      title: "Book Appointment",
      desc: "Schedule an in-person or virtual consultation",
    },
    {
      href: "/medical-records",
      Icon: FileText,
      title: "Medical Records",
      desc: "View and manage your health information",
    },
    {
      href: "/telemedicine",
      Icon: Video,
      title: "Telemedicine",
      desc: "Connect via video consultation",
    },
    {
      href: "/doctors",
      Icon: Search,
      title: "Find Doctors",
      desc: "Search providers by specialty",
    },
  ];

  return (
    <Layout>
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {quickActions.map(({ href, Icon, title, desc }) => (
              <Card
                key={title}
                className="p-2 sm:p-4 hover:shadow-lg transition-shadow"
              >
                <Link
                  href={href}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-emerald-100 p-2 sm:p-3 rounded-full">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600" />
                  </div>
                  <h3 className="mt-2 sm:mt-3 text-sm sm:text-base font-medium text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500 hidden lg:block">
                    {desc}
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Upcoming Appointments
                </h2>
                <Link
                  href="/appointments"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((appt: Appointment) => (
                    <Card
                      key={appt.id}
                      className="p-3 sm:p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-emerald-100 p-2 rounded-full">
                            {appt.type === "VIRTUAL" ? (
                              <Video className="h-6 w-6 text-emerald-600" />
                            ) : (
                              <Calendar className="h-6 w-6 text-emerald-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-lg font-medium text-gray-900 truncate">
                              {appt.doctor.user.fullName}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 truncate">
                              {appt.doctor.specialization}
                            </p>
                            <div className="mt-1 flex items-center text-xs sm:text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span className="truncate">
                                {appt.startTime
                                  ? new Date(appt.startTime).toLocaleDateString() +
                                    " at " +
                                    new Date(appt.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                  : "Date/Time not available"}
                              </span>
                            </div>
                            <div className="mt-1">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                                  appt.type === "VIRTUAL"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {appt.type === "VIRTUAL"
                                  ? "Virtual Consultation"
                                  : "In-Person Visit"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 sm:mt-0 flex space-x-2">
                          {appt.type === "VIRTUAL" && (
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
                <Card className="p-4 text-center">
                  <p className="text-gray-500">
                    You have no upcoming appointments.
                  </p>
                  <Link href="/appointments/new">
                    <Button className="mt-4">
                      Book an Appointment
                    </Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>
      </section>
    </Layout>
  );
};

export default LandingPage;