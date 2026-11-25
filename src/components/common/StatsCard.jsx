import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend, // { value: "+4.2%", positive: true } or string
  color = 'indigo', // indigo, emerald, amber, rose, sky, purple
  onClick,
  badge
}) => {
  const colorMap = {
    indigo: {
      bg: 'bg-brand-500/10 dark:bg-brand-500/20',
      text: 'text-brand-600 dark:text-brand-400',
      ring: 'group-hover:ring-brand-500/30'
    },
    emerald: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      ring: 'group-hover:ring-emerald-500/30'
    },
    amber: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400',
      ring: 'group-hover:ring-amber-500/30'
    },
    rose: {
      bg: 'bg-rose-500/10 dark:bg-rose-500/20',
      text: 'text-rose-600 dark:text-rose-400',
      ring: 'group-hover:ring-rose-500/30'
    },
    sky: {
      bg: 'bg-sky-500/10 dark:bg-sky-500/20',
      text: 'text-sky-600 dark:text-sky-400',
      ring: 'group-hover:ring-sky-500/30'
    },
    purple: {
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      ring: 'group-hover:ring-purple-500/30'
    }
  };

  const scheme = colorMap[color] || colorMap.indigo;

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200/80 dark:border-slate-800 shadow-subtle transition-all duration-200 hover:shadow-card hover:-translate-y-0.5 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {value}
            </h3>
            {badge && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {badge}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${scheme.bg} ${scheme.text}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
          {trend && (
            <div
              className={`inline-flex items-center text-xs font-semibold ${
                trend.positive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : trend.neutral
                  ? 'text-slate-500 dark:text-slate-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {trend.positive ? (
                <TrendingUp className="w-3.5 h-3.5 mr-1 shrink-0" />
              ) : trend.neutral ? (
                <Minus className="w-3.5 h-3.5 mr-1 shrink-0" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 mr-1 shrink-0" />
              )}
              {trend.value}
            </div>
          )}
          {subtitle && (
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
