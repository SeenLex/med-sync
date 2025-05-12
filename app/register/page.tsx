// "use client";

// import React, { useState } from "react";
// import { saveUser } from "../../actions/user";
// import { register } from "../../actions/auth";

// const RegisterPage = () => {
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();

//     const form = event.currentTarget.form;
//     if (!form) return;

//     const formData = new FormData(form);

//     try {
//       setIsLoading(true);
//       await saveUser(formData); // Your backend should expect correct keys: fullName, contactNumber, etc.
//       await register(formData);
//     } catch (error) {
//       if (error instanceof Error) {
//         setErrorMessage(
//           error.message || "Registration failed. Please try again."
//         );
//       } else {
//         setErrorMessage("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
//         <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
//           Register
//         </h2>
//         {errorMessage && (
//           <div className="mb-4 text-center text-red-500 text-sm font-medium">
//             {errorMessage}
//           </div>
//         )}

//         <form>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Email:
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               required
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Password:
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               required
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="confirmPassword"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Confirm Password:
//             </label>
//             <input
//               id="confirmPassword"
//               name="confirmPassword"
//               type="password"
//               required
//               placeholder="Confirm your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="fullName"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Full Name:
//             </label>
//             <input
//               id="fullName"
//               name="fullName"
//               type="text"
//               required
//               placeholder="Enter your full name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <label
//             htmlFor="role"
//             className="block text-gray-600 font-medium mb-2"
//           >
//             Role:
//           </label>
//           <select
//             id="role"
//             name="role"
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           >
//             <option value="PATIENT">Patient</option>
//             <option value="DOCTOR">Doctor</option>
//             <option value="ADMIN">Admin</option>
//           </select>

//           <div className="mb-4">
//             <label
//               htmlFor="phone"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Phone:
//             </label>
//             <input
//               id="phone"
//               name="contactNumber"
//               type="text"
//               placeholder="Enter your phone number"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="gender"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Gender:
//             </label>
//             <input
//               id="gender"
//               name="gender"
//               type="text"
//               placeholder="Enter your gender"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="dateOfBirth"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Date of Birth:
//             </label>
//             <input
//               id="dateOfBirth"
//               name="dateOfBirth"
//               type="date"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="mb-6">
//             <label
//               htmlFor="address"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Address:
//             </label>
//             <input
//               id="address"
//               name="address"
//               type="text"
//               placeholder="Enter your address"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             />
//           </div>

//           <div className="flex justify-between items-center">
//             <button
//               type="button"
//               onClick={handleRegister}
//               disabled={isLoading}
//               className={`w-full py-2 px-4 text-white rounded-md ${
//                 isLoading
//                   ? "bg-indigo-400 cursor-not-allowed"
//                   : "bg-indigo-600 hover:bg-indigo-700"
//               }`}
//             >
//               {isLoading ? "Registering..." : "Register"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
// pages/register.tsx
'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");

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
        <div className="mt-8 bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
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
              <label className="block text-sm font-medium text-gray-700">I am a</label>
              <div className="mt-2 grid grid-cols-2 gap-3">
                <div
                  className={`border rounded-md px-3 py-2 flex items-center justify-center text-sm font-medium cursor-pointer ${
                    role === "PATIENT"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setRole("PATIENT")}
                >
                  Patient
                </div>
                <div
                  className={`border rounded-md px-3 py-2 flex items-center justify-center text-sm font-medium cursor-pointer ${
                    role === "DOCTOR"
                      ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setRole("DOCTOR")}
                >
                  Doctor
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
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
              </label>
            </div>

            <div>
              <Button type="submit" fullWidth>
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
