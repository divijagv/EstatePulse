
import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start gap-4">
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        {trend && (
          <div className={`flex items-center mt-2 text-xs font-semibold ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            <span>{trend.isPositive ? '↑' : '↓'} {trend.value}%</span>
            <span className="text-slate-400 ml-1 font-normal">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
