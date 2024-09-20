import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from 'react-hot-toast'

import FloatingShape from "./components/FloatingShape"

import Home from "./pages/Home"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import EmailVerification from "./pages/EmailVerification"
import { useAuthStore } from "./store/store"
import { useEffect } from "react"

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />
  }

  return children;
}

const RedirectAuthUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to='/' replace />
  } else {
    return children;
  }
}

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(isAuthenticated);
  console.log("User : ", user);

  return (
    <main className=" min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

      <Routes>
        <Route path="/" element={
          <ProtectRoute>
            <Home />
          </ProtectRoute>
        } />
        <Route path="/signup" element={
          <RedirectAuthUser>
            <SignupPage />
          </RedirectAuthUser>
        } />
        <Route path="/login" element={
          <RedirectAuthUser>
            <LoginPage />
          </RedirectAuthUser>
        } />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
      <Toaster />
    </main>
  )
}

export default App
