import React from 'react'

export default function InputBox({label,placeholder,onChange}) {
  return (
    <div>
        <div className='text-sm font-medium text-left py-2'>
            {label}
        </div>
        <input type="text" onChange={onChange} placeholder={placeholder} className='w-full  border px-2 py-1 rounded border-slate-200' />
    </div>
  )
}
