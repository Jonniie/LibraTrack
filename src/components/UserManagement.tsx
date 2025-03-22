import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  Shield,
  Ban,
  Trash2,
} from "lucide-react";
import type { User } from "../types";

// Sample user data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "Demo Joe",
    email: "demo@gmail.com",
    role: "user",
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2024-03-10",
    borrowedBooks: ["1", "2"],
    totalSpent: 20,
    borrowHistory: [],
    purchaseHistory: [],
  },
  {
    id: "2",
    name: "Admin Smith",
    email: "admin@gmail.com",
    role: "admin",
    status: "active",
    joinedAt: "2023-11-20",
    lastActive: "2024-03-11",
    borrowedBooks: [],
    totalSpent: 170,
    borrowHistory: [],
    purchaseHistory: [],
  },
];

const UserActionMenu: React.FC<{
  user: User;
  onAction: (action: string) => void;
}> = ({ user, onAction }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded-full"
      >
        <MoreVertical className="w-5 h-5 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            <button
              onClick={() => {
                onAction("edit");
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Change Role
            </button>
            {user.status === "active" ? (
              <button
                onClick={() => {
                  onAction("suspend");
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-yellow-600 flex items-center gap-2"
              >
                <Ban className="w-4 h-4" />
                Suspend Account
              </button>
            ) : (
              <button
                onClick={() => {
                  onAction("activate");
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-green-600 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Activate Account
              </button>
            )}
            <button
              onClick={() => {
                onAction("delete");
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-600 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UserRow: React.FC<{ user: User }> = ({ user }) => {
  const handleAction = (action: string) => {
    console.log(`Action ${action} for user ${user.id}`);
    // TODO: Implement actual action handling
  };

  const statusColors = {
    active: "bg-green-100 text-green-800",
    suspended: "bg-yellow-100 text-yellow-800",
  };

  const roleColors = {
    admin: "bg-purple-100 text-purple-800",
    user: "bg-gray-100 text-gray-800",
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">
                {user.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            roleColors[user.role]
          }`}
        >
          {user.role}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
            statusColors[user.status]
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.joinedAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.borrowedBooks.length}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${user.totalSpent.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <UserActionMenu user={user} onAction={handleAction} />
      </td>
    </tr>
  );
};

export const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(sampleUsers);

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-600">
          Manage library members and staff accounts
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center max-w-lg">
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <UserPlus className="h-5 w-5 mr-2" />
                Add User
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Joined
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Books
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Spent
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
