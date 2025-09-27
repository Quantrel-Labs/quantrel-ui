// DOCS: Toast notification component with glassmorphism design

import React, { useEffect, useState } from 'react'
import { useToast, Toast } from '@/context/ToastContext'
import { Button } from '@/components/ui/button'

interface ToastItemProps {
  toast: Toast
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToast()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => removeToast(toast.id), 300)
  }

  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'border-white/30 bg-white/15'
      case 'error':
        return 'border-white/30 bg-white/10'
      case 'warning':
        return 'border-white/25 bg-white/10'
      case 'info':
        return 'border-white/20 bg-white/5'
      default:
        return 'border-white/20 bg-white/10'
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
        return 'ℹ'
      default:
        return 'ℹ'
    }
  }

  return (
    <div
      className={`
        ${getToastStyles()}
        backdrop-blur-xl border rounded-lg p-4 shadow-2xl
        transform transition-all duration-300 ease-out
        ${isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
        max-w-sm w-full
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className={`
            w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
            ${toast.type === 'success' ? 'bg-white/20 text-white' : 
              toast.type === 'error' ? 'bg-white/15 text-white' :
              toast.type === 'warning' ? 'bg-white/15 text-white' :
              'bg-white/10 text-white'
            }
          `}>
            {getIcon()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white mb-1">
            {toast.title}
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            {toast.message}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="flex-shrink-0 h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-white/10 rounded-full"
        >
          ✕
        </Button>
      </div>
    </div>
  )
}

const ToastContainer: React.FC = () => {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default ToastContainer