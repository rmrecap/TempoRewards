'use client';

import { useEffect } from 'react';
import { useCurrencyStore } from '@/store/currencyStore';

interface CurrencySelectorProps {
  className?: string;
}

export default function CurrencySelector({ className = '' }: CurrencySelectorProps) {
  const { selectedCurrency, exchangeRates, setSelectedCurrency, updateExchangeRates } = useCurrencyStore();

  useEffect(() => {
    updateExchangeRates();
  }, [updateExchangeRates]);

  const enabledCurrencies = Object.entries(exchangeRates)
    .filter(([_, data]) => data.enabled)
    .map(([currency]) => currency);

  return (
    <select
      value={selectedCurrency}
      onChange={(e) => setSelectedCurrency(e.target.value)}
      className={`block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${className}`}
    >
      {enabledCurrencies.map((currency) => (
        <option key={currency} value={currency}>
          {currency}
        </option>
      ))}
    </select>
  );
}