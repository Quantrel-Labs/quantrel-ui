import { Outlet } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ToastProvider } from "@/context/ToastContext"
import Navbar from "@/components/Navbar"
import ToastContainer from "@/components/ToastContainer"
import Footer from "@/components/Footer"
import { Squares } from "@/components/ui/squares-background"

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="relative min-h-screen bg-[#000] text-white overflow-hidden">
          {/* Animated grid background */}
          {/* <div className="fixed inset-0 z-0">
            <Squares 
              direction="diagonal"
              speed={0}
              squareSize={200}
              borderColor="#333" 
              hoverFillColor="#222"
            />
          </div> */}
          
          {/* Content layer */}
          <div className="relative z-10 flex min-h-screen flex-col">
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