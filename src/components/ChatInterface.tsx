// DOCS: Chat interface component for testing AI models

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/productService"

interface ChatInterfaceProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export default function ChatInterface({ isOpen, onClose, product }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, timestamp: Date }>>([
    {
      role: 'assistant',
      content: `Hello! I'm ${product.name}. I'm ready to help you. What would you like to try?`,
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim() || isLoading) return

    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    // Simulate API call with product's API key
    setTimeout(() => {
      const assistantMessage = {
        role: 'assistant' as const,
        content: `I'm a demo response from ${product.name}. In a real implementation, this would use the API key: ${product.apiKey?.slice(0, 8)}... to call the actual ${product.llmApiUsing} service. Your message was: "${userMessage.content}"`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[80vh] bg-gray-900/95 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col">
        <CardHeader className="border-b border-white/10 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <div className="text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    Powered by {product.llmApiUsing}
                  </div>
                </div>
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm">
                {product.tokens.toLocaleString()} tokens
              </Badge>
              <Badge className="bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm">
                ${product.price}/1K
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-4 ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 text-white ml-12' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 mr-12'
                }`}>
                  <div className="text-sm">{msg.content}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 mr-12">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 p-4 bg-white/5 backdrop-blur-sm">
            <div className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Send a message to ${product.name}...`}
                className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-white/40"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
                className="bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 text-white hover:from-white/30 hover:to-gray-300/30 disabled:opacity-50"
              >
                Send
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              This is a demo interface. In production, this would connect to {product.llmApiUsing} using the configured API key.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}