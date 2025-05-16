"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import { register } from "@/actions/auth";
import InputField from "@/components/auth-components/InputField";
import RoleSelector from "@/components/auth-components/RoleSelector";
import Checkbox from "@/components/auth-components/Checkbox";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("contactNumber", phone);
    formData.append("password", password);
    formData.append("confirmPassword", password);
    formData.append("role", role);

    await register(formData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-emerald-600">MedSync</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Create your account</h2>
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
            <InputField
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User className="h-5 w-5 text-gray-400" />}
              required
            />

            <InputField
              id="email"
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              required
            />

            <InputField
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<Phone className="h-5 w-5 text-gray-400" />}
              required
            />

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <InputField
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-5 w-5 text-gray-400" />}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <RoleSelector role={role} setRole={setRole} />
            </div>

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

            <div>
              <Button type="submit" fullWidth disabled={isLoading || !termsAccepted}>
                {isLoading ? "Registering..." : "Create Account"}
              </Button>
            </div>
          </form>
          {errorMessage && (
            <div className="mt-4 text-center text-red-500 text-sm font-medium">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
