'use client';
import React, { useState, useEffect } from "react";
import {
  Users as UsersIcon,
  User as UserIcon,
  Calendar as CalendarIcon,
  Shield as ShieldIcon,
  Search as SearchIcon,
  Trash2 as TrashIcon,
  Edit2 as EditIcon,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Layout from "@/components/layout/Layout";

type RoleFilter = "ALL" | "DOCTOR" | "PATIENT" | "ADMIN";

interface Stats {
  doctors: number;
  patients: number;
  appointments: number;
  admins: number;
}

interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  role: "DOCTOR" | "PATIENT" | "ADMIN";
}

const mockStats: Stats = {
  doctors: 24,
  patients: 128,
  appointments: 312,
  admins: 3,
};

const mockUsers: AdminUser[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  fullName: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? "ADMIN" : i % 3 === 1 ? "DOCTOR" : "PATIENT",
}));

const ROLES: RoleFilter[] = ["ALL", "DOCTOR", "PATIENT", "ADMIN"];

const AdminDashboard: React.FC = () => {
  const [stats] = useState<Stats>(mockStats);
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("ALL");
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editFields, setEditFields] = useState<{
    fullName: string;
    email: string;
    role: AdminUser["role"];
  }>({ fullName: "", email: "", role: "PATIENT" });

  useEffect(() => {
    if (editingUser) {
      setEditFields({
        fullName: editingUser.fullName,
        email: editingUser.email,
        role: editingUser.role,
      });
    }
  }, [editingUser]);

  const filtered = users
    .filter((u) => {
      const q = searchQuery.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    })
    .filter((u) => roleFilter === "ALL" || u.role === roleFilter);

  const handleDelete = (id: number) => {
    if (!confirm("Delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const openEdit = (u: AdminUser) => setEditingUser(u);
  const closeEdit = () => setEditingUser(null);

  const saveEdit = () => {
    if (!editingUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id ? { ...u, ...editFields } : u
      )
    );
    closeEdit();
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <UsersIcon className="h-5 w-5 text-emerald-500" />,
              label: "Total Doctors",
              value: stats.doctors,
              delta: "+5% vs last month",
            },
            {
              icon: <UserIcon className="h-5 w-5 text-emerald-500" />,
              label: "Total Patients",
              value: stats.patients,
              delta: "+8% vs last month",
            },
            {
              icon: <CalendarIcon className="h-5 w-5 text-emerald-500" />,
              label: "Appointments",
              value: stats.appointments,
              delta: "+3% vs last month",
            },
            {
              icon: <ShieldIcon className="h-5 w-5 text-emerald-500" />,
              label: "Admins",
              value: stats.admins,
              delta: "all time",
            },
          ].map(({ icon, label, value, delta }) => (
            <div
              key={label}
              className="relative bg-white p-6 rounded-lg shadow"
            >
              <div className="absolute top-4 right-4 bg-emerald-100 p-2 rounded-full">
                {icon}
              </div>
              <dt className="text-sm font-medium text-gray-500 uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {value}
              </dd>
              <dd
                className={`mt-2 text-sm ${
                  delta.includes("%") ? "text-green-600" : "text-gray-500"
                }`}
              >
                {delta}
              </dd>
            </div>
          ))}
        </div>

        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-lg font-medium text-gray-900">
              Manage Users
            </h2>

            <div className="flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    roleFilter === r
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {r === "ALL"
                    ? "All"
                    : r.charAt(0) + r.slice(1).toLowerCase()}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-1/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or email"
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-gray-700
                           focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-[450px] divide-y divide-gray-300">
            <div className="hidden sm:grid grid-cols-4 gap-4 px-6 py-3 bg-gray-50 sticky top-0">
              <div className="text-xs font-medium text-gray-500 uppercase">
                Name
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase">
                Email
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase">
                Role
              </div>
              <div className="text-xs font-medium text-gray-500 uppercase text-center">
                Actions
              </div>
            </div>

            {filtered.length > 0 ? (
              filtered.map((u) => (
                <div
                  key={u.id}
                  className="flex flex-col sm:grid sm:grid-cols-4 gap-2 sm:gap-4 px-6 py-4 bg-white rounded-lg
                             hover:bg-gray-50"
                >
                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Name
                    </span>
                    <div className="text-sm text-gray-900 truncate">
                      {u.fullName}
                    </div>
                  </div>

                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Email
                    </span>
                    <div className="text-sm text-gray-500 truncate">
                      {u.email}
                    </div>
                  </div>

                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Role
                    </span>
                    <div className="text-sm text-gray-900">{u.role}</div>
                  </div>

                  <div>
                    <span className="block sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </span>
                    <div className="mt-1 md:flex-row flex justify-start sm:justify-end gap-2 py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center text-blue-600"
                        onClick={() => openEdit(u)}
                      >
                        <EditIcon className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center text-red-600"
                        onClick={() => handleDelete(u.id)}
                      >
                        <TrashIcon className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-sm text-gray-500">
                No users found.
              </div>
            )}
          </div>
        </div>

        {editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Edit User
              </h3>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2
                               focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={editFields.fullName}
                    onChange={(e) =>
                      setEditFields((f) => ({
                        ...f,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                  <input
                    type="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2
                               focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={editFields.email}
                    onChange={(e) =>
                      setEditFields((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                  <select
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2
                               focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={editFields.role}
                    onChange={(e) =>
                      setEditFields((f) => ({
                        ...f,
                        role: e.target.value as AdminUser["role"],
                      }))
                    }
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="DOCTOR">Doctor</option>
                    <option value="PATIENT">Patient</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closeEdit}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={saveEdit}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
