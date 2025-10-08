import React, { useState } from 'react'
import InputBox from '../components/InputBox'
import PasswordInput from '../components/PasswordInput'
import { useNavigate } from 'react-router-dom'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export default function Signup() {
    const nevigate = useNavigate();
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(firstName,lastName,email,password)

    return (
        <div className='w-full flex justify-center h-screen'>
            <div className='flex flex-col justify-center '>
                <div className='p-6 w-84 rounded-2xl bg-white shadow-2xl '>
                    
                    {/* loader overlay */}
                    {loading && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex justify-center items-center rounded-2xl">
                        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                      </div>
                    )}

                    <div className='text-center'>
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information to create an Account"} />
                    </div>

                    <InputBox onChange={(e)=> setFirstName(e.target.value)} label={"First Name"} placeholder={"Alex"} />
                    <InputBox onChange={(e)=> setLastName(e.target.value)} label={"Last Name"} placeholder={"Murmu"} />
                    <InputBox onChange={(e)=> setEmail(e.target.value)} label={"Email"} placeholder={"ft.alexrayen@gmail.com"} />
                    <PasswordInput onChange={(e)=> setPassword(e.target.value)} label={"Password"} placeholder={"******"} />

                    <Button onClick={async()=>{
                      try {
                        console.log("bae", BASE_URL)
                        setLoading(true);
                        const response = await fetch(`${BASE_URL}/api/v1/user/signup`,{
                          method:"POST",
                          headers:{"Content-Type":"application/json"},
                          body:JSON.stringify({ firstName:firstName,lastName:lastName,email:email,password:password })
                        });
                        const data = await response.json();
                        console.log(data);
                        console.log(data.message
                          
                        )
                        if(data.message){
                            nevigate("/signin")
                         }
                       } catch(err){
                         console.error(err);
                       } finally {
                         setLoading(false);
                       }
                    }} label={"Signup"} />

                    <BottomWarning label={"If Have an Account allrady please Login"} buttonLabel={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}
