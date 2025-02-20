import { create } from 'zustand';

interface WithdrawalRequest {
  id: string;
  userId: string;
  amount: number;
  walletAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

interface BlockchainState {
  withdrawalRequests: WithdrawalRequest[];
  addWithdrawalRequest: (request: Omit<WithdrawalRequest, 'id' | 'status' | 'createdAt'>) => void;
  updateWithdrawalStatus: (id: string, status: WithdrawalRequest['status']) => void;
  processTransaction: (walletAddress: string, amount: number) => Promise<boolean>;
}

export const useBlockchainStore = create<BlockchainState>((set) => ({
  withdrawalRequests: [],

  addWithdrawalRequest: (request) => set((state) => ({
    withdrawalRequests: [
      ...state.withdrawalRequests,
      {
        ...request,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
        createdAt: new Date()
      }
    ]
  })),

  updateWithdrawalStatus: (id, status) => set((state) => ({
    withdrawalRequests: state.withdrawalRequests.map(request =>
      request.id === id ? { ...request, status } : request
    )
  })),

  processTransaction: async (walletAddress: string, amount: number) => {
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success rate of 95%
    const isSuccess = Math.random() < 0.95;
    
    if (!isSuccess) {
      throw new Error('Transaction failed. Please try again.');
    }
    
    return true;
  }
}));