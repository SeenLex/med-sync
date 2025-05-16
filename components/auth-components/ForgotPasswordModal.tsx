import { FC, useState } from "react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

const ForgotPasswordModal: FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState<string>("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg mt-60">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <p className="mb-4 text-gray-600">Enter your email to reset your password.</p>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-emerald-600 text-white rounded-md"
            onClick={() => onSubmit(email)}
          >
            Send Reset Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
