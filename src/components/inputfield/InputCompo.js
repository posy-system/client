import React from 'react'

export default function InputCompo({
  type,
  placeholder,
  label,
  icon,
  name,
  value,
  onChange,
  onBlur,
  autoComplete,
  required = false,
  disabled = false,
  className = '',
  ...rest
}) {
  const id = rest.id ?? name;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block mt-2 text-sm font-medium dark:text-gray-500 text-start"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && <span className="absolute left-2 top-1/2 -translate-y-1/2">{icon}</span>}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          className="border p-2 rounded-md w-full pl-8 disabled:opacity-60"
          {...rest}
        />
      </div>
    </div>
  )
}
