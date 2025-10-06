import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
const menus = [{label:"Home",link:"/",i:1},{label:"About",link:"/about",i:2},{label:"Service",link:"/service",i:3},{label:"Transaction",link:"/transaction",i:4},]
export default function Header() {
    const nevigate = useNavigate();

  return (
    <div className=' w-full 4'>
       <div className='flex justify-between border h-16 shadow-lg rounded-full mx-2  items-center bg-slate-50  mt-1 shodow px-5'>
        <div className='text-4xl'>Paytm</div>
        <div ><Menu menu={menus} /></div>
        <div className='flex justify-center space-x-3'>
            <div><Button label={"SignUp"} onClick={()=>nevigate("/signup")} /></div>
            <div><Button label={"signin"} onClick={()=>nevigate("/signin")} /></div>
        </div>
       </div>
    </div>
  )
}


const Menu = ({menu}) => {
    return (
        <div className='flex justify-around items-center space-x-3 '>
         {menu.map(({label, link, i}) => { // Destructure label, link, and i directly
             return (
                 
                     <Link key={i} className='text-lg px-2 rounded-full shadow-lg' to={link}>{label}</Link>
                 
             )
          })}
        </div>
    )
}