import RegisterClient from "./RegisterClient";
import { getAllSpecializations } from "@/actions/user";

const RegisterPage = async () => {
  const specialties = await getAllSpecializations();
  return <RegisterClient specialties={specialties} />;
};

export default RegisterPage;
