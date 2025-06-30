'use client';

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Edit } from "lucide-react";
import { updateUser, UserInfo } from "@/actions/user";
import { formatDateDDMMYYYY } from "@/lib/utils";

export type EditVals = {
  phone: string;
  address: string;
};

type Props = {
  userInfo: UserInfo;
}

const ProfileTab: React.FC<Props> = ({userInfo}) => {
  const [user, setUser] = useState(userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<EditVals>({
    phone: user.phone || "",
    address: user.address || "",
  });

  const handleEdit = () => {
    setIsEditing(true);
  }
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("phone", editValues.phone);
    formData.append("address", editValues.address);

    await updateUser(user.id.toString(), formData);
    setUser((prev) => ({
      ...prev,
      phone: editValues.phone,
      address: editValues.address,
    }));
    setIsEditing(false);
  }
  const handleCancel = () => {
    setIsEditing(false);
    setEditValues({
      phone: user.phone || "",
      address: user.address || "",
    });
  } 

  return (
  <Card className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900 ">
        Personal Information
      </h2>
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="primary1" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" variant="outline1" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline1"
            className="flex items-center"
            onClick={handleEdit}
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
          type: "static",
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
          value: user.dateOfBirth ? formatDateDDMMYYYY(user.dateOfBirth) : undefined,
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
          {isEditing && (type === "text") ? (
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
  </Card>
  )
};

export default ProfileTab;
