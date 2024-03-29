import React from 'react'
import LandingPage from './pages/LandingPage/LandingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import Dashboard from './pages/Dashboard/Dashboard'
import CreateForm from './pages/CreateForm/CreateForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  
  return (
 
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path = "/create" element = {<CreateForm />} />
        </Routes>

      </Router>
 
     
     
   
  );
}

export default App
