// DOCS: Product management component for store owners

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { productService, Product } from "@/lib/productService"
import ImageUpload from "@/components/ImageUpload"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, "id" | "createdAt" | "updatedAt" | "storeOwnerId">, images: File[]) => void
}

function AddProductModal({ isOpen, onClose, onSave }: AddProductModalProps) {
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
    status: "active" as const,
    stock: "",
    imageFiles: [] as File[]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

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
        stock: parseInt(formData.stock),
        images: [],
        storeOwnerName: "", // Will be filled by the parent component
        storeOwnerAvatar: ""
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Add New AI Model/Agent</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AI Model/Agent Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                AI Model/Agent Name *
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., GPT-4 Vision Pro, CodeGen Assistant, ImageAnalyzer Bot"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Model/Agent Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe capabilities, use cases, performance metrics, training data, API endpoints, etc..."
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2">
                  API Cost per 1K Tokens/Requests ($) *
                </label>
                <Input
                  id="price"
                  type="number"
                  step="0.001"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.002"
                  className={errors.price ? "border-red-500" : ""}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium mb-2">
                  Available API Calls/Instances *
                </label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  placeholder="1000000"
                  className={errors.stock ? "border-red-500" : ""}
                />
                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
              </div>
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  AI Model Type *
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select AI model type</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value as "active" | "inactive")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Model/Agent Screenshots & Demos
              </label>
              <ImageUpload
                images={formData.imageFiles}
                onImagesChange={(images) => setFormData(prev => ({ ...prev, imageFiles: images }))}
                maxImages={5}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Publishing Model..." : "Publish AI Model/Agent"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ProductManagement() {
  const { user } = useAuth()
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "GPT-4 Vision Pro",
      description: "Advanced multimodal AI model capable of understanding both text and images. Perfect for content analysis, document processing, and visual AI applications.",
      llmApiUsing: "OpenAI GPT-4 Vision",
      price: 0.03,
      category: "Language Models",
      tags: ["multimodal", "vision", "text-generation"],
      limit: 1000000,
      tokens: 4096,
      apiDocs: "# GPT-4 Vision API Documentation...",
      status: "active",
      stock: 1000000,
      images: [],
      storeOwnerId: user?.uid || "",
      storeOwnerName: "OpenAI Labs",
      storeOwnerAvatar: "https://via.placeholder.com/40",
      createdAt: new Date("2024-12-01"),
      updatedAt: new Date("2024-12-15")
    },
    {
      id: "2", 
      name: "CodeGen Assistant",
      description: "Specialized code generation AI that supports 40+ programming languages. Includes debugging, optimization, and documentation features.",
      llmApiUsing: "Custom CodeGen Model v2.1",
      price: 0.02,
      category: "Code Generation",
      tags: ["programming", "code-generation", "debugging"],
      limit: 500000,
      tokens: 8192,
      apiDocs: "# CodeGen API Documentation...",
      status: "active",
      stock: 500000,
      images: [],
      storeOwnerId: user?.uid || "",
      storeOwnerName: "DevTools AI",
      storeOwnerAvatar: "https://via.placeholder.com/40",
      createdAt: new Date("2024-11-15"),
      updatedAt: new Date("2024-12-10")
    },
    {
      id: "3",
      name: "ImageAnalyzer Pro",
      description: "Computer vision model for object detection, facial recognition, and image classification with 99.2% accuracy rate.",
      llmApiUsing: "TensorFlow Vision API",
      price: 0.015,
      category: "Computer Vision", 
      tags: ["computer-vision", "object-detection", "classification"],
      limit: 250000,
      tokens: 2048,
      apiDocs: "# ImageAnalyzer API Documentation...",
      status: "out_of_stock",
      stock: 0,
      images: [],
      storeOwnerId: user?.uid || "",
      storeOwnerName: "VisionTech AI",
      storeOwnerAvatar: "https://via.placeholder.com/40",
      createdAt: new Date("2024-10-20"),
      updatedAt: new Date("2024-12-05")
    }
  ])

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
        // Keep sample data if Firebase fails
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [user?.uid])

  const handleAddProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt" | "storeOwnerId">, images: File[]) => {
    try {
      if (!user?.uid) return

      // Add product with Firebase (including image upload)
      const productId = await productService.addProduct({
        ...productData,
        storeOwnerId: user.uid
      }, images)

      // Create local product object for immediate UI update
      const newProduct: Product = {
        ...productData,
        id: productId,
        storeOwnerId: user.uid,
        images: [], // Images will be populated after upload
        createdAt: new Date(),
        updatedAt: new Date()
      }

      setProducts(prev => [newProduct, ...prev])
      
      // Reload products to get the updated images
      setTimeout(async () => {
        try {
          const updatedProducts = await productService.getProductsByStore(user.uid)
          setProducts(updatedProducts)
        } catch (error) {
          console.error("Error reloading products:", error)
        }
      }, 1000)
    } catch (error) {
      console.error("Error adding product:", error)
      // TODO: Show error toast/notification
    }
  }

  const handleEditProduct = (productId: string) => {
    // TODO: Implement edit functionality
    console.log("Edit product:", productId)
  }

  const handleDeleteProduct = (productId: string) => {
    // TODO: Implement delete functionality with confirmation
    setProducts(prev => prev.filter(p => p.id !== productId))
  }

  const handleToggleStatus = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === "active" ? "inactive" : "active", updatedAt: new Date() }
        : p
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive": 
        return "bg-gray-100 text-gray-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const activeProducts = products.filter(p => p.status === "active").length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  const lowStockProducts = products.filter(p => p.stock <= 5).length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Model & Agent Hub</h2>
          <p className="text-gray-600">Manage your AI models, agents, and API services</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
          + Publish New Model/Agent
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-sm text-gray-600">Total AI Models</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{activeProducts}</div>
            <p className="text-sm text-gray-600">Active Models</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Total API Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{lowStockProducts}</div>
            <p className="text-sm text-gray-600">Low Capacity Models</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your AI Models & Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Model/Agent</th>
                  <th className="text-left py-3 px-2">Type</th>
                  <th className="text-left py-3 px-2">Cost/1K</th>
                  <th className="text-left py-3 px-2">Capacity</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
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
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge className="bg-blue-100 text-blue-800">{product.category}</Badge>
                    </td>
                    <td className="py-3 px-2 font-medium">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span className={product.stock <= 5 ? "text-orange-600 font-medium" : ""}>
                        {product.stock}
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
                          onClick={() => handleEditProduct(product.id)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleToggleStatus(product.id)}
                        >
                          {product.status === "active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
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
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />
    </div>
  )
}