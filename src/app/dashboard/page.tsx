'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

import { useDashboardStore } from '@/store/dashboardStore';
import { useBlockchainStore } from '@/services/blockchainService';
import { useUserStore } from '@/store/userStore';

export default function DashboardPage() {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { 
    totalTasks,
    completedTasks,
    totalEarnings,
    dailyEarnings,
    commissions 
  } = useDashboardStore();
  const { currentUser, getReferralLink } = useUserStore();

  // Mock data for gamification features
  const dailyChallenge = {
    target: 10,
    completed: 7,
    reward: 5,
    timeLeft: '8h 45m'
  };

  const streak = {
    current: 5,
    best: 12,
    multiplier: 1.5
  };

  const leaderboard = [
    { rank: 1, name: 'John D.', earnings: 1250.50 },
    { rank: 2, name: 'Sarah M.', earnings: 980.25 },
    { rank: 3, name: 'Mike R.', earnings: 875.00 }
  ];

  return (
    <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Task Progress Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Task Progress</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm sm:text-base">Completed Tasks</span>
            <span className="text-base sm:text-lg font-medium">{completedTasks}/{totalTasks}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3 sm:mt-4">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Earnings</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Total Earnings</span>
              <span className="text-base sm:text-lg font-medium text-green-600">
                {totalEarnings.toFixed(2)} USDT
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Daily Earnings</span>
              <span className="text-base sm:text-lg font-medium text-green-600">
                {dailyEarnings.toFixed(2)} USDT
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Commissions</span>
              <span className="text-base sm:text-lg font-medium text-green-600">
                {commissions.toFixed(2)} USDT
              </span>
            </div>
          </div>
        </div>

        {/* Withdrawal Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Withdrawal</h2>
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm sm:text-base touch-manipulation"
          >
            Withdraw Earnings
          </button>
        </div>
      </div>

      {/* Gamification Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Daily Challenge Card */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Daily Challenge</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm sm:text-base">Progress</span>
              <span className="text-base sm:text-lg font-medium">{dailyChallenge.completed}/{dailyChallenge.target} Tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${(dailyChallenge.completed / dailyChallenge.target) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Reward</span>
              <span className="font-medium text-green-600 text-sm">{dailyChallenge.reward} USDT</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Time Left</span>
              <span className="font-medium text-orange-600 text-sm">{dailyChallenge.timeLeft}</span>
            </div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Task Streak</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Streak</span>
              <span className="text-lg font-medium text-purple-600">{streak.current} Days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Best Streak</span>
              <span className="text-sm font-medium">{streak.best} Days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Reward Multiplier</span>
              <span className="text-sm font-medium text-green-600">{streak.multiplier}x</span>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              Complete tasks daily to increase your streak and earn more!
            </div>
          </div>
        </div>

        {/* Leaderboard Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Earners</h2>
          <div className="space-y-4">
            {leaderboard.map((user) => (
              <div key={user.rank} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full ${user.rank === 1 ? 'bg-yellow-100 text-yellow-700' : user.rank === 2 ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>
                    {user.rank}
                  </span>
                  <span className="text-gray-900">{user.name}</span>
                </div>
                <span className="font-medium text-green-600">${user.earnings.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referral Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Referral Program</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total Referrals</span>
            <span className="text-lg font-medium text-blue-600">
              {currentUser?.referralCount || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Referral Earnings</span>
            <span className="text-lg font-medium text-green-600">
              {currentUser?.referralRewards?.toFixed(2) || '0.00'} USDT
            </span>
          </div>
          <div className="pt-2">
            <p className="text-sm text-gray-600 mb-2">Your Referral Link:</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={getReferralLink()}
                className="flex-1 p-2 text-sm bg-gray-50 border border-gray-200 rounded-md"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getReferralLink());
                  toast.success('Referral link copied!');
                }}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}