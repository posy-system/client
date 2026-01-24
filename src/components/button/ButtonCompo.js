import React from 'react'
import PropTypes from 'prop-types'

const VARIANT_CLASSES = {
  blue: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 dark:bg-blue-500 dark:hover:bg-blue-400',
  red: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 dark:bg-red-500 dark:hover:bg-red-400',
  green: 'bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400',
};

const SIZE_CLASSES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

export default function ButtonCompo({
  children,
  onClick,
  type = 'button',
  icon,
  variant = 'blue',
  size = 'md',
  className = '',
  disabled = false,
  ...rest
}) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-60';

  const variantClasses = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.blue;
  const sizeClasses = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`.trim()}
      {...rest}
    >
      {icon}
        {children}
    </button>
  )
}

ButtonCompo.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['blue', 'red', 'green']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
}
