import React from 'react';
export { Badge } from './Badge';
export { Modal } from './Modal';

export const Card = ({
  children,
  title,
  subtitle,
  action,
  className = '',
  padding = 'p-6',
  hover = false,
  ...props
}) => {
  const hasHeader = title || subtitle || action;

  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-subtle ${
        hover ? 'hover:shadow-card hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {hasHeader && (
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 ml-4">{action}</div>}
        </div>
      )}
      <div className={padding}>{children}</div>
    </div>
  );
};

export default Card;
