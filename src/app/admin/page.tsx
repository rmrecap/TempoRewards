'use client';

import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { useBlockchainStore } from '@/services/blockchainService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface StatsCard {
  title: string;
  value: string | number;
  description: string;
  trend?: {
    value: number;
    label: string;
  };
}

export default function AdminDashboard() {
  const { totalTasks, completedTasks, totalEarnings } = useDashboardStore();
  const { withdrawalRequests, updateWithdrawalStatus } = useBlockchainStore();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  // Mock data for charts
  const userActivityData = [
    { date: '2024-01-01', activeUsers: 1200, newUsers: 150 },
    { date: '2024-01-02', activeUsers: 1300, newUsers: 160 },
    { date: '2024-01-03', activeUsers: 1400, newUsers: 140 },
    { date: '2024-01-04', activeUsers: 1350, newUsers: 155 },
    { date: '2024-01-05', activeUsers: 1500, newUsers: 180 },
  ];

  const taskCompletionData = [
    { date: '2024-01-01', completed: 450, commission: 2250 },
    { date: '2024-01-02', completed: 480, commission: 2400 },
    { date: '2024-01-03', completed: 520, commission: 2600 },
    { date: '2024-01-04', completed: 490, commission: 2450 },
    { date: '2024-01-05', completed: 550, commission: 2750 },
  ];

  const stats: StatsCard[] = [
    {
      title: 'Total Users',
      value: '2,543',
      description: 'Active platform users',
      trend: {
        value: 12.5,
        label: 'vs last month'
      }
    },
    {
      title: 'Tasks Completed',
      value: completedTasks,
      description: `${((completedTasks / totalTasks) * 100).toFixed(1)}% completion rate`,
      trend: {
        value: 8.2,
        label: 'vs last month'
      }
    },
    {
      title: 'Total Earnings',
      value: `$${totalEarnings.toFixed(2)}`,
      description: 'Platform revenue',
      trend: {
        value: 15.3,
        label: 'vs last month'
      }
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-700">Track platform performance and user activity</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.title}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <p className="truncate text-sm font-medium text-gray-500">{item.title}</p>
            </dt>
            <dd className="flex items-baseline pb-6">
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
              {item.trend && (
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${item.trend.value >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  {item.trend.value >= 0 ? '↑' : '↓'}
                  {Math.abs(item.trend.value)}%
                  <span className="text-gray-500 ml-1">{item.trend.label}</span>
                </p>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <span className="font-medium text-gray-500">{item.description}</span>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Date Range Filter */}
      <div className="mb-8 flex gap-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            className="bg-white"
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            className="bg-white"
          />
        </LocalizationProvider>
      </div>

      {/* Analytics Charts */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-900">User Activity</h3>
          <LineChart width={500} height={300} data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" name="Active Users" />
            <Line type="monotone" dataKey="newUsers" stroke="#82ca9d" name="New Users" />
          </LineChart>
        </div>

        <div className="overflow-hidden rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Task Completion & Commission</h3>
          <BarChart width={500} height={300} data={taskCompletionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="completed" fill="#8884d8" name="Tasks Completed" />
            <Bar yAxisId="right" dataKey="commission" fill="#82ca9d" name="Commission Paid ($)" />
          </BarChart>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
            <div className="mt-6 flow-root">
              <ul className="-mb-8">
                <li className="mb-4">
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                          <span className="text-white text-sm">U</span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">New user registered</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">2 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="mb-4">
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                          <span className="text-white text-sm">T</span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">Task completed</span>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">5 minutes ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                Add New Task
              </button>
              <button className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                View Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Requests Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">User ID</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount (USDT)</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Wallet Address</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {withdrawalRequests.map((request) => (
                <tr key={request.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{request.userId}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{request.amount.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">{request.walletAddress}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {request.createdAt.toLocaleDateString()}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {request.status === 'pending' && (
                      <div className="space-x-4">
                        <button
                          onClick={() => updateWithdrawalStatus(request.id, 'approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateWithdrawalStatus(request.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}