import React from 'react';
import { AppNotification } from '../types';
import { Bell, CheckCircle2, Clock, AlertTriangle, Briefcase, Sparkles, X } from 'lucide-react';

interface NotificationCenterProps {
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkRead,
  onClose,
  onNavigateTab
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Opportunity Notifications</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onMarkRead(n.id)}
              className={`p-4 rounded-2xl border transition-all text-xs space-y-2 cursor-pointer ${
                n.read ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-blue-50/40 border-blue-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{n.title}</span>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{n.message}</p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateTab('opportunities');
                    onClose();
                  }}
                  className="px-3 py-1 bg-blue-600 text-white font-bold text-[11px] rounded-lg shadow-sm"
                >
                  View Matched Role →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
          Notifications are automatically tailored to your verified skill profile and graduation year.
        </div>

      </div>
    </div>
  );
};
