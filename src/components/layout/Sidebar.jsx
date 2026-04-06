import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, BarChart3, Settings, Shield, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Receipt, label: 'Transactions', path: '/transactions' },
  { icon: BarChart3, label: 'Insights', path: '/insights' },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 top-0 left-0 bg-[var(--card)] border-r border-[var(--border)] transition-transform duration-300 lg:translate-x-0 lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-secondary rounded-xl flex items-center justify-center shadow-md">
              <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[var(--foreground)]">Zorvyn</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Finance Tracker</p>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-3 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-4 md:py-3 py-2 rounded-lg transition-all group",
                  isActive 
                    ? "bg-brand-secondary text-white shadow-md shadow-brand-secondary/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t dark:border-[var(--border)]">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                <User className="w-6 h-6 text-slate-500" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate text-black">Abdulqoyum</p>
                <p className="text-xs text-slate-500 truncate">Intern</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
