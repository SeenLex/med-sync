import RegisterClient from "./RegisterClient";
import { getAllSpecialtyOptions } from "@/actions/user";

const RegisterPage = async () => {
  const specialties = await getAllSpecialtyOptions();
  return <RegisterClient specialties={specialties} />;
};

export default RegisterPage;
