import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import PasswordInput from '../components/PasswordInput'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export default function Signin() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [Loading,setLoading] = useState(false);

  const navigate = useNavigate();
  console.log(email,password)
  return (
    <div className='flex w-full h-screen justify-center'>
      <div className='flex flex-col justify-center'>
        <div className='w-84 text-center rounded-2xl p-5 bg-white shadow-2xl '>
             {Loading && 
             <div className='absolute inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center rounded-2xl'>
                 <div className='w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin'></div>
             </div> }
            <div>
             <Heading label={"Sign In"} />
            <SubHeading label={"Enter your Credentials to access your Account"} />
        
            </div>
              <InputBox onChange={(e)=>setEmail(e.target.value)} label={"Email"} placeholder={"enter"} />
              <PasswordInput onChange={(e)=>setPassword(e.target.value)} label={"Password"} />
              <Button onClick={async()=>{
                try {
                  setLoading(true)
                    const response = await fetch(`${BASE_URL}/api/v1/user/signin`,{
                  method:"POST",
                  headers:{
                    "Content-Type":"application/json",
                  },
                  body:JSON.stringify({email:email,password:password})
                });
                const data = await response.json();
                const token =  data.token ;
                if(token){
                  localStorage.setItem("token",token)
                  navigate("/dashboard")
                }
                } catch (error) {
                  setLoading(false);
                  console.log(error.message)
                }
              
                    
              }} label={"Signin"} />  
              <BottomWarning label={"If no Account please create First" } buttonLabel={"Sign Up"} to={"/signup"} />  
        </div>
      </div>
        
    </div>
  )
}
