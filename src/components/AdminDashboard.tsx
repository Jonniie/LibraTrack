import React from "react";
import {
  BookOpen,
  Users,
  BookMarked,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import type { BookType } from "../types";
// import useStore from "../store/useStore";

const StatCard: React.FC<{
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
}> = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 bg-blue-50 rounded-lg">{icon}</div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
      {trend !== undefined && (
        <div
          className={`flex items-center ${
            trend >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  </div>
);

export const AdminDashboard = ({ books }: { books: BookType[] }) => {
  const totalRevenue = 0;
  const transactions: [] = [];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600">
          Monitor your library's key metrics and recent activity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={books.length}
          icon={<BookOpen className="w-6 h-6 text-blue-600" />}
          trend={5}
        />
        <StatCard
          title="Active Users"
          value={2}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          trend={100}
        />
        <StatCard
          title="Books Borrowed"
          value={books.filter((b) => b.status === "borrowed").length}
          icon={<BookMarked className="w-6 h-6 text-blue-600" />}
          trend={-40}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign className="w-6 h-6 text-blue-600" />}
          trend={0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Transactions
            </h3>
          </div>
          <div className="p-6">
            {transactions.length === 0 ? (
              <p className="text-gray-500">No recent transactions</p>
            ) : (
              <div className="space-y-4"></div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">System Alerts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {books.filter((b) => b.stockLevel < 3).length > 0 && (
                <div className="flex items-start">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Low Stock Alert
                    </p>
                    <p className="text-sm text-gray-500">
                      {books.filter((b) => b.stockLevel < 3).length} books are
                      running low on stock
                    </p>
                  </div>
                </div>
              )}

              {books.filter((b) => b.status === "borrowed").length > 0 && (
                <div className="flex items-start">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookMarked className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Currently Borrowed
                    </p>
                    <p className="text-sm text-gray-500">
                      {books.filter((b) => b.status === "borrowed").length}{" "}
                      books are currently borrowed
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
