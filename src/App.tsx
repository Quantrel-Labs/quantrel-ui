import { Outlet, useLocation } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ToastProvider } from "@/context/ToastContext"
import Navbar from "@/components/Navbar"
import ToastContainer from "@/components/ToastContainer"
import Footer from "@/components/Footer"
import { Squares } from "@/components/ui/squares-background"

export default function App() {
  const location = useLocation()
  
  // Hide navbar and footer on login/register pages
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  // Hide navbar and footer on chat page
  const isChatPage = location.pathname === '/chat'
  
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="relative min-h-screen bg-[#000] text-white overflow-hidden">
          {/* Animated grid background - hidden on auth pages */}
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
            {!isAuthPage && !isChatPage && <Navbar />}
            <main className={isChatPage ? 'h-screen overflow-hidden' : 'flex-1'}>
              <Outlet />
            </main>
            {!isAuthPage && !isChatPage && <Footer />}
            <ToastContainer />
          </div>
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}