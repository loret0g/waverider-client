import { useState } from 'react'
// import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import NotFound from "./pages/NotFound";
import Profile from './pages/Profile'

function App() {

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        <Route path='/not-found' element={<NotFound/>} />

      </Routes>
    </div>
  )
}

export default App
