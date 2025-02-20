import { create } from 'zustand';
import { toast } from 'react-hot-toast';

interface ExchangeRate {
  currency: string;
  rate: number;
  enabled: boolean;
  lastUpdated: Date;
}

interface CurrencyState {
  selectedCurrency: string;
  exchangeRates: Record<string, ExchangeRate>;
  isLoading: boolean;
  error: string | null;
  setSelectedCurrency: (currency: string) => void;
  updateExchangeRates: () => Promise<void>;
  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => number;
  setExchangeRate: (currency: string, rate: number, enabled: boolean) => void;
  toggleCurrency: (currency: string, enabled: boolean) => void;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  selectedCurrency: 'USD',
  exchangeRates: {
    USD: { currency: 'USD', rate: 1, enabled: true, lastUpdated: new Date() },
    BDT: { currency: 'BDT', rate: 103, enabled: true, lastUpdated: new Date() },
    EUR: { currency: 'EUR', rate: 0.85, enabled: true, lastUpdated: new Date() },
    INR: { currency: 'INR', rate: 75, enabled: true, lastUpdated: new Date() }
  },
  isLoading: false,
  error: null,

  setSelectedCurrency: (currency: string) => {
    set({ selectedCurrency: currency });
    toast.success(`Currency updated to ${currency}`);
  },

  updateExchangeRates: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Implement API call to fetch real-time exchange rates
      // For now, using static rates
      const mockRates = {
        USD: 1,
        BDT: 103,
        EUR: 0.85,
        INR: 75
      };

      const updatedRates = Object.entries(mockRates).reduce((acc, [currency, rate]) => {
        acc[currency] = {
          currency,
          rate,
          enabled: get().exchangeRates[currency]?.enabled ?? true,
          lastUpdated: new Date()
        };
        return acc;
      }, {} as Record<string, ExchangeRate>);

      set({ exchangeRates: updatedRates });
    } catch (error) {
      set({ error: 'Failed to update exchange rates' });
      toast.error('Failed to update exchange rates');
    } finally {
      set({ isLoading: false });
    }
  },

  convertAmount: (amount: number, fromCurrency: string, toCurrency: string) => {
    const rates = get().exchangeRates;
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      return amount;
    }

    const fromRate = rates[fromCurrency].rate;
    const toRate = rates[toCurrency].rate;
    return (amount / fromRate) * toRate;
  },

  setExchangeRate: (currency: string, rate: number, enabled: boolean) => {
    set(state => ({
      exchangeRates: {
        ...state.exchangeRates,
        [currency]: {
          ...state.exchangeRates[currency],
          rate,
          enabled,
          lastUpdated: new Date()
        }
      }
    }));
    toast.success(`Exchange rate updated for ${currency}`);
  },

  toggleCurrency: (currency: string, enabled: boolean) => {
    set(state => ({
      exchangeRates: {
        ...state.exchangeRates,
        [currency]: {
          ...state.exchangeRates[currency],
          enabled
        }
      }
    }));
    toast.success(`${currency} has been ${enabled ? 'enabled' : 'disabled'}`);
  }
}));