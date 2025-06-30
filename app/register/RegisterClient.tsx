"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  IdCard,
  MapPin,
  Calendar,
  VenusAndMars,
  Stethoscope,
  BadgeCheck,
  ArrowLeft,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { register } from "@/actions/auth";
import InputField from "@/components/auth-components/InputField";
import RoleSelector from "@/components/auth-components/RoleSelector";
import Checkbox from "@/components/auth-components/Checkbox";
import SelectField from "@/components/auth-components/SelectField";
import { uploadProfilePicture } from "@/actions/user";

const Register: React.FC<{
  specialties: { value: string; label: string }[];
}> = ({ specialties }) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pnc, setPnc] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const maxSteps = role === "DOCTOR" ? 3 : 2;

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    const newMaxSteps = newRole === "DOCTOR" ? 3 : 2;
    if (step > newMaxSteps) {
      setStep(newMaxSteps);
    }
    if (newRole !== "DOCTOR") {
      setSpecialtyId("");
      setLicenseNumber("");
    }
  };

  const validateStep1 = () => {
    if (!email || !password) {
      setErrorMessage("Please fill in your email and password.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!fullName || !pnc || !gender || !address || !dateOfBirth || !phone) {
      setErrorMessage("Please fill in all required personal details.");
      return false;
    }
    return true;
  };

  const validateStep3_Doctor = () => {
    if (!specialtyId || !licenseNumber) {
      setErrorMessage("Please fill in all required doctor details.");
      return false;
    }
    if (!profilePicture) {
      setErrorMessage("Profile picture is required.");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    setErrorMessage(null);
    let isValid = true;
    if (step === 1) {
      isValid = validateStep1();
    } else if (step === 2 && role === "DOCTOR") {
      isValid = validateStep2();
    }
    if (isValid && step < maxSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setErrorMessage(null);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!validateStep1()) return;
    if (!validateStep2()) return;
    if (role === "DOCTOR") {
      if (!validateStep3_Doctor()) return;
    }
    if (!termsAccepted) {
      setErrorMessage(
        "You must accept the Terms of Service and Privacy Policy."
      );
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      formData.append("fullName", fullName);
      formData.append("pnc", pnc);
      formData.append("gender", gender);
      formData.append("address", address);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("phone", phone);
      formData.append("confirmPassword", password);
      if (role === "DOCTOR") {
        formData.append("specialtyId", specialtyId);
        formData.append("licenseNumber", licenseNumber);
        if (profilePicture) {
          const url = await uploadProfilePicture(profilePicture, email);
          formData.append("profileImage", url);
        }
      }
      await register(formData);
      alert("Registration successful!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message || "Registration failed.");
      } else {
        setErrorMessage("Registration failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-emerald-600">MedSync</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Create your account {step > 0 && `- Step ${step} of ${maxSteps}`}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login">
              <span className="font-medium text-emerald-600 hover:text-emerald-500 cursor-pointer">
                Sign in
              </span>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white text-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            {step === 1 && (
              <>
                <InputField
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-5 w-5 text-gray-400" />}
                  required
                />
                <div>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <InputField
                      id="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon={<Lock className="h-5 w-5 text-gray-400" />}
                      required
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-600 hover:text-gray-500 focus:outline-none"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    I am a
                  </label>
                  <RoleSelector role={role} setRole={handleRoleChange} />
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <InputField
                  id="fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  icon={<User className="h-5 w-5 text-gray-400" />}
                  required
                />
                <InputField
                  id="pnc"
                  label="PNC"
                  placeholder="Enter your PNC"
                  value={pnc}
                  onChange={(e) => setPnc(e.target.value)}
                  icon={<IdCard className="h-5 w-5 text-gray-400" />}
                  required
                />
                <SelectField
                  id="gender"
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  icon={<VenusAndMars className="h-5 w-5 text-gray-400" />}
                  required
                  placeholder="Select gender"
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                  ]}
                />
                <InputField
                  id="address"
                  label="Address"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  icon={<MapPin className="h-5 w-5 text-gray-400" />}
                  required
                />
                <InputField
                  id="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  placeholder="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  icon={<Calendar className="h-5 w-5 text-gray-400" />}
                  required
                />
                <InputField
                  id="phone"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon={<Phone className="h-5 w-5 text-gray-400" />}
                  required
                />
              </>
            )}
            {step === 3 && role === "DOCTOR" && (
              <>
                <SelectField
                  id="specialtyId"
                  label="Specialty"
                  value={specialtyId}
                  onChange={(e) => setSpecialtyId(e.target.value)}
                  icon={<Stethoscope className="h-5 w-5 text-gray-400" />}
                  required
                  placeholder="Select specialty"
                  options={specialties}
                />
                <InputField
                  id="licenseNumber"
                  label="License Number"
                  placeholder="Enter your license number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  icon={<BadgeCheck className="h-5 w-5 text-gray-400" />}
                  required
                />
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) =>
                    setProfilePicture(e.target.files?.[0] || null)
                  }
                  required
                />
                {errorMessage && !profilePicture && (
                  <div className="text-red-500 text-sm mt-1">
                    Profile picture is required.
                  </div>
                )}
              </>
            )}
            {step === maxSteps && (
              <Checkbox
                id="terms"
                required
                label={
                  <>
                    I agree to the{" "}
                    <Link href="/terms">
                      <span className="text-emerald-600 hover:text-emerald-500 cursor-pointer">
                        Terms of Service
                      </span>
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy">
                      <span className="text-emerald-600 hover:text-emerald-500 cursor-pointer">
                        Privacy Policy
                      </span>
                    </Link>
                  </>
                }
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
            )}
            <div className="flex items-center justify-between space-x-3 pt-2">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={prevStep}
                  variant="outline"
                  className=""
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              {step === 1 && <div className="flex-grow"></div>}
              {step < maxSteps && (
                <Button
                  type="button"
                  onClick={nextStep}
                  fullWidth={step === 1}
                  className={step > 1 ? "flex-grow" : ""}
                >
                  Next
                </Button>
              )}
              {step === maxSteps && (
                <Button
                  type="submit"
                  disabled={isLoading || !termsAccepted}
                  className="flex-grow"
                >
                  {isLoading ? "Registering..." : "Create Account"}
                </Button>
              )}
            </div>
            {errorMessage && (
              <div className="mt-4 text-center text-red-500 text-sm font-medium">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
