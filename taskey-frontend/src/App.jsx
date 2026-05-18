import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import './App.css'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './Pages/Register'
import Login from './Pages/Login'
import UserDashboard from './Pages/UserDashboard'
import Profile from './Pages/Profile'
import Tasks from './Pages/Tasks'
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import AdminDashboard from './Pages/AdminDashboard'
import Users from './Pages/Users'
import About from './Pages/About'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Protected User Routes */}
        <Route path="/user-dashboard" element={<ProtectedRoute userOnly={true}><UserDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute userOnly={true}><Tasks /></ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute adminOnly={true}><Users /></ProtectedRoute>} />
      </Routes>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'transparent',
            boxShadow: 'none',
            border: 'none',
            padding: '16px',
            fontSize: '11px',
            fontWeight: '900',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'inherit',
          },
          success: {
            style: {
              color: '#22c55e',
            },
            icon: null,
          },
          error: {
            style: {
              color: '#ef4444',
            },
            icon: null,
          },
        }}
      />
    </div>
  )
}

export default App