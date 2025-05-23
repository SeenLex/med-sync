import DoctorProfile from "@/components/doctor/DoctorProfile";
import { notFound } from "next/navigation";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  availableFor: string[];
  education: string;
  experience: string;
  location: string;
  nextAvailable: string;
  bio: string;
  languages: string[];
  contact: { phone: string; email: string };
  services: string[];
  schedule: {
    location: string;
    specialty: string;
    slots: { day: string; hours: string }[];
  }[];
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.9,
    reviewCount: 124,
    availableFor: ["IN_PERSON", "VIRTUAL"],
    education: "Harvard Medical School",
    experience: "15 years",
    location: "Medical Center, Floor 3",
    nextAvailable: "Today",
    bio: "Dr. Johnson is a board-certified cardiologist specializing in heart failure and transplant cardiology. She believes in a holistic approach to patient care.",
    languages: ["English", "Spanish"],
    contact: { phone: "(555) 123-4567", email: "sarah.johnson@med.org" },
    services: ["Echocardiogram", "Stress Test", "Holter Monitoring"],
    schedule: [
      {
        location: "Hyperclinic Y",
        specialty: "Cardiologie",
        slots: [
          { day: "Luni", hours: "16:00 – 18:00" },
          { day: "Marți", hours: "18:00 – 21:00" },
          { day: "Miercuri", hours: "16:00 – 17:30" },
        ],
      },
      {
        location: "Hyperclinic X",
        specialty: "Cardiologie",
        slots: [
          { day: "Joi", hours: "10:00 – 12:30" },
          { day: "Vineri", hours: "14:00 – 17:00" },
        ],
      },
    ],
  },
  // …other doctors
];

export default async function Page({ params }: { params: { id: string } }) {
  const doctor = await doctors.find((d) => d.id === params.id);
  if (!doctor) notFound();
  return <DoctorProfile doctor={doctor} />;
}
