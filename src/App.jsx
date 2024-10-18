import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import NotFound from "./pages/NotFound"
import Profile from './pages/Profile'
import OwnerProfile from './pages/OwnerProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import JetSkiDetails from './pages/JetSkiDetails'

function App() {

  return (
    <div id="container">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

        <Route path="/jet-ski/:jetSkiId" element={<JetSkiDetails/>} />

        <Route path="/owner/:ownerId" element={<ProtectedRoute> <OwnerProfile/> </ProtectedRoute>}/>

        <Route path='/not-found' element={<NotFound/>} />

      </Routes>

      <Footer/>
    </div>
  )
}

export default App
