import React from 'react'
import Button from './Button'
import InputBox from './InputBox'
import { useState } from 'react'
import { useEffect } from 'react';

export default function Users({users}) {

 
  return (
    <div>
        <div className='text-2xl font-medium pl-4 mt-2'>
            Users
        </div>
        <div className='w-full m-auto m-'>
            <InputBox onChange={(e)=>setInput(e.target.value)} placeholder={"search for User .........."} />
        </div>
        <div>
           {users.map((user)=><User user={user} key={user.id} />)}
        </div>
    </div>
  )
}


const User  = ({user,key})=>{
    return(
        <div key={key}>
            <div className='flex itmes-center justify-between border shadow'>
            <div>
             <div>{user.firstName} {user.lastName}</div>
            <div>{user.email}</div>
            </div>
            <div>
                <Button label={"Send Money"} />
            </div>
            </div>
        </div>
    )
}