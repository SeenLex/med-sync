import React from "react";
import { Eye, EyeOff } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

type Props = {
  showCurr: boolean;
  showNew: boolean;
  showConf: boolean;
  setShowCurr: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNew: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConf: React.Dispatch<React.SetStateAction<boolean>>;
};

const SecurityTab: React.FC<Props> = ({
  showCurr,
  showNew,
  showConf,
  setShowCurr,
  setShowNew,
  setShowConf,
}) => (
  <Card className="p-6 space-y-8">
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Change Password
      </h3>
      {[
        {
          id: "current-password",
          label: "Current Password",
          show: showCurr,
          toggle: () => setShowCurr((v) => !v),
        },
        {
          id: "new-password",
          label: "New Password",
          show: showNew,
          toggle: () => setShowNew((v) => !v),
        },
        {
          id: "confirm-password",
          label: "Confirm New Password",
          show: showConf,
          toggle: () => setShowConf((v) => !v),
        },
      ].map(({ id, label, show, toggle }) => (
        <div key={id} className="mb-4">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              id={id}
              className="w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
              onClick={toggle}
            >
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      ))}
      <Button variant="primary">Update Password</Button>
    </div>

    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Two-Factor Authentication
      </h3>
      <p className="text-gray-600 mb-4">
        Add an extra layer by enabling 2FA.
      </p>
      <Button variant="outline">
        Enable Two-Factor Authentication
      </Button>
    </div>

    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Login Sessions
      </h3>
      <p className="text-gray-600 mb-4">
        Devices currently logged into your account.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-900">Current Session</p>
            <p className="text-sm text-gray-500">
              Chrome on Windows • IP: 192.168.1.1
            </p>
            <p className="text-sm text-gray-500">Last active: Just now</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>
      </div>
      <Button variant="danger">
        Sign Out All Other Sessions
      </Button>
    </div>
  </Card>
);

export default SecurityTab;
