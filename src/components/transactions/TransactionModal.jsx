import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { MOCK_CATEGORIES } from '../../data/mockData';
import useFinanceStore from '../../store/useFinanceStore';
import { toast } from 'sonner';

export default function TransactionModal({ isOpen, onClose, initialData = null }) {
  const { addTransaction, updateTransaction } = useFinanceStore();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: MOCK_CATEGORIES[0],
    type: 'expense'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        description: initialData.description,
        amount: initialData.amount.toString(),
        category: initialData.category,
        type: initialData.type
      });
    } else {
      setFormData({
        description: '',
        amount: '',
        category: MOCK_CATEGORIES[0],
        type: 'expense'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid positive amount is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (initialData) {
      updateTransaction(initialData.id, transactionData);
      toast.success('Transaction updated successfully');
    } else {
      addTransaction(transactionData);
      toast.success('Transaction added successfully');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--card)] w-full max-w-md rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h3 className="text-xl font-bold">{initialData ? 'Edit Transaction' : 'New Transaction'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Type Toggle */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-[var(--border)]">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                formData.type === 'expense' 
                  ? "bg-white dark:bg-slate-700 text-rose-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                formData.type === 'income' 
                  ? "bg-white dark:bg-slate-700 text-emerald-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Income
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 ml-1">Description</label>
              <input
                type="text"
                placeholder="e.g. Monthly Salary, Grocery shock"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 transition-all focus:outline-none ${
                  errors.description ? "border-rose-500 focus:ring-rose-500/10" : "border-transparent focus:ring-brand-secondary/10"
                }`}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 ml-1">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 transition-all focus:outline-none ${
                    errors.amount ? "border-rose-500 focus:ring-rose-500/10" : "border-transparent focus:ring-brand-secondary/10"
                  }`}
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
                {errors.amount && <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.amount}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5 ml-1">Category</label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:outline-none focus:ring-brand-secondary/10 transition-all cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {MOCK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-2 px-4 py-3 bg-brand-secondary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-brand-secondary/20"
            >
              <Save className="w-4 h-4" />
              {initialData ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
