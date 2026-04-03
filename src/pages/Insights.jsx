import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';
import { Sparkles, TrendingUp, Wallet, Calculator, ArrowRight } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';

export default function Insights() {
  const { transactions } = useFinanceStore();

  const monthlyData = useMemo(() => {
    const months = transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' });
      if (!acc[month]) acc[month] = { month, income: 0, expense: 0 };
      if (t.type === 'income') acc[month].income += t.amount;
      else acc[month].expense += t.amount;
      return acc;
    }, {});
    return Object.values(months);
  }, [transactions]);

  const topCategories = useMemo(() => {
    const cats = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    return Object.entries(cats)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Insights</h1>
        <p className="text-slate-500 mt-1">Deep dive analysis of your spending habits.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Observation Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6 bg-gradient-to-br from-brand-secondary to-indigo-600 border-none text-white shadow-xl shadow-brand-secondary/20">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold backdrop-blur-md">Monthly Progress</span>
                <h2 className="text-2xl font-bold mt-4">Great job on saving!</h2>
                <p className="text-indigo-100 mt-2 max-w-md">
                  You've spent 15% less this month compared to your average. Keeping this up could lead to $5,000 extra savings by next year.
                </p>
              </div>
              <Sparkles className="w-12 h-12 text-white/50" />
            </div>
            <button className="mt-8 flex items-center gap-2 text-sm font-bold bg-white text-brand-secondary px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all active:scale-95">
              Build a Savings Plan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-secondary" />
              Income vs Expenses
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Side Stats */}
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-brand-secondary" />
              Top Spending
            </h3>
            <div className="space-y-4">
              {topCategories.map((cat, i) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded text-xs font-bold text-slate-500">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                  <span className="text-sm font-bold">${cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 border-dashed border-2 flex flex-col items-center text-center py-8">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
              <Calculator className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="font-bold">Next Forecast</h4>
            <p className="text-sm text-slate-500 mt-1">Based on current trends, your balance will grow by $2.4k next month.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
