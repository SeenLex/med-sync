"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { User, Calendar, FileText, Camera, Upload, X, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import defaultProfilePic from "@/assets/profile.jpg";
import Link from "next/link";
import { uploadProfilePicture, getProfilePictureUrl, updateUserProfileImage } from "@/actions/user";
import { usePathname } from "next/navigation";

const links = [
  { href: "/profile", icon: <User />, label: "Personal Information" },
  { href: "/profile/appointments", icon: <Calendar />, label: "Appointments" },
  { href: "/profile/medical-records", icon: <FileText />, label: "Medical Records" },
];

const Sidebar = ({ userInfo }: { userInfo: any }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(userInfo.profileImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const validateFile = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, JPG, or PNG)");
      return false;
    }
    if (file.size > maxSize) {
      setError("File size must be less than 5MB");
      return false;
    }
    return true;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      setError(null);
      setPreviewFile(file);
      setShowPreview(true);
    }
  };

  const handleUpload = async () => {
    if (!previewFile) return;
    setIsUploading(true);
    setError(null);
    try {
      await uploadProfilePicture(previewFile, userInfo.id.toString());
      const newUrl = await getProfilePictureUrl(userInfo.id.toString());
      setProfileImageUrl(newUrl);
      if (newUrl) {
        await updateUserProfileImage(userInfo.id.toString(), newUrl);
        window.location.reload();
      }
      setShowPreview(false);
      setPreviewFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch {
      setError("Failed to upload profile picture. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setShowPreview(false);
    setPreviewFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 lg:col-span-1">
      <Card className="p-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              src={profileImageUrl || defaultProfilePic}
              alt={userInfo.fullName}
              width={128}
              height={128}
              className="h-32 w-32 rounded-full object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={handleCameraClick}
              disabled={isUploading}
              className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            {userInfo.fullName}
          </h2>
          <p className="text-gray-500">{userInfo.email}</p>
        </div>
      </Card>

      {/* Preview Modal */}
      {showPreview && previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Preview Profile Picture</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <Image
                src={URL.createObjectURL(previewFile)}
                alt="Preview"
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="flex space-x-3">
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="flex-1 flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </button>
              <button
                onClick={handleCancel}
                disabled={isUploading}
                className="flex-1 flex items-center justify-center border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Card className="p-4">
        <nav className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`w-full flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors
                  ${isActive ? "bg-emerald-100 text-emerald-800" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </Card>
    </div>
  );
};

export default Sidebar;