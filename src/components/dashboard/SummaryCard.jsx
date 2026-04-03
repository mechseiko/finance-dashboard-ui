import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function SummaryCard({ title, value, trend, trendType, icon: Icon, color }) {
  const isPositive = trendType === 'up';
  
  return (
    <div className="glass-card p-6 flex flex-col gap-4 group hover:border-brand-secondary/50 transition-all cursor-default">
      <div className="flex items-center justify-between">
        <div className={cn(
          "p-3 rounded-2xl",
          color || "bg-brand-secondary/10 text-brand-secondary"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          isPositive ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400"
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}%
        </div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-2xl font-bold tracking-tight mt-1 text-[var(--foreground)]">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
      </div>
    </div>
  );
}
