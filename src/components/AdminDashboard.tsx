import React from 'react';
import { 
  BookOpen, 
  Users, 
  BookMarked, 
  Receipt,
  TrendingUp,
  AlertCircle,
  Clock
} from 'lucide-react';
import type { DashboardStats } from '../types';

// Dummy data for dashboard stats
const dashboardStats: DashboardStats = {
  totalBooks: 1250,
  activeUsers: 450,
  currentLoans: 89,
  totalTransactions: 2456,
  recentTransactions: [],
  popularBooks: [],
  activeLoans: []
};

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: number;
}> = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="p-2 bg-blue-50 rounded-lg">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</p>
        </div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  </div>
);

const RecentActivity: React.FC = () => (
  <div className="bg-white rounded-lg shadow">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
    </div>
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="p-2 bg-yellow-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">5 books due today</p>
            <p className="text-sm text-gray-500">Reminder emails have been sent</p>
            <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-2 bg-green-50 rounded-lg">
            <BookOpen className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">New book added to inventory</p>
            <p className="text-sm text-gray-500">"The Midnight Library" - 15 copies</p>
            <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">Monthly report generated</p>
            <p className="text-sm text-gray-500">February 2024 statistics are ready</p>
            <p className="text-xs text-gray-400 mt-1">1 day ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your library's key metrics and recent activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={dashboardStats.totalBooks}
          icon={<BookOpen className="w-6 h-6 text-blue-600" />}
          trend={5}
        />
        <StatCard
          title="Active Users"
          value={dashboardStats.activeUsers}
          icon={<Users className="w-6 h-6 text-blue-600" />}
          trend={12}
        />
        <StatCard
          title="Current Loans"
          value={dashboardStats.currentLoans}
          icon={<BookMarked className="w-6 h-6 text-blue-600" />}
          trend={-3}
        />
        <StatCard
          title="Total Transactions"
          value={dashboardStats.totalTransactions}
          icon={<Receipt className="w-6 h-6 text-blue-600" />}
          trend={8}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Popular Books</h3>
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-500">Loading popular books...</div>
          </div>
        </div>
        <RecentActivity />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Loans</h3>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-500">Loading active loans...</div>
        </div>
      </div>
    </div>
  );
};