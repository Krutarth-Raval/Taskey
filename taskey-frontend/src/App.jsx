import React, { useEffect, useState, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './Components/ProtectedRoute'

// Dynamic page loading for performance optimization
const Home = React.lazy(() => import('./Pages/Home'))
const RegisterPage = React.lazy(() => import('./Pages/Register'))
const Login = React.lazy(() => import('./Pages/Login'))
const UserDashboard = React.lazy(() => import('./Pages/UserDashboard'))
const Profile = React.lazy(() => import('./Pages/Profile'))
const Tasks = React.lazy(() => import('./Pages/Tasks'))
const ForgotPassword = React.lazy(() => import('./Pages/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./Pages/ResetPassword'))
const AdminDashboard = React.lazy(() => import('./Pages/AdminDashboard'))
const Users = React.lazy(() => import('./Pages/Users'))
const About = React.lazy(() => import('./Pages/About'))
const Terms = React.lazy(() => import('./Pages/Terms'))
const Privacy = React.lazy(() => import('./Pages/Privacy'))

// Premium route loading progress bar
const RouteProgressLoader = () => (
  <div className="fixed top-0 left-0 right-0 h-1 bg-background/30 backdrop-blur-sm z-50 overflow-hidden">
    <div className="route-loader-bar" />
  </div>
);


function App() {
  const location = useLocation();
  const [toastPosition, setToastPosition] = useState(() => {
    return window.innerWidth < 768 ? 'top-center' : 'bottom-right';
  });

  useEffect(() => {
    const updatePosition = () => {
      setToastPosition(window.innerWidth < 768 ? 'top-center' : 'bottom-right');
    };
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

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
      <Suspense fallback={<RouteProgressLoader />}>
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
      </Suspense>
      <Toaster
        key={toastPosition}
        position={toastPosition}
        containerStyle={{
          top: toastPosition === 'top-center' ? 40 : 20,
          bottom: toastPosition === 'bottom-right' ? 40 : 20,
        }}
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
            textAlign: toastPosition === 'top-center' ? 'center' : 'right',
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