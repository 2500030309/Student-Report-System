import React from 'react';

// Responsive SVG-based Bar Chart for Subject Comparison
export const SubjectBarChart = ({ data = [], height = 240 }) => {
  if (!data || data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-xs text-slate-400">No chart data available</div>;
  }

  const maxVal = Math.max(...data.map(d => d.value), 100);

  return (
    <div className="w-full">
      <div className="flex items-end justify-between space-x-2 pt-6" style={{ height: `${height}px` }}>
        {data.map((item, idx) => {
          const heightPercent = Math.min(100, Math.round((item.value / maxVal) * 100));
          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
              {/* Tooltip on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 mb-1 px-1.5 py-0.5 rounded bg-slate-900 text-white text-[10px] font-mono shadow-md whitespace-nowrap pointer-events-none">
                {item.value}%
              </div>

              {/* Bar */}
              <div className="w-full max-w-[42px] bg-slate-100 dark:bg-slate-800 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                <div
                  className={`w-full transition-all duration-500 rounded-t-lg ${
                    item.color || 'bg-gradient-to-t from-brand-600 to-indigo-400'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                ></div>
              </div>

              {/* Label */}
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2 truncate w-full text-center" title={item.label}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Responsive SVG-based Trend Line Chart for Semester Progression
export const SemesterTrendChart = ({ data = [], height = 220 }) => {
  if (!data || data.length === 0) return null;

  const points = data.map((d, i) => {
    // scale sgpa 0..10 to coordinates
    const x = (i / (data.length - 1 || 1)) * 400 + 40;
    const y = 200 - ((d.sgpa - 6) / 4) * 160; // 6 to 10 range
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} 220 L ${points[0].x} 220 Z`;

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 480 240" className="w-full" style={{ height: `${height}px` }}>
        <defs>
          <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3].map((g) => (
          <line
            key={g}
            x1="30"
            y1={40 + g * 45}
            x2="450"
            y2={40 + g * 45}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeDasharray="4 4"
          />
        ))}

        {/* Area fill */}
        <path d={areaD} fill="url(#trendGradient)" />

        {/* Line stroke */}
        <path
          d={pathD}
          fill="none"
          stroke="#4f46e5"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points & Labels */}
        {points.map((p, idx) => (
          <g key={idx} className="group cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r="5.5"
              className="fill-white dark:fill-slate-900 stroke-brand-600 stroke-[3]"
            />
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              className="text-[11px] font-bold fill-slate-700 dark:fill-slate-200 font-mono"
            >
              {p.sgpa}
            </text>
            <text
              x={p.x}
              y={235}
              textAnchor="middle"
              className="text-[10px] font-medium fill-slate-400"
            >
              {p.semester.replace(' (Current)', '')}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Circular Radial Gauge for Attendance
export const AttendanceGauge = ({ percentage = 88.5, size = 150, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const isLow = percentage < 75;
  const strokeColor = isLow ? '#ef4444' : percentage >= 85 ? '#10b981' : '#3b82f6';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
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
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
          {percentage}%
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${isLow ? 'text-rose-500' : 'text-slate-400'}`}>
          {isLow ? 'Critical <75%' : 'Overall Attendance'}
        </span>
      </div>
    </div>
  );
};

// Donut Chart for Grade Distribution
export const GradeDistributionChart = ({ distribution = [] }) => {
  const total = distribution.reduce((acc, curr) => acc + curr.count, 0) || 1;
  let accumulatedAngle = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
      <div className="relative w-36 h-36 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {distribution.map((item, idx) => {
            const fraction = item.count / total;
            const strokeDasharray = `${fraction * 251.2} ${251.2}`;
            const strokeDashoffset = -accumulatedAngle * 2.512;
            accumulatedAngle += fraction * 100;

            return (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                stroke={item.color}
                strokeWidth="16"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-slate-900 dark:text-white">{total}</span>
          <span className="text-[10px] font-bold uppercase text-slate-400">Total</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1 w-full text-xs">
        {distribution.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{item.grade}:</span>
            <span className="font-mono text-slate-500 dark:text-slate-400">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
