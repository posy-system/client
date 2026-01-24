import React from 'react'

export default function InputCompo({ type, placeholder, label, icon }) {
  return (
    <div>
        {label && <label className="block mt-2 text-sm font-medium dark:text-gray-500 text-start">{label}</label>}
        {icon && <span className="absolute ml-2 mt-3">{icon}</span>}
        <input type={type} placeholder={placeholder} className="border p-2 rounded-md w-full pl-8" />  
    </div>
  )
}
