// DOCS: Enhanced AI Model management component with dark theme and comprehensive fields

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/context/ToastContext"
import { productService, Product } from "@/lib/productService"
import ImageUpload from "@/components/ImageUpload"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, "id" | "createdAt" | "updatedAt" | "storeOwnerId" | "storeOwnerName" | "storeOwnerAvatar">, images: File[]) => void
  editProduct?: Product | null
}

function MarkdownPreview({ content }: { content: string }) {
  // Simple markdown renderer - in production, use a proper markdown library
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

function ProductModal({ isOpen, onClose, onSave, editProduct }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "", 
    llmApiUsing: "",
    price: "",
    category: "",
    tags: [] as string[],
    limit: "",
    tokens: "",
    apiDocs: "",
    status: "active" as "active" | "inactive" | "maintenance" | "deprecated" | "out_of_stock",
    stock: "",
    imageFiles: [] as File[]
  })

  const [tagInput, setTagInput] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Populate form when editing
  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name,
        description: editProduct.description,
        llmApiUsing: editProduct.llmApiUsing,
        price: editProduct.price.toString(),
        category: editProduct.category,
        tags: editProduct.tags || [],
        limit: editProduct.limit.toString(),
        tokens: editProduct.tokens.toString(),
        apiDocs: editProduct.apiDocs,
        status: editProduct.status,
        stock: isNaN(editProduct.stock) ? "0" : editProduct.stock.toString(),
        imageFiles: []
      })
    } else {
      // Reset form for new product
      setFormData({
        name: "",
        description: "", 
        llmApiUsing: "",
        price: "",
        category: "",
        tags: [],
        limit: "",
        tokens: "",
        apiDocs: "",
        status: "active",
        stock: "",
        imageFiles: []
      })
    }
    setErrors({})
  }, [editProduct, isOpen])

  const categories = [
    "Language Models", "Computer Vision", "Audio & Speech", "Data Analysis", "Code Generation",
    "Creative AI", "Robotics", "Recommendation Systems", "Security & Detection", "Healthcare AI"
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "AI model/agent name is required"
    if (!formData.description.trim()) newErrors.description = "Model description is required"
    if (!formData.llmApiUsing.trim()) newErrors.llmApiUsing = "LLM/API name is required"
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid API cost is required"
    if (!formData.category) newErrors.category = "AI model type is required"
    if (!formData.limit || parseInt(formData.limit) < 0) newErrors.limit = "Valid usage limit is required"
    if (!formData.tokens || parseInt(formData.tokens) < 0) newErrors.tokens = "Valid token count is required"
    if (!formData.apiDocs.trim()) newErrors.apiDocs = "API documentation is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      const product = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        llmApiUsing: formData.llmApiUsing.trim(),
        price: parseFloat(formData.price),
        category: formData.category,
        tags: formData.tags,
        limit: parseInt(formData.limit),
        tokens: parseInt(formData.tokens),
        apiDocs: formData.apiDocs,
        status: formData.status,
        stock: parseInt(formData.stock) || 0,
        images: []
      }

      await onSave(product, formData.imageFiles)
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        llmApiUsing: "",
        price: "",
        category: "",
        tags: [],
        limit: "",
        tokens: "",
        apiDocs: "",
        status: "active",
        stock: "",
        imageFiles: []
      })
      
      onClose()
    } catch (error) {
      console.error("Error saving product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ 
        ...prev, 
        tags: [...prev.tags, tagInput.trim()] 
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">
              {editProduct ? "Edit AI Model/Agent" : "Publish New AI Model/Agent"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">✕</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-200">
                  AI Model/Agent Name *
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="e.g., GPT-4 Vision Pro, CodeGen Assistant"
                  className={`bg-gray-800 border-gray-600 text-white ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="llmApiUsing" className="block text-sm font-medium mb-2 text-gray-200">
                  LLM/API Provider *
                </label>
                <Input
                  id="llmApiUsing"
                  value={formData.llmApiUsing}
                  onChange={(e) => handleInputChange("llmApiUsing", e.target.value)}
                  placeholder="e.g., OpenAI GPT-4, Anthropic Claude, Custom API"
                  className={`bg-gray-800 border-gray-600 text-white ${errors.llmApiUsing ? "border-red-500" : ""}`}
                />
                {errors.llmApiUsing && <p className="text-red-400 text-sm mt-1">{errors.llmApiUsing}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-200">
                Model Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe capabilities, use cases, performance metrics..."
                rows={4}
                className={`w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Pricing and Limits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2 text-gray-200">
                  Cost per 1K Tokens ($) *
                </label>
                <Input
                  id="price"
                  type="number"
                  step="0.001"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.002"
                  className={`bg-gray-800 border-gray-600 text-white ${errors.price ? "border-red-500" : ""}`}
                />
                {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="limit" className="block text-sm font-medium mb-2 text-gray-200">
                  Monthly Usage Limit *
                </label>
                <Input
                  id="limit"
                  type="number"
                  min="0"
                  value={formData.limit}
                  onChange={(e) => handleInputChange("limit", e.target.value)}
                  placeholder="1000000"
                  className={`bg-gray-800 border-gray-600 text-white ${errors.limit ? "border-red-500" : ""}`}
                />
                {errors.limit && <p className="text-red-400 text-sm mt-1">{errors.limit}</p>}
              </div>

              <div>
                <label htmlFor="tokens" className="block text-sm font-medium mb-2 text-gray-200">
                  Max Tokens per Request *
                </label>
                <Input
                  id="tokens"
                  type="number"
                  min="0"
                  value={formData.tokens}
                  onChange={(e) => handleInputChange("tokens", e.target.value)}
                  placeholder="4096"
                  className={`bg-gray-800 border-gray-600 text-white ${errors.tokens ? "border-red-500" : ""}`}
                />
                {errors.tokens && <p className="text-red-400 text-sm mt-1">{errors.tokens}</p>}
              </div>
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2 text-gray-200">
                  AI Model Type *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className={`w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select AI model type</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2 text-gray-200">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value as "active" | "inactive" | "maintenance" | "deprecated")}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="deprecated">Deprecated</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-200">
                Tags
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tags (e.g., natural-language, image-processing)"
                    className="bg-gray-800 border-gray-600 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline" className="border-gray-600 text-gray-300">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      className="bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* API Documentation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-200">
                  API Documentation (Markdown) *
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="border-gray-600 text-gray-300"
                >
                  {showPreview ? "Edit" : "Preview"}
                </Button>
              </div>
              
              {showPreview ? (
                <div className="border border-gray-600 rounded-md p-4 bg-gray-800 min-h-[200px]">
                  <MarkdownPreview content={formData.apiDocs} />
                </div>
              ) : (
                <textarea
                  value={formData.apiDocs}
                  onChange={(e) => handleInputChange("apiDocs", e.target.value)}
                  placeholder={`# API Documentation

## Endpoints
\`\`\`
POST /api/v1/generate
\`\`\`

## Parameters
- **input** (string): The input text to process
- **max_tokens** (number): Maximum tokens in response

## Example
\`\`\`json
{
  "input": "Hello, how are you?",
  "max_tokens": 100
}
\`\`\`

## Response
\`\`\`json
{
  "output": "Generated response...",
  "tokens_used": 45
}
\`\`\``}
                  rows={12}
                  className={`w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                    errors.apiDocs ? "border-red-500" : ""
                  }`}
                />
              )}
              {errors.apiDocs && <p className="text-red-400 text-sm mt-1">{errors.apiDocs}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-200">
                Model Screenshots & Demos
              </label>
              <ImageUpload
                images={formData.imageFiles}
                onImagesChange={(images) => setFormData(prev => ({ ...prev, imageFiles: images }))}
                maxImages={5}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-700">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isSubmitting 
                  ? (editProduct ? "Updating Model..." : "Publishing Model...") 
                  : (editProduct ? "Update AI Model/Agent" : "Publish AI Model/Agent")
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function EnhancedProductManagement() {
  const { user } = useAuth()
  const { showSuccess, showError } = useToast()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])

  // Load products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      if (!user?.uid) return

      try {
        setLoading(true)
        const userProducts = await productService.getProductsByStore(user.uid)
        setProducts(userProducts)
      } catch (error) {
        console.error("Error loading products:", error)
        // Sample data for development
        setProducts([
          {
            id: "1",
            name: "GPT-4 Vision Pro",
            description: "Advanced multimodal AI model capable of understanding both text and images.",
            llmApiUsing: "OpenAI GPT-4 Vision",
            price: 0.03,
            category: "Language Models",
            tags: ["multimodal", "vision", "text-generation"],
            limit: 1000000,
            tokens: 4096,
            apiDocs: "# GPT-4 Vision API\n\nPowerful multimodal capabilities...",
            images: [],
            status: "active",
            stock: 1000000,
            storeOwnerId: user?.uid || "",
            storeOwnerName: user?.displayName || "AI Developer",
            storeOwnerAvatar: user?.photoURL || "",
            createdAt: new Date("2024-12-01"),
            updatedAt: new Date("2024-12-15")
          },
          {
            id: "2", 
            name: "CodeGen Assistant",
            description: "Specialized code generation AI that supports 40+ programming languages.",
            llmApiUsing: "Custom CodeGen Model",
            price: 0.02,
            category: "Code Generation",
            tags: ["programming", "code-generation", "debugging"],
            limit: 500000,
            tokens: 2048,
            apiDocs: "# CodeGen API\n\nCode generation and optimization...",
            images: [],
            status: "active",
            stock: 500000,
            storeOwnerId: user?.uid || "",
            storeOwnerName: user?.displayName || "AI Developer",
            storeOwnerAvatar: user?.photoURL || "",
            createdAt: new Date("2024-11-15"),
            updatedAt: new Date("2024-12-10")
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [user?.uid])

  const handleAddProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "storeOwnerId" | "storeOwnerName" | "storeOwnerAvatar">, images: File[]) => {
    try {
      if (!user?.uid) {
        showError("Authentication Error", "Please log in to add products")
        return
      }

      // Add creator information
      const productWithCreator = {
        ...productData,
        storeOwnerId: user.uid,
        storeOwnerName: user.displayName || "Anonymous Creator",
        storeOwnerAvatar: user.photoURL || ""
      }

      // Add product with Firebase
      const productId = await productService.addProduct(productWithCreator, images)

      // Create local product object for immediate UI update
      const newProduct: Product = {
        ...productWithCreator,
        id: productId,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      setProducts(prev => [newProduct, ...prev])
      setShowAddModal(false)
      showSuccess("AI Model Published", `${productData.name} has been successfully published to the marketplace`)
      
      // Reload products to get the updated images from Cloudinary
      setTimeout(async () => {
        try {
          const updatedProducts = await productService.getProductsByStore(user.uid)
          setProducts(updatedProducts)
        } catch (error) {
          console.error("Error reloading products:", error)
        }
      }, 2000)
    } catch (error) {
      console.error("Error adding product:", error)
      showError("Publication Failed", "Failed to publish AI model. Please try again.")
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowEditModal(true)
  }

  const handleUpdateProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "storeOwnerId" | "storeOwnerName" | "storeOwnerAvatar">, images: File[]) => {
    try {
      if (!editingProduct || !user?.uid) {
        showError("Update Error", "Invalid product or authentication")
        return
      }

      await productService.updateProduct(editingProduct.id, productData, images)
      
      // Update local state
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, updatedAt: new Date() }
          : p
      ))
      
      setShowEditModal(false)
      setEditingProduct(null)
      showSuccess("AI Model Updated", `${productData.name} has been successfully updated`)
      
      // Reload products to get updated images
      setTimeout(async () => {
        try {
          const updatedProducts = await productService.getProductsByStore(user.uid)
          setProducts(updatedProducts)
        } catch (error) {
          console.error("Error reloading products:", error)
        }
      }, 1000)
    } catch (error) {
      console.error("Error updating product:", error)
      showError("Update Failed", "Failed to update AI model. Please try again.")
    }
  }

  const handleDeleteProduct = async (productId: string, productName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return
    }

    try {
      await productService.deleteProduct(productId)
      setProducts(prev => prev.filter(p => p.id !== productId))
      showSuccess("AI Model Deleted", `${productName} has been successfully deleted`)
    } catch (error) {
      console.error("Error deleting product:", error)
      showError("Deletion Failed", "Failed to delete AI model. Please try again.")
    }
  }

  const handleToggleStatus = async (productId: string) => {
    try {
      const product = products.find(p => p.id === productId)
      if (!product) return

      const newStatus = product.status === "active" ? "inactive" : "active"
      await productService.updateProduct(productId, { status: newStatus })
      
      setProducts(prev => prev.map(p => 
        p.id === productId 
          ? { ...p, status: newStatus, updatedAt: new Date() }
          : p
      ))

      showSuccess(
        "Status Updated", 
        `${product.name} has been ${newStatus === "active" ? "activated" : "deactivated"}`
      )
    } catch (error) {
      console.error("Error updating product status:", error)
      showError("Status Update Failed", "Failed to update product status. Please try again.")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-white/20 text-white border border-white/30 backdrop-blur-sm"
      case "inactive": 
        return "bg-white/5 text-gray-400 border border-white/15 backdrop-blur-sm"
      case "maintenance":
        return "bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm"
      case "deprecated":
        return "bg-black/30 text-gray-500 border border-white/10 backdrop-blur-sm"
      default:
        return "bg-white/5 text-gray-400 border border-white/15 backdrop-blur-sm"
    }
  }

  const activeProducts = products.filter(p => p.status === "active").length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.limit), 0)
  const lowLimitProducts = products.filter(p => p.limit <= 50000).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
          <p className="mt-4 text-gray-400">Loading AI models...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6">
        <div>
          <h2 className="text-2xl font-bold text-white">AI Model & Agent Hub</h2>
          <p className="text-gray-400">Manage your AI models, agents, and API services</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          + Publish New Model/Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{products.length}</div>
            <p className="text-sm text-gray-400">Total AI Models</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-400">{activeProducts}</div>
            <p className="text-sm text-gray-400">Active Models</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-400">${totalValue.toLocaleString()}</div>
            <p className="text-sm text-gray-400">Total API Value</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-400">{lowLimitProducts}</div>
            <p className="text-sm text-gray-400">Low Limit Models</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="bg-gray-800 border-gray-700 mx-6">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-white">Your AI Models & Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2 text-gray-300">Model/Agent</th>
                  <th className="text-left py-3 px-2 text-gray-300">Type</th>
                  <th className="text-left py-3 px-2 text-gray-300">Cost/1K</th>
                  <th className="text-left py-3 px-2 text-gray-300">Limit</th>
                  <th className="text-left py-3 px-2 text-gray-300">Status</th>
                  <th className="text-left py-3 px-2 text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                          {product.images && product.images.length > 0 ? (
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              🤖
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">{product.name}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">
                            {product.description}
                          </div>
                          <div className="text-xs text-blue-400">
                            via {product.llmApiUsing}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className="bg-blue-900 text-blue-300 border-blue-700">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-2 font-medium text-green-400">${product.price.toFixed(3)}</td>
                    <td className="py-3 px-2">
                      <span className={product.limit <= 50000 ? "text-orange-400 font-medium" : "text-gray-300"}>
                        {product.limit.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className={getStatusColor(product.status)}>
                        {product.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleToggleStatus(product.id!)}
                          className="text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                        >
                          {product.status === "active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                          onClick={() => handleDeleteProduct(product.id!, product.name)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <ProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
        editProduct={null}
      />

      {/* Edit Product Modal */}
      <ProductModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingProduct(null)
        }}
        onSave={handleUpdateProduct}
        editProduct={editingProduct}
      />
    </div>
  )
}