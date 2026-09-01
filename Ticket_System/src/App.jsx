import { useState } from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import AdminLogin from './pages/auth/AdminLogin'
import LandingPage from './pages/LandingPage'
import EmpHome from './pages/Employee/EmpHome'
import Dashboard from './pages/Admin/Dashboard'
import RaiseRequestPage from './pages/Employee/RaiseRequestPage'
import TrackRequestPage from './pages/Employee/TrackRequestPage'
import './App.css'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/employee/track-request" element={<TrackRequestPage />} />
        <Route path="/employee/home" element={<EmpHome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path="/employee/raise-request" element={<RaiseRequestPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
