import React from "react";

interface RoleSelectorProps {
  role: string;
  setRole: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ role, setRole }) => (
  <div className="mt-2 grid grid-cols-2 gap-3">
    {["PATIENT", "DOCTOR"].map((r) => (
      <div
        key={r}
        className={`border rounded-md px-3 py-2 flex items-center justify-center text-sm font-medium cursor-pointer ${
          role === r
            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
            : "border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setRole(r)}
      >
        {r === "PATIENT" ? "Patient" : "Doctor"}
      </div>
    ))}
  </div>
);

export default RoleSelector; 
