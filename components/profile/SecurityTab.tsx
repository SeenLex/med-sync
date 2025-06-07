"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

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
    </Card>
  );
};

export default SecurityTab;

