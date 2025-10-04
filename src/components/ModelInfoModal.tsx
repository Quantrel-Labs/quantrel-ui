// DOCS: Detailed model information modal

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/lib/productService"
import { Timestamp } from "firebase/firestore"

interface ModelInfoModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

function MarkdownPreview({ content }: { content: string }) {
  const renderMarkdown = (text: string) => {
    return text
      .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mb-2 text-gray-100">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-xl font-semibold mb-3 text-gray-100">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mb-4 text-white">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-300">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-blue-300 font-mono text-sm">$1</code>')
      .replace(/\n/g, '<br>')
  }

  return (
    <div 
      className="prose prose-invert max-w-none text-gray-300"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
}

export default function ModelInfoModal({ isOpen, onClose, product }: ModelInfoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-black border border-white/[0.05]">
        <CardHeader className="border-b border-white/[0.05] sticky top-0 bg-black backdrop-blur-xl z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center justify-center text-3xl">
                🤖
              </div>
              <div>
                <CardTitle className="text-2xl text-white font-medium">
                  {product.name}
                </CardTitle>
                <p className="text-gray-500">Powered by {product.llmApiUsing}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-white/5 text-gray-400 border border-white/10">
                    {product.status}
                  </Badge>
                  <Badge className="bg-white/5 text-gray-400 border border-white/10">
                    {product.category}
                  </Badge>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-gray-500 hover:text-white hover:bg-white/[0.02]"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Model Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Model Description</h3>
                <p className="text-gray-400 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-3">Tags & Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.map((tag, index) => (
                    <Badge key={index} className="bg-white/[0.03] text-gray-400 border border-white/[0.05] font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Pricing & Limits</h3>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Cost per 1K tokens</span>
                    <span className="font-medium text-white">${product.price?.toFixed(3) || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Max tokens per request</span>
                    <span className="font-semibold text-white">{product.tokens?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Monthly usage limit</span>
                    <span className="font-semibold text-white">{product.limit?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Available stock</span>
                    <span className="font-semibold text-white">
                      {product.stock && !isNaN(product.stock) ? product.stock.toLocaleString() : 'Unlimited'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Creator Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Creator Information</h3>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center">
                  {product.storeOwnerAvatar ? (
                    <img 
                      src={product.storeOwnerAvatar} 
                      alt={product.storeOwnerName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-lg text-gray-400">?</div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{product.storeOwnerName || 'Anonymous Creator'}</p>
                  <p className="text-sm text-gray-400">Model Creator & Maintainer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">Technical Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">API Configuration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">API Key</span>
                    <span className="font-mono text-gray-400">
                      {product.apiKey ? `${product.apiKey.slice(0, 8)}...` : 'Not configured'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Allowed Origin</span>
                    <span className="font-mono text-gray-400 truncate max-w-[150px]">
                      {product.allowedOrigin || 'Not configured'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Metadata</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Created</span>
                    <span className="text-gray-400">
                      {product.createdAt ? 
                        (product.createdAt instanceof Date ? 
                          product.createdAt.toLocaleDateString() : 
                          product.createdAt.toDate().toLocaleDateString()) 
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Updated</span>
                    <span className="text-gray-400">
                      {product.updatedAt ? 
                        (product.updatedAt instanceof Date ? 
                          product.updatedAt.toLocaleDateString() : 
                          product.updatedAt.toDate().toLocaleDateString()) 
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Model ID</span>
                    <span className="font-mono text-gray-400">
                      {product.id || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Documentation */}
          <div>
            <h3 className="text-lg font-medium text-white mb-3">API Documentation</h3>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-6">
              {product.apiDocs ? (
                <MarkdownPreview content={product.apiDocs} />
              ) : (
                <p className="text-gray-500 italic">No API documentation available.</p>
              )}
            </div>
          </div>

          {/* Model Images */}
          {product.images && product.images.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Model Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-2">
                    <img 
                      src={image} 
                      alt={`${product.name} screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-white/[0.05]">
            <Button 
              className="flex-1 bg-white/[0.05] border border-white/[0.05] text-white hover:bg-white/[0.08]"
              onClick={onClose}
            >
              Try This Model
            </Button>
            <Button 
              variant="outline"
              className="flex-1 border-white/[0.05] text-gray-400 hover:bg-white/[0.02]"
              onClick={onClose}
            >
              Add to Favorites
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}