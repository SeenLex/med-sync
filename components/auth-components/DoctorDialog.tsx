import React from "react";
import Button from "../ui/Button";

interface DoctorDialogProps {
  open: boolean;
  specialty: string;
  setSpecialty: (val: string) => void;
  licenseNumber: string;
  setLicenseNumber: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const DoctorDialog: React.FC<DoctorDialogProps> = ({
  open,
  specialty,
  setSpecialty,
  licenseNumber,
  setLicenseNumber,
  onSave,
  onCancel,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-bold mb-4 text-gray-700">Doctor Details</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Specialty</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-gray-700"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="e.g. Cardiologist"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">License Number</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 text-gray-700"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder="e.g. 123456"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onSave}
            disabled={!specialty || !licenseNumber}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDialog;
