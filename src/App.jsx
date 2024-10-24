import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import MyNavbar from "./components/MyNavbar"

import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import NotFound from "./pages/NotFound"
import UserProfile from './pages/UserProfile'
import OwnerProfile from './pages/OwnerProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import JetSkiDetails from './pages/JetSkiDetails'
import ErrorPage from './pages/ErrorPage'

function App() {

  return (
    <div id="container">
      <MyNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/profile/:userId" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
        <Route path="/owner/:ownerId" element={<ProtectedRoute> <OwnerProfile/> </ProtectedRoute>}/>

        <Route path="/jet-ski/:jetSkiId" element={<JetSkiDetails/>} />


        <Route path='*' element={<NotFound/>} />
        <Route path="/error" element={<ErrorPage/>} />

      </Routes>

      <Footer/>
    </div>
  )
}

export default App
