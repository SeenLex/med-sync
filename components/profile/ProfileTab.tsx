import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Edit } from "lucide-react";

export type UserFull = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  insuranceInfo: string;
  emergencyContact: string;
  profileImage: string;
};

export type EditVals = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
};

type Props = {
  user: UserFull;
  formattedDate: string | null;
  isEditing: boolean;
  editValues: EditVals;
  setEditValues: React.Dispatch<React.SetStateAction<EditVals>>;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
};

const ProfileTab: React.FC<Props> = ({
  user,
  formattedDate,
  isEditing,
  editValues,
  setEditValues,
  onEdit,
  onCancel,
  onSave,
}) => (
  <Card className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900">
        Personal Information
      </h2>
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="primary1" onClick={onSave}>
              Save
            </Button>
            <Button size="sm" variant="outline1" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline1"
            className="flex items-center"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          label: "Full Name",
          value: user.fullName,
          key: "fullName",
          type: "text",
        },
        {
          label: "Email",
          value: user.email,
          key: "email",
          type: "email",
        },
        {
          label: "Phone Number",
          value: user.phone,
          key: "phone",
          type: "text",
        },
        {
          label: "Date of Birth",
          value: formattedDate ?? "Loading...",
          key: "dob",
          type: "static",
        },
        {
          label: "Gender",
          value: user.gender,
          key: "gender",
          type: "static",
        },
        {
          label: "Address",
          value: user.address,
          key: "address",
          type: "text",
        },
      ].map(({ label, value, key, type }) => (
        <div key={key}>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            {label}
          </h3>
          {isEditing && (type === "text" || type === "email") ? (
            <input
              type={type}
              className="w-full px-3 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              value={editValues[key as keyof EditVals]}
              onChange={(e) =>
                setEditValues((v) => ({
                  ...v,
                  [key]: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-gray-900">{value}</p>
          )}
        </div>
      ))}
    </div>

    <div className="pt-6 border-t border-gray-200 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Medical Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["Insurance Information", user.insuranceInfo],
          ["Emergency Contact", user.emergencyContact],
        ].map(([label, val]) => (
          <div key={label}>
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              {label}
            </h3>
            <p className="text-gray-900">{val}</p>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

export default ProfileTab;
