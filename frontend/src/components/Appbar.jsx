import React from 'react'

export default function Appbar({ applogo, user }) {
  return (
    <div className='shadow w-full h-16 flex justify-between items-center'>
      <div className='text-3xl font-medium pl-5'>
        {applogo}
      </div>
      <div className='flex pr-5 items-center w-40'>
        <div className='font-bold mr-4'>Hello {user.name}</div>
        <div className="h-14 w-14 rounded-full border flex items-center justify-center bg-slate-400">
          {user.name[0]}
        </div>
      </div>
    </div>
  )
}
