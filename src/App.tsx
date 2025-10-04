import { Outlet } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ToastProvider } from "@/context/ToastContext"
import Navbar from "@/components/Navbar"
import ToastContainer from "@/components/ToastContainer"
import Footer from "@/components/Footer"

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="relative min-h-screen bg-black text-white overflow-hidden">
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <ToastContainer />
          </div>
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}