import React, { useState, useEffect } from "react";
import { Patient } from "@/types";
import { Search, User } from "lucide-react";
import Button from "@/components/ui/Button";

interface RecentPatientsProps {
  doctorId: number;
}

const RecentPatients: React.FC<RecentPatientsProps> = ({ doctorId }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      try {
        const mockPatients: Patient[] = Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          userId: i + 1,
          user: {
            id: `user-${i + 1}`,
            email: `patient${i + 1}@example.com`,
            fullName: `Patient ${i + 1}`,
            role: "PATIENT",
            phone: `+1 (555) ${100 + i}-${2000 + i}`,
            dateOfBirth: new Date(1980 + i, i % 12, (i % 28) + 1),
            gender: i % 2 === 0 ? "Male" : "Female",
            createdAt: new Date(2022, 0, i + 1),
            updatedAt: new Date(2022, 0, i + 1),
          },
          insuranceInfo: `Insurance Provider #${i + 1}`,
          emergencyContact: `Emergency Contact ${i + 1}, +1 (555) ${300 + i}-${4000 + i}`,
        }));

        setPatients(mockPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, [doctorId]);

  const filteredPatients = patients.filter((patient) =>
    patient.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateAge = (dateOfBirth?: Date | null) => {
    if (!dateOfBirth) return "N/A";
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }
    return age;
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading patients...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Patients</h2>
        <Button variant="primary" size="sm">
          Add New Patient
        </Button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search patients by name or email"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-y-auto max-h-[400px] pr-2 rounded-md">
        <table className="min-w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age/Gender
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insurance
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.user.fullName}</div>
                        <div className="text-sm text-gray-500">{patient.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{calculateAge(patient.user.dateOfBirth)} years</div>
                    <div className="text-sm text-gray-500">{patient.user.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.insuranceInfo || "Not provided"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm" className="mr-2">View</Button>
                    <Button variant="secondary" size="sm">Schedule</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No patients found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPatients;
