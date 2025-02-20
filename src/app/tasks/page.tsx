'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDashboardStore } from '@/store/dashboardStore';

interface Product {
  id: number;
  name: string;
  price: number;
  marketValue: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Dockers Men's Wool Melton Two Pocket Full Length Down Jacket",
    price: 100,
    marketValue: 120,
    image: "/images/product1.jpg"
  },
  {
    id: 2,
    name: "Samsonite Classic Leather Slim Backpack",
    price: 200,
    marketValue: 250,
    image: "/images/product2.jpg"
  }
];

export default function TasksPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { totalTasks, completedTasks } = useDashboardStore();

  // Mock gamification data
  const dailyChallenge = {
    target: 10,
    completed: 7,
    reward: 5,
    timeLeft: '8h 45m'
  };

  const streak = {
    current: 5,
    multiplier: 1.5
  };

  useEffect(() => {
    // Simulate API fetch
    setProducts(mockProducts);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Gamification Status Bar */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Challenge Progress */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Daily Challenge Progress</h3>
            <div className="flex items-center space-x-2">
              <div className="flex-grow">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(dailyChallenge.completed / dailyChallenge.target) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium">{dailyChallenge.completed}/{dailyChallenge.target}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Complete {dailyChallenge.target - dailyChallenge.completed} more tasks to earn {dailyChallenge.reward} USDT
            </p>
          </div>

          {/* Current Streak */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Current Streak</h3>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-purple-600">{streak.current} Days</span>
              <span className="text-sm text-green-600">{streak.multiplier}x Multiplier</span>
            </div>
          </div>

          {/* Overall Progress */}
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Overall Progress</h3>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{completedTasks}/{totalTasks}</span>
              <span className="text-sm text-gray-500">Tasks Completed</span>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8">Available Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
              <div className="space-y-1 mb-4">
                <p className="text-green-600 font-medium">
                  Price: ${product.price.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  Market Value: ${product.marketValue.toFixed(2)}
                </p>
                <p className="text-sm text-purple-600">
                  Earn ${(product.price * streak.multiplier).toFixed(2)} with {streak.multiplier}x multiplier
                </p>
              </div>
              <Link
                href={`/tasks/${product.id}`}
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Task
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}