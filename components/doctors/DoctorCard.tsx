import React from "react";
import { MapPin, Video } from "lucide-react";
import type { FindDoctor } from "@/actions/user";
import Card from "@/components/ui/Card";
import Image from "next/image";

const DoctorCard: React.FC<{ doctor: FindDoctor[number] }> = ({ doctor }) => {

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center md:items-start md:flex-row md:flex-1">
          <Image
            src={doctor.profileImage || `https://randomuser.me/api/portraits/lego/${doctor.id % 10}.jpg`}
            alt={doctor.fullName || "Doctor profile"}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {doctor.fullName}
                </h2>
                <p className="text-gray-600">
                  {doctor.doctor?.specialty?.name || "Unknown"}
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-between gap-2">
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
      </div>
    </Card>
  );
};

export default DoctorCard;