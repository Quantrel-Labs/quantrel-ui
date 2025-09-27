import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/context/ToastContext"
import { useAuth } from "@/hooks/useAuth"
import { productService, Product } from "@/lib/productService"

interface MarketplaceListingProps {
  showCreatorInfo?: boolean
}

export default function MarketplaceListing({ showCreatorInfo = true }: MarketplaceListingProps) {
  const { showSuccess, showError, showInfo } = useToast()
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

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
              description: "Advanced multimodal AI model capable of understanding both text and images. Perfect for content analysis, document processing, and visual AI applications with industry-leading accuracy.",
              llmApiUsing: "OpenAI GPT-4 Vision",
              price: 0.03,
              category: "Language Models",
              tags: ["multimodal", "vision", "text-generation", "content-analysis"],
              limit: 1000000,
              tokens: 4096,
              apiDocs: "# GPT-4 Vision API Documentation...",
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
              name: "CodeGen Assistant Pro",
              description: "Specialized code generation AI that supports 40+ programming languages. Includes debugging, optimization, code review, and comprehensive documentation features.",
              llmApiUsing: "Custom CodeGen Model v2.1",
              price: 0.02,
              category: "Code Generation",
              tags: ["programming", "code-generation", "debugging", "optimization"],
              limit: 500000,
              tokens: 8192,
              apiDocs: "# CodeGen API Documentation...",
              images: [],
              status: "active",
              stock: 500000,
              storeOwnerId: "demo2",
              storeOwnerName: "DevTools AI",
              storeOwnerAvatar: "https://via.placeholder.com/40",
              createdAt: new Date("2024-11-15"),
              updatedAt: new Date("2024-12-10")
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center bg-white/5 backdrop-blur-xl rounded-lg p-8 border border-white/10">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white/30 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading AI marketplace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="bg-gradient-to-r from-white/10 to-gray-300/10 backdrop-blur-xl p-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">AI Marketplace</h1>
          <p className="text-xl text-gray-300 mb-6">
            Discover and integrate cutting-edge AI models and agents for your projects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-6">
        <p className="text-gray-400">
          Showing {products.length} AI models and agents
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:border-white/30 transition-all duration-300 hover:scale-105 hover:bg-white/10 group">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-white mb-2">{product.name}</CardTitle>
                    <Badge className="bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                      {product.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${(product.price || 0).toFixed(3)}</div>
                    <div className="text-xs text-gray-400">per 1K tokens</div>
                  </div>
                </div>
                
                {showCreatorInfo && product.storeOwnerName && (
                  <div className="flex items-center gap-2 mb-3 bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                    <img 
                      src={product.storeOwnerAvatar || "https://via.placeholder.com/24"} 
                      alt={product.storeOwnerName || "Store Owner"}
                      className="w-6 h-6 rounded-full border border-white/20"
                    />
                    <span className="text-sm text-gray-300">by {product.storeOwnerName}</span>
                  </div>
                )}

                <Badge className="bg-gradient-to-r from-white/10 to-gray-300/10 backdrop-blur-sm text-gray-300 border border-white/20 mb-3">
                  {product.category}
                </Badge>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gradient-to-r from-white/5 to-gray-300/5 backdrop-blur-sm rounded-lg overflow-hidden flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    {product.images && product.images.length > 0 ? (
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="text-4xl text-gray-400 group-hover:text-gray-300 transition-colors duration-300">🤖</div>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm line-clamp-3">
                    {product.description || "No description available"}
                  </p>

                  {product.llmApiUsing && (
                    <div className="text-xs text-gray-300 bg-white/5 backdrop-blur-sm px-2 py-1 rounded border border-white/10">
                      Powered by: {product.llmApiUsing}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div>
                      <span className="font-medium">Max Tokens:</span><br />
                      {(product.tokens || 0).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Monthly Limit:</span><br />
                      {(product.limit || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-white/20 to-gray-300/20 backdrop-blur-sm border border-white/20 text-white hover:from-white/30 hover:to-gray-300/30 hover:scale-105 transition-all duration-300"
                      size="sm"
                      onClick={() => showInfo("Coming Soon", `Integration demo for ${product.name} will be available soon!`)}
                    >
                      Try Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                      onClick={() => showInfo("API Documentation", `Opening documentation for ${product.name}...`)}
                    >
                      View Docs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white/5 backdrop-blur-xl rounded-lg p-12 border border-white/10 max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">No models found</h3>
              <p className="text-gray-400">
                No AI models are currently available in the marketplace.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}