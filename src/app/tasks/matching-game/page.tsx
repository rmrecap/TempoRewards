'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const mockProducts: Product[] = [
  { id: 1, name: "Classic Leather Shoes", price: "$59.00", image: "/images/product1.jpg" },
  { id: 2, name: "Natural Blue Light Moonstone", price: "$180.00", image: "/images/product2.jpg" },
  { id: 3, name: "Samsonite Classic Leather Slim Backpack", price: "$166.73", image: "/images/product3.jpg" },
  { id: 4, name: "Wonder Workshop Dash Robot", price: "$163.00", image: "/images/product4.jpg" }
];

export default function TaskMatchingGame() {
  const [isMatching, setIsMatching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMatching) {
      // Increase animation speed for 2 seconds, then show completion
      setTimeout(() => {
        setIsMatching(false);
        setIsCompleted(true);
        setEarnings(5.00); // Fixed earnings amount for demo
      }, 2000);
    }
  }, [isMatching]);

  const handleStartMatching = () => {
    if (!isMatching && !isCompleted) {
      setIsMatching(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Task Matching Game</h1>
      
      <div className="relative overflow-hidden mb-8">
        <div 
          ref={carouselRef}
          className={`flex transition-transform duration-[20000ms] ease-linear transform ${isMatching ? 'duration-[2000ms]' : ''}`}
          style={{
            transform: 'translateX(-50%)',
            animation: `slide ${isMatching ? '2s' : '20s'} linear infinite`
          }}
        >
          {/* Duplicate products for infinite scroll effect */}
          {[...mockProducts, ...mockProducts].map((product, index) => (
            <div 
              key={`${product.id}-${index}`}
              className="flex-none w-64 mx-4"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  <p className="text-green-600 font-medium">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        {!isCompleted ? (
          <button
            onClick={handleStartMatching}
            disabled={isMatching}
            className={`px-6 py-3 rounded-full text-white font-semibold ${isMatching ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
          >
            {isMatching ? 'Matching...' : 'Start Matching'}
          </button>
        ) : (
          <div className="space-y-4">
            <div className="text-2xl font-bold text-green-600">
              Task Completed!
            </div>
            <div className="text-lg">
              Congratulations! You earned ${earnings.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes slide {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}