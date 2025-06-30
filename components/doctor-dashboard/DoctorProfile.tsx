'use client';

import React, { useRef, useState } from "react";
import Card from "@/components/ui/Card";
import { UserInfo, updateUserProfileImage } from "@/actions/user";
import Image from "next/image";
import defaultProfilePic from "@/assets/profile.jpg";
import { uploadProfilePicture, getProfilePictureUrl } from "@/actions/user";
import { Camera, Loader2, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcn/dialog";

type Props = {
  userInfo: UserInfo;
};

const DoctorProfile: React.FC<Props> = ({ userInfo }) => {
  const [profileImageUrl, setProfileImageUrl] = useState(userInfo.profileImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 5 * 1024 * 1024;
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
      const cacheBustedUrl = newUrl ? `${newUrl}?t=${Date.now()}` : null;
      setProfileImageUrl(cacheBustedUrl);
      if (cacheBustedUrl) {
        await updateUserProfileImage(userInfo.id.toString(), cacheBustedUrl);
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
    <Card className="p-6 space-y-6">
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
          <Dialog open={showPreview} onOpenChange={setShowPreview}>
            <DialogTrigger asChild>
              <button
                type="button"
                onClick={handleCameraClick}
                disabled={isUploading}
                className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
                aria-label="Change profile picture"
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Profile Picture</DialogTitle>
              </DialogHeader>
              <div
                className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-emerald-400'}`}
                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={e => { e.preventDefault(); setIsDragging(false); }}
                onDrop={e => {
                  e.preventDefault(); setIsDragging(false);
                  const files = e.dataTransfer.files;
                  if (files.length > 0 && validateFile(files[0])) {
                    setError(null);
                    setPreviewFile(files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 mx-auto text-gray-400 mb-4" />
                <div className="text-sm text-gray-600">
                  {previewFile ? previewFile.name : 'Drag and drop your image here, or click to select'}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Supported formats: JPEG, PNG (max 5MB)
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              {previewFile && (
                <div className="flex flex-col items-center mt-4">
                  <Image
                    src={URL.createObjectURL(previewFile)}
                    alt="Preview"
                    width={160}
                    height={160}
                    className="w-40 h-40 object-cover rounded-full border border-gray-200"
                  />
                </div>
              )}
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              <DialogFooter>
                <button
                  onClick={handleUpload}
                  disabled={isUploading || !previewFile}
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
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {userInfo.fullName}
        </h2>
        <p className="text-gray-500">{userInfo.email}</p>
      </div>

      <div className="pt-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 ">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Full Name", value: userInfo.fullName, key: "fullName" },
            { label: "Email", value: userInfo.email, key: "email" },
            { label: "Phone Number", value: userInfo.phone, key: "phone" },
            { label: "Date of Birth", value: userInfo.dateOfBirth ? userInfo.dateOfBirth.toLocaleDateString('en-GB') : undefined, key: "dob" },
            { label: "Gender", value: userInfo.gender, key: "gender" },
            { label: "Address", value: userInfo.address, key: "address" },
          ].map(({ label, value, key }) => (
            <div key={key}>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
              <p className="text-gray-900">{value || "Not specified"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["License Number", userInfo.doctor?.licenseNumber],
            ["Specialization", userInfo.doctor?.specialty?.name],
          ].map(([label, val]) => (
            <div key={label}>
              <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
              <p className="text-gray-900">{val || "Not specified"}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DoctorProfile; 