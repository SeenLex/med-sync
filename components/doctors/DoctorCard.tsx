import React from "react";
import Link from "next/link";
import { MapPin, Video, MessageSquare } from "lucide-react";
import type { FindDoctor } from "@/actions/user";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type DoctorCardProps = {
  doctor: FindDoctor[number];
};

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start md:flex-row md:flex-1">
          <img
            src={
              doctor.profileImage ||
              `https://randomuser.me/api/portraits/lego/${doctor.id % 10}.jpg`
            }
            alt={doctor.fullName}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {doctor.fullName}
            </h2>
            <p className="text-gray-600">
              {doctor.doctor?.specialization || "Unknown"}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <MapPin className="h-3 w-3 mr-1" />
                In-Person
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <Video className="h-3 w-3 mr-1" />
                Virtual
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-0 flex flex-col space-y-2 md:justify-center">
          <Button variant="primary" className="w-full md:w-auto">
            Book Appointment
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-auto flex items-center justify-center"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Link
            href={`/doctors/${doctor.id}`}
            className="text-emerald-600 text-sm text-center hover:text-emerald-700 mt-2"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default DoctorCard;