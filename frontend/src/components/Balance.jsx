import React from 'react'

export default function Balance({ amount }) {
  return (
    <div className='flex items-center space-x-4 text-lg font-medium'>
      <div>Your Balance:</div>
      <div>₹ {amount}</div>
    </div>
  )
}
