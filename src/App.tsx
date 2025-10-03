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
        <div className="relative min-h-screen bg-surface-primary text-text-primary overflow-hidden">
          {/* Enhanced background effects */}
          <div className="pointer-events-none fixed inset-0 z-0">
            {/* Primary gradient orbs */}
            <div className="absolute top-[-20%] left-[-15%] h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,153,255,0.12),_transparent_70%)] blur-3xl animate-float" />
            <div className="absolute top-[5%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.15),_transparent_65%)] blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-[-15%] left-[15%] h-[45rem] w-[45rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(236,72,153,0.1),_transparent_70%)] blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            <div className="absolute bottom-[10%] right-[-20%] h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.12),_transparent_65%)] blur-3xl animate-float" style={{ animationDelay: '1s' }} />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,rgba(15,23,42,0.2)_50%,rgba(0,0,0,0.4)_100%)]" />
            
            {/* Subtle noise texture */}
            <div className="absolute inset-0 bg-noise opacity-30" />
          </div>

          <div className="relative flex min-h-screen flex-col z-10">
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