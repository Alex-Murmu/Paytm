import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomWarning({label,buttonLabel,to}) {
  return (
    <div className='flex justify-between'>
         <div classNa>{label}</div>
         <div className='cursor-pointer underline'><Link to={to}>{buttonLabel}</Link></div>
    </div>
  )
}
