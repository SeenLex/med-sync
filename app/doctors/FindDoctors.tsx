import FindDoctorPageClient from "./FindDoctorPageClient";
import { getAllSpecializations } from "@/actions/user";

export default async function FindDoctorPageWrapper() {
  const doctors = await (await import("@/actions/user")).getAllDoctors();
  let specialties = await getAllSpecializations();
  specialties = ["All Specialties", ...specialties];
  return <FindDoctorPageClient doctors={doctors} specialties={specialties} />;
}