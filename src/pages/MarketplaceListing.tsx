import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/context/ToastContext"
import { useAuth } from "@/hooks/useAuth"
import { productService, Product } from "@/lib/productService"
import ChatInterface from "@/components/ChatInterface"
import ModelInfoModal from "@/components/ModelInfoModal"
import { 
  Bot, 
  Code, 
  ImageIcon, 
  BarChart3, 
  PenTool, 
  Headphones, 
  Eye, 
  Languages,
  Wrench
} from "lucide-react"

interface MarketplaceListingProps {
  showCreatorInfo?: boolean
}

export default function MarketplaceListing({ showCreatorInfo = true }: MarketplaceListingProps) {
  const { showSuccess, showError, showInfo } = useToast()
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [showModelInfo, setShowModelInfo] = useState(false)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (user) {
          // If user is authenticated, try to fetch from Firebase
          const allProducts = await productService.getActiveProducts()
          setProducts(allProducts)
        } else {
          // If not authenticated, show sample data
          setProducts([
            {
              id: "1",
              name: "GPT-4 Vision Pro",
              description: "Advanced multimodal AI model for text and images",
              llmApiUsing: "OpenAI GPT-4 Vision",
              price: 0.03,
              category: "Language Models",
              tags: ["multimodal", "vision", "text-generation"],
              limit: 1000000,
              tokens: 4096,
              apiDocs: "# GPT-4 Vision API Documentation...",
              apiKey: "sk-demo123456789",
              allowedOrigin: "https://api.openai.com",
              images: [],
              status: "active",
              stock: 1000000,
              storeOwnerId: "demo1",
              storeOwnerName: "OpenAI Labs",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-12-01"),
              updatedAt: new Date("2024-12-15")
            },
            {
              id: "2", 
              name: "CodeGen Assistant",
              description: "AI coding assistant for 40+ programming languages",
              llmApiUsing: "Custom CodeGen Model v2.1",
              price: 0.02,
              category: "Code Generation",
              tags: ["programming", "code-generation", "debugging"],
              limit: 500000,
              tokens: 8192,
              apiDocs: "# CodeGen API Documentation...",
              apiKey: "cg-demo987654321",
              allowedOrigin: "https://api.codegen.dev",
              images: [],
              status: "active",
              stock: 500000,
              storeOwnerId: "demo2",
              storeOwnerName: "DevTools AI",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-11-15"),
              updatedAt: new Date("2024-12-10")
            },
            {
              id: "3",
              name: "DALL-E Image Creator",
              description: "Generate stunning images from text descriptions",
              llmApiUsing: "OpenAI DALL-E 3",
              price: 0.04,
              category: "Image Generation",
              tags: ["image-generation", "art", "creative"],
              limit: 100000,
              tokens: 1024,
              apiDocs: "# DALL-E API Documentation...",
              apiKey: "sk-dalle123",
              allowedOrigin: "https://api.openai.com",
              images: [],
              status: "active",
              stock: 100000,
              storeOwnerId: "demo3",
              storeOwnerName: "Creative AI",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-12-01"),
              updatedAt: new Date("2024-12-15")
            },
            {
              id: "4",
              name: "DataAnalyzer Pro",
              description: "Advanced data analysis and insights generation",
              llmApiUsing: "Custom Analytics Model",
              price: 0.025,
              category: "Data Analysis",
              tags: ["analytics", "insights", "business-intelligence"],
              limit: 750000,
              tokens: 8192,
              apiDocs: "# DataAnalyzer API Documentation...",
              apiKey: "da-pro456",
              allowedOrigin: "https://api.dataanalyzer.com",
              images: [],
              status: "active",
              stock: 750000,
              storeOwnerId: "demo4",
              storeOwnerName: "Analytics Hub",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-11-20"),
              updatedAt: new Date("2024-12-12")
            },
            {
              id: "5",
              name: "ContentWriter AI",
              description: "Professional content writing and copywriting AI",
              llmApiUsing: "GPT-4 Turbo",
              price: 0.015,
              category: "Content Writing",
              tags: ["writing", "copywriting", "marketing"],
              limit: 2000000,
              tokens: 4096,
              apiDocs: "# ContentWriter API Documentation...",
              apiKey: "cw-ai789",
              allowedOrigin: "https://api.contentwriter.ai",
              images: [],
              status: "active",
              stock: 2000000,
              storeOwnerId: "demo5",
              storeOwnerName: "Content Labs",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-11-25"),
              updatedAt: new Date("2024-12-14")
            },
            {
              id: "6",
              name: "AudioSync Pro",
              description: "Advanced audio processing and transcription",
              llmApiUsing: "Whisper v3 Enhanced",
              price: 0.008,
              category: "Audio Processing",
              tags: ["audio", "transcription", "speech-to-text"],
              limit: 1500000,
              tokens: 2048,
              apiDocs: "# AudioSync API Documentation...",
              apiKey: "as-pro321",
              allowedOrigin: "https://api.audiosync.com",
              images: [],
              status: "active",
              stock: 1500000,
              storeOwnerId: "demo6",
              storeOwnerName: "Audio Tech",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-11-18"),
              updatedAt: new Date("2024-12-13")
            },
            {
              id: "7",
              name: "VisionAnalyzer",
              description: "Computer vision and image analysis toolkit",
              llmApiUsing: "Custom Vision Model",
              price: 0.035,
              category: "Vision Models",
              tags: ["computer-vision", "image-analysis", "object-detection"],
              limit: 500000,
              tokens: 1024,
              apiDocs: "# VisionAnalyzer API Documentation...",
              apiKey: "va-model654",
              allowedOrigin: "https://api.visionanalyzer.com",
              images: [],
              status: "active",
              stock: 500000,
              storeOwnerId: "demo7",
              storeOwnerName: "Vision AI Labs",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-11-22"),
              updatedAt: new Date("2024-12-11")
            },
            {
              id: "8",
              name: "TranslateMax",
              description: "Real-time translation for 100+ languages",
              llmApiUsing: "Google Translate API Enhanced",
              price: 0.012,
              category: "Translation",
              tags: ["translation", "multilingual", "localization"],
              limit: 3000000,
              tokens: 2048,
              apiDocs: "# TranslateMax API Documentation...",
              apiKey: "tm-max987",
              allowedOrigin: "https://api.translatemax.com",
              images: [],
              status: "active",
              stock: 3000000,
              storeOwnerId: "demo8",
              storeOwnerName: "Language Bridge",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-11-28"),
              updatedAt: new Date("2024-12-16")
            }
          ])
        }
      } catch (error) {
        console.error("Error loading products:", error)
        showError("Loading Failed", "Failed to load AI models. Please try logging in.")
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [user])

  const handleTryNow = (product: Product) => {
    setSelectedProduct(product)
    setShowChat(true)
  }

  const handleViewDocs = (product: Product) => {
    setSelectedProduct(product)
    setShowModelInfo(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center bg-white/5 backdrop-blur-xl rounded-lg p-8 border border-white/10">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white/30 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading AI marketplace...</p>
        </div>
      </div>
    )
  }

  // Helper function to get category icon and color
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Language Models":
        return <Bot className="w-5 h-5 text-white" />
      case "Code Generation":
        return <Code className="w-5 h-5 text-white" />
      case "Image Generation":
        return <ImageIcon className="w-5 h-5 text-white" />
      case "Data Analysis":
        return <BarChart3 className="w-5 h-5 text-white" />
      case "Content Writing":
        return <PenTool className="w-5 h-5 text-white" />
      case "Audio Processing":
        return <Headphones className="w-5 h-5 text-white" />
      case "Vision Models":
        return <Eye className="w-5 h-5 text-white" />
      case "Translation":
        return <Languages className="w-5 h-5 text-white" />
      default:
        return <Wrench className="w-5 h-5 text-white" />
    }
  }

  const getCategoryColor = (category: string) => {
    // Simplified to monochrome - all categories use same minimal gray
    return "bg-white/10"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-white mb-2">AI Marketplace</h1>
          <p className="text-gray-400 text-sm">
            Discover and integrate cutting-edge AI models and agents for your projects
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => {
            const categoryColor = getCategoryColor(product.category)
            return (
              <div 
                key={product.id} 
                className="group cursor-pointer"
                onClick={() => handleTryNow(product)}
              >
                <div className="rounded-xl p-4  transition-all duration-200 hover:bg-white/[0.02]">
                  {/* Icon and Title Row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${categoryColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      {getCategoryIcon(product.category)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-white font-medium text-sm leading-tight mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-xs leading-tight truncate">
                        {product.description.length > 40 
                          ? `${product.description.substring(0, 40)}...`
                          : product.description
                        }
                      </p>
                    </div>
                  </div>

                  {/* Creator Info */}
                  {showCreatorInfo && product.storeOwnerName && (
                    <div className="flex items-center gap-2 mb-3">
                      <img 
                        src={product.storeOwnerAvatar || "https://via.placeholder.com/16"} 
                        alt={product.storeOwnerName}
                        className="w-4 h-4 rounded-full"
                      />
                      <span className="text-gray-400 text-xs">
                        by {product.storeOwnerName}
                      </span>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="flex items-center justify-between">
                    <div className="text-white text-sm font-medium">
                      ${(product.price || 0).toFixed(3)}/1K
                    </div>
                    <button 
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-white text-xs px-2 py-1 hover:bg-white/[0.05] rounded"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDocs(product)
                      }}
                    >
                      View Docs
                    </button>
                  </div>

                  {/* Category Badge - Bottom */}
                  <div className="mt-3 pt-3 border-t border-white/[0.05]">
                    <div className="text-gray-400 text-xs">
                      {product.category}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="rounded-lg p-12 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/[0.03] rounded-full flex items-center justify-center">
                <Bot className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No models found</h3>
              <p className="text-gray-400">
                No AI models are currently available in the marketplace.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Interface Modal */}
      {selectedProduct && (
        <ChatInterface
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          product={selectedProduct}
        />
      )}

      {/* Model Info Modal */}
      {selectedProduct && (
        <ModelInfoModal
          isOpen={showModelInfo}
          onClose={() => setShowModelInfo(false)}
          product={selectedProduct}
        />
      )}
    </div>
  )
}