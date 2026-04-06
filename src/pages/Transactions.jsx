import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Plus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  PlusCircle, 
  ArrowUpRight, 
  ArrowDownLeft 
} from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import TransactionModal from '../components/transactions/TransactionModal';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Transactions() {
  const { transactions, role, deleteTransaction } = useFinanceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || t.type === typeFilter;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        const factor = sortConfig.direction === 'asc' ? 1 : -1;
        if (sortConfig.key === 'amount') return (a.amount - b.amount) * factor;
        return (new Date(a.date) - new Date(b.date)) * factor;
      });
  }, [transactions, searchTerm, typeFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
      toast.success('Transaction deleted successfully');
    }
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-slate-500 mt-1">Manage your financial history.</p>
        </div>
        
        {role === 'Admin' && (
          <button 
            onClick={openAddModal}
            className="btn-primary cursor-pointer flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-[var(--card)] p-4 rounded-xl border border-[var(--border)]">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by description or category..." 
            className="w-full pl-10 pr-4 py-2 text-white rounded-lg bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-brand-secondary/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select 
            className="px-4 py-2 rounded-md text-white bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium focus:ring-2 focus:ring-brand-secondary/20 transition-all cursor-pointer"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-slate-50/50 dark:bg-slate-800/50">
              <th className="px-6 py-4 font-semibold text-sm text-slate-600 dark:text-slate-400">
                <button onClick={() => handleSort('date')} className="flex items-center gap-1 hover:text-brand-secondary transition-colors">
                  Date <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-600 dark:text-slate-400">Description</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-600 dark:text-slate-400">Category</th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-600 dark:text-slate-400">
                <button onClick={() => handleSort('amount')} className="flex items-center gap-1 hover:text-brand-secondary transition-colors">
                  Amount <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 font-semibold text-sm text-slate-600 dark:text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {filteredTransactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      t.type === 'income' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {t.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    </div>
                    <span className="font-medium text-[var(--foreground)]">{t.description}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-400">
                    {t.category}
                  </span>
                </td>
                <td className={cn(
                  "px-6 py-4 font-bold text-sm",
                  t.type === 'income' ? "text-emerald-600" : "text-rose-600"
                )}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {role === 'Admin' ? (
                      <>
                        <button 
                          onClick={() => openEditModal(t)}
                          className="p-1.5 hover:text-brand-secondary cursor-pointer hover:bg-brand-secondary/5 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(t.id)}
                          className="p-1.5 hover:text-rose-500 cursor-pointer hover:bg-rose-500/5 rounded-lg transition-colors text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 italic">View Only</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredTransactions.length === 0 && (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-semibold">No results found</h4>
            <p className="text-slate-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialData={editingTransaction}
      />
    </div>
  );
}
