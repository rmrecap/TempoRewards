import { create } from 'zustand';
import { toast } from 'react-hot-toast';

interface PaymentMethod {
  id: 'bKash' | 'Nagad';
  enabled: boolean;
  merchantNumber: string;
}

interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  paymentMethod: PaymentMethod['id'];
  phoneNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  note?: string;
  createdAt: Date;
}

interface PaymentState {
  paymentMethods: {
    bKash: PaymentMethod;
    Nagad: PaymentMethod;
  };
  withdrawalRequests: WithdrawalRequest[];
  updatePaymentMethod: (id: PaymentMethod['id'], updates: Partial<PaymentMethod>) => void;
  addWithdrawalRequest: (request: Omit<WithdrawalRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateWithdrawalStatus: (id: string, status: WithdrawalRequest['status'], note?: string) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  paymentMethods: {
    bKash: {
      id: 'bKash',
      enabled: true,
      merchantNumber: '01XXXXXXXXX'
    },
    Nagad: {
      id: 'Nagad',
      enabled: true,
      merchantNumber: '01XXXXXXXXX'
    }
  },

  withdrawalRequests: [],

  updatePaymentMethod: (id, updates) => set((state) => ({
    paymentMethods: {
      ...state.paymentMethods,
      [id]: { ...state.paymentMethods[id], ...updates }
    }
  })),

  addWithdrawalRequest: (request) => set((state) => {
    const newRequest: WithdrawalRequest = {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date()
    };

    toast.success('Withdrawal request submitted successfully');

    return {
      withdrawalRequests: [...state.withdrawalRequests, newRequest]
    };
  }),

  updateWithdrawalStatus: (id, status, note) => set((state) => {
    const updatedRequests = state.withdrawalRequests.map(request =>
      request.id === id ? { ...request, status, note } : request
    );

    const request = updatedRequests.find(r => r.id === id);
    if (request) {
      const message = status === 'approved'
        ? `Your withdrawal of ${request.amount} BDT via ${request.paymentMethod} has been processed successfully.`
        : `Your withdrawal request has been rejected. ${note ? `Reason: ${note}` : ''}`;
      toast(message, { icon: status === 'approved' ? '✅' : '❌' });
    }

    return { withdrawalRequests: updatedRequests };
  })
}));