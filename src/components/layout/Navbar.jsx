import React, { useState } from 'react';
import { Search, Menu, Sun, Moon, Shield, Eye, Bell } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import NotificationModal from '../transactions/NotificationModal';

const cn = (...inputs) => twMerge(clsx(inputs));

export default function Navbar({ onMenuClick, isDarkMode, toggleDarkMode }) {
  const { role, setRole } = useFinanceStore();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div>
      <nav className="h-16 bg-[var(--card)] border-b border-[var(--border)] px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 text-slate-500 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 *:cursor-pointer dark:bg-slate-800 p-1 rounded-xl border border-[var(--border)]">
            <button
              onClick={() => { setRole('Viewer'); toast.success('Switched to Viewer Role') }}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                role === 'Viewer'
                  ? "bg-white dark:bg-slate-700 text-brand-secondary shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Viewer</span>
            </button>
            <button
              onClick={() => { setRole('Admin'); toast.success("Switched to Admin Role") }}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                role === 'Admin'
                  ? "bg-brand-secondary text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>

          <div className="h-6 w-px bg-[var(--border)] mx-1" />

          <button
            title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-[var(--border)] transition-all active:scale-90"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button title='Notifications' onClick={() => { setIsNotificationOpen(true) }} className="p-2 text-slate-500 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative border border-[var(--border)] transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--card)]" />
          </button>
        </div>
      </nav>
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
}
