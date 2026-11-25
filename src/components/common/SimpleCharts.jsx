import React from 'react';

// Lightweight, responsive SVG-based charts with tooltips and clean aesthetics

// 1. Line / Area Chart for Semester Performance
export const PerformanceTrendChart = ({ data, height = 220 }) => {
  // data: [{ label: 'Sem 1', value: 8.42 }, { label: 'Sem 2', value: 8.55 }, ...]
  if (!data || data.length === 0) return null;

  const padding = { top: 20, right: 30, bottom: 35, left: 40 };
  const width = 500;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map(d => d.value);
  const minVal = Math.floor(Math.min(...values) * 0.95);
  const maxVal = 10; // SGPA out of 10

  const getX = (idx) => padding.left + (idx / (data.length - 1)) * chartWidth;
  const getY = (val) => padding.top + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;

  // Generate SVG polygon points
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const areaPoints = `${points} ${getX(data.length - 1)},${height - padding.bottom} ${padding.left},${height - padding.bottom}`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[320px] overflow-visible">
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[minVal, (minVal + maxVal) / 2, maxVal].map((val, idx) => {
          const y = getY(val);
          return (
            <g key={idx}>
              <line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#94a3b8"
                strokeOpacity="0.2"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 8}
                y={y + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-mono"
              >
                {val.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Filled Area */}
        <polygon points={areaPoints} fill="url(#trendGradient)" />

        {/* Trend Line */}
        <polyline
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />

        {/* Data points & X Labels */}
        {data.map((d, i) => {
          const cx = getX(i);
          const cy = getY(d.value);
          return (
            <g key={i} className="group cursor-pointer">
              <circle
                cx={cx}
                cy={cy}
                r="5"
                className="fill-white dark:fill-slate-900 stroke-brand-600 stroke-[3] transition-all group-hover:r-7"
              />
              <text
                x={cx}
                y={cy - 12}
                textAnchor="middle"
                className="text-[11px] font-bold fill-brand-700 dark:fill-brand-300"
              >
                {d.value}
              </text>
              <text
                x={cx}
                y={height - 10}
                textAnchor="middle"
                className="text-[11px] font-medium fill-slate-500 dark:fill-slate-400"
              >
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// 2. Bar Chart for Subject Comparison
export const SubjectBarChart = ({ data, height = 240 }) => {
  // data: [{ subject: 'Algo', marks: 88, max: 100 }, ...]
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full space-y-3.5 pt-2">
      {data.map((item, idx) => {
        const percentage = Math.round((item.marks / item.max) * 100);
        const isGood = percentage >= 75;
        const isAverage = percentage >= 60 && percentage < 75;

        return (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {item.subject}
              </span>
              <div className="flex items-center space-x-2">
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {item.marks}/{item.max}
                </span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                    isGood
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : isAverage
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {percentage}%
                </span>
              </div>
            </div>

            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  isGood
                    ? 'bg-gradient-to-r from-brand-500 to-emerald-500'
                    : isAverage
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                    : 'bg-gradient-to-r from-rose-500 to-rose-600'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 3. Circular Donut Gauge for Attendance
export const AttendanceGauge = ({ percentage = 88.5, size = 160, strokeWidth = 14, threshold = 75 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const isSafe = percentage >= threshold;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-1000 ease-out ${
            isSafe ? 'text-brand-600 dark:text-brand-500' : 'text-rose-500'
          }`}
          fill="transparent"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
          {percentage}%
        </span>
        <span
          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mt-0.5 ${
            isSafe
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse'
          }`}
        >
          {isSafe ? 'Eligible' : 'Shortage'}
        </span>
      </div>
    </div>
  );
};

// 4. Distribution Chart (for Admin Analytics)
export const DistributionBars = ({ distribution = [] }) => {
  // [{ label: 'O (90-100%)', count: 18, color: 'emerald' }, ...]
  const max = Math.max(...distribution.map(d => d.count), 1);

  return (
    <div className="space-y-3">
      {distribution.map((d, i) => {
        const pct = Math.round((d.count / max) * 100);
        return (
          <div key={i} className="flex items-center space-x-3 text-xs">
            <span className="w-24 font-medium text-slate-600 dark:text-slate-400 shrink-0">
              {d.label}
            </span>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-600 dark:bg-brand-500 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-12 text-right font-mono font-bold text-slate-700 dark:text-slate-300">
              {d.count} ({Math.round((d.count / 42) * 100)}%)
            </span>
          </div>
        );
      })}
    </div>
  );
};
