'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface PaymentMethodSettings {
  bKash: {
    enabled: boolean;
    merchantNumber: string;
  };
  Nagad: {
    enabled: boolean;
    merchantNumber: string;
  };
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PaymentMethodSettings>({
    bKash: {
      enabled: true,
      merchantNumber: '01XXXXXXXXX'
    },
    Nagad: {
      enabled: true,
      merchantNumber: '01XXXXXXXXX'
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Payment Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* bKash Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">bKash Settings</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.bKash.enabled}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    bKash: { ...prev.bKash, enabled: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="bKashNumber" className="block text-sm font-medium text-gray-700">Merchant Number</label>
                <input
                  type="text"
                  id="bKashNumber"
                  value={settings.bKash.merchantNumber}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    bKash: { ...prev.bKash, merchantNumber: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter bKash merchant number"
                  disabled={!settings.bKash.enabled}
                />
              </div>
            </div>
          </div>

          {/* Nagad Settings */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Nagad Settings</h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.Nagad.enabled}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    Nagad: { ...prev.Nagad, enabled: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="nagadNumber" className="block text-sm font-medium text-gray-700">Merchant Number</label>
                <input
                  type="text"
                  id="nagadNumber"
                  value={settings.Nagad.merchantNumber}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    Nagad: { ...prev.Nagad, merchantNumber: e.target.value }
                  }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter Nagad merchant number"
                  disabled={!settings.Nagad.enabled}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}