import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFinanceStore = create(
  persist(
    (set) => ({
      transactions: [],
      role: 'Admin', // Default to Admin for assignment demonstration
      
      // Actions
      setRole: (role) => set({ role }),
      
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: crypto.randomUUID(), date: new Date().toISOString() },
          ...state.transactions,
        ],
      })),
      
      updateTransaction: (id, updatedData) => set((state) => ({
        transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updatedData } : t)),
      })),
      
      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      })),
      
      setTransactions: (transactions) => set({ transactions }),
    }),
    {
      name: 'finance-storage',
    }
  )
);

export default useFinanceStore;
