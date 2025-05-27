// import React from "react";
// import { Eye, EyeOff } from "lucide-react";
// import Card from "@/components/ui/Card";
// import Button from "@/components/ui/Button";

// type Props = {
//   showCurr: boolean;
//   showNew: boolean;
//   showConf: boolean;
//   setShowCurr: React.Dispatch<React.SetStateAction<boolean>>;
//   setShowNew: React.Dispatch<React.SetStateAction<boolean>>;
//   setShowConf: React.Dispatch<React.SetStateAction<boolean>>;
// };

// const SecurityTab: React.FC<Props> = ({
//   showCurr,
//   showNew,
//   showConf,
//   setShowCurr,
//   setShowNew,
//   setShowConf,
// }) => (
//   <Card className="p-6 space-y-8">
//     <div>
//       <h3 className="text-lg font-medium text-gray-900 mb-4">
//         Change Password
//       </h3>
//       {[
//         {
//           id: "current-password",
//           label: "Current Password",
//           show: showCurr,
//           toggle: () => setShowCurr((v) => !v),
//         },
//         {
//           id: "new-password",
//           label: "New Password",
//           show: showNew,
//           toggle: () => setShowNew((v) => !v),
//         },
//         {
//           id: "confirm-password",
//           label: "Confirm New Password",
//           show: showConf,
//           toggle: () => setShowConf((v) => !v),
//         },
//       ].map(({ id, label, show, toggle }) => (
//         <div key={id} className="mb-4">
//           <label
//             htmlFor={id}
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             {label}
//           </label>
//           <div className="relative">
//             <input
//               type={show ? "text" : "password"}
//               id={id}
//               className="w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
//             />
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
//               onClick={toggle}
//             >
//               {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       ))}
//       <Button variant="primary">Update Password</Button>
//     </div>

//     <div className="border-t border-gray-200 pt-6">
//       <h3 className="text-lg font-medium text-gray-900 mb-4">
//         Two-Factor Authentication
//       </h3>
//       <p className="text-gray-600 mb-4">
//         Add an extra layer by enabling 2FA.
//       </p>
//       <Button variant="outline">
//         Enable Two-Factor Authentication
//       </Button>
//     </div>

//     <div className="border-t border-gray-200 pt-6">
//       <h3 className="text-lg font-medium text-gray-900 mb-4">
//         Login Sessions
//       </h3>
//       <p className="text-gray-600 mb-4">
//         Devices currently logged into your account.
//       </p>
//       <div className="bg-gray-50 rounded-lg p-4 mb-4">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-medium text-gray-900">Current Session</p>
//             <p className="text-sm text-gray-500">
//               Chrome on Windows • IP: 192.168.1.1
//             </p>
//             <p className="text-sm text-gray-500">Last active: Just now</p>
//           </div>
//           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             Active
//           </span>
//         </div>
//       </div>
//       <Button variant="danger">
//         Sign Out All Other Sessions
//       </Button>
//     </div>
//   </Card>
// );

// export default SecurityTab;
// components/profile/SecurityTab.tsx
"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// If SecurityTab needs props like userId, define them here:
// interface SecurityTabProps {
//   userId?: string;
// }
// const SecurityTab: React.FC<SecurityTabProps> = ({ userId }) => {

const SecurityTab: React.FC = () => {
  const [showCurr, setShowCurr] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    if (!currentPassword || !newPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    // TODO: Implement actual password update logic using a server action or API call.
    // e.g., await updatePasswordAction(currentPassword, newPassword);
    console.log("Attempting to update password for user."); // Add userId if passed as prop
    alert(
      "Password update functionality is a placeholder. Implement actual logic.",
    );
    // Optionally clear fields on success/attempt
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEnable2FA = () => {
    // TODO: Implement 2FA enabling logic
    alert("Enable Two-Factor Authentication: Placeholder.");
  };

  const handleSignOutOtherSessions = () => {
    // TODO: Implement sign out all other sessions logic
    alert("Sign Out All Other Sessions: Placeholder.");
  };

  return (
    <Card className="p-6 space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Change Password
        </h3>
        {[
          {
            id: "current-password",
            label: "Current Password",
            value: currentPassword,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value),
            show: showCurr,
            toggle: () => setShowCurr((v) => !v),
            autoComplete: "current-password",
          },
          {
            id: "new-password",
            label: "New Password",
            value: newPassword,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value),
            show: showNew,
            toggle: () => setShowNew((v) => !v),
            autoComplete: "new-password",
          },
          {
            id: "confirm-password",
            label: "Confirm New Password",
            value: confirmPassword,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value),
            show: showConf,
            toggle: () => setShowConf((v) => !v),
            autoComplete: "new-password",
          },
        ].map(({ id, label, value, onChange, show, toggle, autoComplete }) => (
          <div key={id} className="mb-4">
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            <div className="relative text-gray-700">
              <input
                type={show ? "text" : "password"}
                id={id}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                autoComplete={autoComplete}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                onClick={toggle}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
        <Button variant="primary" onClick={handleUpdatePassword}>
          Update Password
        </Button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Two-Factor Authentication
        </h3>
        <p className="text-gray-600 mb-4">
          Add an extra layer of security by enabling 2FA.
        </p>
        <Button variant="outline" onClick={handleEnable2FA}>
          Enable Two-Factor Authentication
        </Button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Login Sessions
        </h3>
        <p className="text-gray-600 mb-4">
          Review and manage devices currently logged into your account.
        </p>
        {/* This section should dynamically list sessions */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Current Session</p>
              <p className="text-sm text-gray-500">
                {/* TODO: Dynamically populate device and IP */}
                Chrome on Windows • IP: 192.168.1.101
              </p>
              <p className="text-sm text-gray-500">
                {/* TODO: Dynamically populate last active time */}
                Last active: Just now
              </p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
        {/* Example of another session - map through actual session data here */}
        {/* <div className="bg-gray-50 rounded-lg p-4 mb-4"> ... </div> */}
        <Button variant="danger" onClick={handleSignOutOtherSessions}>
          Sign Out All Other Sessions
        </Button>
      </div>
    </Card>
  );
};

export default SecurityTab;

