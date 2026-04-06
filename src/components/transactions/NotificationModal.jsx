import React from 'react';
import { X } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '../../data/mockNotifications';

export default function NotificationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div className="bg-[var(--card)] w-full max-w-md rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            Notifications
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-800 rounded-md transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
          {MOCK_NOTIFICATIONS.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-[var(--border)] hover:shadow-sm transition-all"
              >
                <div className={`p-2 rounded-lg ${item.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {item.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}