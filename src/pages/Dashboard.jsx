import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend}  from 'recharts';
import { DollarSign, ArrowUpCircle, ArrowDownCircle, Info, TrendingUp } from 'lucide-react';
import useFinanceStore from '../store/useFinanceStore';
import SummaryCard from '../components/dashboard/SummaryCard';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function Dashboard() {
  const { transactions } = useFinanceStore();

  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;

    return { 
      income, 
      expenses, 
      balance,
      incomeTrend: 12.5,
      expenseTrend: -8.2,
      balanceTrend: 15.3
    };
  }, [transactions]);

  const chartData = useMemo(() => {
    // Group transactions by date for the area chart
    const dailyData = transactions.reduce((acc, t) => {
      const date = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0, balance: 0 };
      if (t.type === 'income') acc[date].income += t.amount;
      else acc[date].expense += t.amount;
      return acc;
    }, {});

    const sortedDays = Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    return sortedDays.map(day => {
      runningBalance += (day.income - day.expense);
      return { ...day, balance: runningBalance };
    });
  }, [transactions]);

  const categoryData = useMemo(() => {
    const categories = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});
    
    return Object.entries(categories)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time overview of your financial health.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Total Balance" 
          value={stats.balance} 
          trend={stats.balanceTrend} 
          trendType="up" 
          icon={DollarSign}
          color="bg-brand-secondary/10 text-brand-secondary"
        />
        <SummaryCard 
          title="Total Income" 
          value={stats.income} 
          trend={stats.incomeTrend} 
          trendType="up" 
          icon={ArrowUpCircle}
          color="bg-emerald-500/10 text-emerald-500"
        />
        <SummaryCard 
          title="Total Expenses" 
          value={stats.expenses} 
          trend={stats.expenseTrend} 
          trendType="down" 
          icon={ArrowDownCircle}
          color="bg-rose-500/10 text-rose-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Balance Trend */}
        <div className="glass-card p-6 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Balance Trend</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
              Net Balance
            </div>
          </div>
          <div className="flex-1 w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }} 
                />
                <YAxis 
                  hide 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderColor: 'var(--border)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Breakdown */}
        <div className="glass-card p-6 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Spending by Category</h3>
            <span className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <Info className="w-4 h-4 text-slate-500" />
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {categoryData.length === 0 && (
              <p className="text-slate-500 text-sm mt-4">No expense data available</p>
            )}
          </div>
        </div>
      </div>

      {/* Insights Row */}
      <div className="glass-card p-6 bg-brand-secondary/5 border-brand-secondary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-secondary text-white rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-[var(--foreground)]">Smart Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <span className="text-xl">🥗</span>
                <p className="text-sm">
                  Your highest spending category is <span className="font-bold text-brand-secondary">{categoryData[0]?.name || 'None'}</span>.
                </p>
              </div>
              <div className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                <span className="text-xl">💰</span>
                <p className="text-sm">
                  You've saved <span className="font-bold text-emerald-500">{((stats.balance / stats.income) * 100 || 0).toFixed(1)}%</span> of your income this month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
