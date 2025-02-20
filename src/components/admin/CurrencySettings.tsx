'use client';

import { useState, useEffect } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';

export default function CurrencySettings() {
  const { exchangeRates, setExchangeRate, toggleCurrency, updateExchangeRates } = useCurrencyStore();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    updateExchangeRates();
  }, [updateExchangeRates]);

  const handleRateChange = (currency: string, newRate: string) => {
    const rate = parseFloat(newRate);
    if (!isNaN(rate) && rate > 0) {
      setExchangeRate(currency, rate, exchangeRates[currency].enabled);
    }
  };

  const handleToggle = (currency: string, enabled: boolean) => {
    toggleCurrency(currency, enabled);
  };

  const handleRefreshRates = async () => {
    setIsUpdating(true);
    await updateExchangeRates();
    setIsUpdating(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Currency Settings</h2>
        <button
          onClick={handleRefreshRates}
          disabled={isUpdating}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${isUpdating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isUpdating ? 'Updating...' : 'Refresh Rates'}
        </button>
      </div>

      <div className="space-y-4">
        {Object.entries(exchangeRates).map(([currency, data]) => (
          <div key={currency} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="font-medium text-gray-900">{currency}</div>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Rate:</label>
                <input
                  type="number"
                  value={data.rate}
                  onChange={(e) => handleRateChange(currency, e.target.value)}
                  className="w-32 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  step="0.0001"
                  min="0"
                  disabled={currency === 'USD'}
                />
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {data.lastUpdated.toLocaleString()}
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.enabled}
                onChange={(e) => handleToggle(currency, e.target.checked)}
                className="sr-only peer"
                disabled={currency === 'USD'}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}