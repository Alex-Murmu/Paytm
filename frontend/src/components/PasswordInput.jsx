import React from 'react'

export default function PasswordInput({label,placeholder,onChange}) {
  return (
    <div>
        <div className='text-sm font-medium py-2 text-left'>
         {label}
        </div>
        <input onChange={onChange} type="password" placeholder={placeholder} className='w-full border rounded px-2 py-1 border-slate-500'/>
    </div>
  )
}
