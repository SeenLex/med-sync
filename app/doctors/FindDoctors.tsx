import FindDoctorPageClient from "./FindDoctorPageClient";
import { getAllDoctors, getAllSpecialtyOptions } from "@/actions/user";

export default async function FindDoctorPageWrapper() {
  const doctors = await getAllDoctors();
  let specialties = await getAllSpecialtyOptions();
  specialties = [{ value: "", label: "All Specialties" }, ...specialties];
  return <FindDoctorPageClient doctors={doctors} specialties={specialties} />;
}