import { Outlet } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ToastProvider } from "@/context/ToastContext"
import Navbar from "@/components/Navbar"
import ToastContainer from "@/components/ToastContainer"

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
          <Navbar />
          <main>
            <Outlet />
          </main>
          <ToastContainer />
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}