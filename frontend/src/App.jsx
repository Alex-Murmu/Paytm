import React from 'react'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Users from './components/Users'
import Header from './pages/Header'
import Dashboard from './pages/Dashboard'
import About from "./pages/About"
import Service from './pages/Service'
import Transaction from './pages/Transaction'

export default function App() {
  return (
    <div className='s'>
        <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/about' element={<About />}   />
        <Route path='/service' element={<Service />}   />
        <Route path='/transaction' element={<Transaction />}   />
        <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
     
    </div>
  )
}
