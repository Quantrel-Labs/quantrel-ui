// DOCS: Firebase service for product management operations

import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  DocumentData,
  QuerySnapshot,
  Timestamp
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from './firebase'
import { cloudinaryService, CloudinaryUploadResponse } from './cloudinaryService'

export interface Product {
  id?: string
  name: string
  description: string
  llmApiUsing: string // Name of the LLM/API being used
  price: number // Cost per 1K tokens
  category: string
  tags: string[]
  limit: number // Usage limit per month
  tokens: number // Number of tokens included
  apiDocs: string // Markdown content for API documentation
  apiKey: string // API key for this model
  allowedOrigin: string // Allowed origin for this model
  status: "active" | "inactive" | "maintenance" | "deprecated" | "out_of_stock"
  images: string[]
  storeOwnerId: string
  storeOwnerName: string // Creator's display name
  storeOwnerAvatar?: string // Creator's avatar URL
  stock: number // Available quantity
  createdAt: Timestamp | Date
  updatedAt: Timestamp | Date
}

export interface ProductFormData {
  name: string
  description: string
  llmApiUsing: string
  price: number
  category: string
  tags: string[]
  limit: number
  tokens: number
  apiDocs: string
  status: "active" | "inactive" | "maintenance" | "deprecated" | "out_of_stock"
  stock: number
  images: File[]
}

class ProductService {
  private readonly collectionName = 'products'

  // Add new product
  async addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, images: File[] = []): Promise<string> {
    try {
      // Upload images to Cloudinary
      const imageUrls: string[] = []
      if (images.length > 0) {
        const uploadResults = await cloudinaryService.uploadImages(images, 'ai-models')
        imageUrls.push(...uploadResults.map(result => result.secure_url))
      }

      const product = {
        ...productData,
        images: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, this.collectionName), product)
      return docRef.id
    } catch (error) {
      console.error('Error adding product:', error)
      throw new Error('Failed to add product')
    }
  }

  // Get products by store owner
  async getProductsByStore(storeOwnerId: string): Promise<Product[]> {
    try {
      console.log('Fetching products for store owner:', storeOwnerId)
      
      const q = query(
        collection(db, this.collectionName),
        where('storeOwnerId', '==', storeOwnerId)
      )

      const querySnapshot = await getDocs(q)
      console.log('Query snapshot received, docs count:', querySnapshot.docs.length)
      
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
      
      // Sort by updatedAt on client side to avoid index requirements
      const sortedProducts = products.sort((a, b) => {
        const aTime = a.updatedAt instanceof Timestamp ? a.updatedAt.toDate() : new Date(a.updatedAt || 0)
        const bTime = b.updatedAt instanceof Timestamp ? b.updatedAt.toDate() : new Date(b.updatedAt || 0)
        return bTime.getTime() - aTime.getTime()
      })
      
      console.log('Returning', sortedProducts.length, 'products')
      return sortedProducts
    } catch (error) {
      console.error('Error fetching products:', error)
      
      // Check if it's a network error
      if (error instanceof Error && (error.message.includes('network') || error.message.includes('offline'))) {
        console.log('Network error detected, providing offline fallback')
      }
      
      // Return empty array instead of throwing to allow graceful degradation
      return []
    }
  }

  // Get all active products (for customers)
  async getActiveProducts(category?: string): Promise<Product[]> {
    try {
      console.log('Fetching active products', category ? `for category: ${category}` : '')
      
      let q = query(
        collection(db, this.collectionName),
        where('status', '==', 'active')
      )

      if (category) {
        q = query(
          collection(db, this.collectionName),
          where('status', '==', 'active'),
          where('category', '==', category)
        )
      }

      const querySnapshot = await getDocs(q)
      console.log('Active products query snapshot received, docs count:', querySnapshot.docs.length)
      
      let products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
      
      console.log('Raw products before filtering:', products.length)
      
      // Filter out products with zero stock on client side
      // Handle NaN values by treating them as available (no stock limit)
      products = products.filter(product => {
        const stock = product.stock;
        const isAvailable = stock == null || isNaN(stock) || stock > 0;
        if (!isAvailable) {
          console.log(`Filtering out product ${product.name} due to stock: ${stock}`)
        }
        return isAvailable;
      })
      
      console.log('Products after stock filtering:', products.length)

      // Sort by updatedAt on client side to avoid index requirements
      const sortedProducts = products.sort((a, b) => {
        const aTime = a.updatedAt instanceof Timestamp ? a.updatedAt.toDate() : new Date(a.updatedAt || 0)
        const bTime = b.updatedAt instanceof Timestamp ? b.updatedAt.toDate() : new Date(b.updatedAt || 0)
        return bTime.getTime() - aTime.getTime()
      })
      
      console.log('Returning', sortedProducts.length, 'active products')
      return sortedProducts
    } catch (error) {
      console.error('Error fetching active products:', error)
      
      // Check for specific Firebase errors
      if (error instanceof Error) {
        if (error.message.includes('requires an index')) {
          console.error('Firebase index required. Please create the required index in Firebase Console.')
        } else if (error.message.includes('network') || error.message.includes('offline')) {
          console.log('Network error detected for active products')
        }
      }
      
      // Return empty array instead of throwing to allow graceful degradation
      return []
    }
  }

  // Update product
  async updateProduct(productId: string, updates: Partial<Product>, newImages: File[] = []): Promise<void> {
    try {
      // Upload new images to Cloudinary if provided
      let imageUrls: string[] = []
      if (newImages.length > 0) {
        const uploadResults = await cloudinaryService.uploadImages(newImages, 'ai-models')
        imageUrls = uploadResults.map(result => result.secure_url)
      }

      const updateData = {
        ...updates,
        ...(imageUrls.length > 0 && { images: imageUrls }),
        updatedAt: serverTimestamp()
      }

      const productRef = doc(db, this.collectionName, productId)
      await updateDoc(productRef, updateData)
    } catch (error) {
      console.error('Error updating product:', error)
      throw new Error('Failed to update product')
    }
  }

  // Delete product
  async deleteProduct(productId: string): Promise<void> {
    try {
      // First, delete associated images from storage
      await this.deleteProductImages(productId)

      // Then delete the product document
      const productRef = doc(db, this.collectionName, productId)
      await deleteDoc(productRef)
    } catch (error) {
      console.error('Error deleting product:', error)
      throw new Error('Failed to delete product')
    }
  }

  // Update stock quantity
  async updateStock(productId: string, newStock: number): Promise<void> {
    try {
      const productRef = doc(db, this.collectionName, productId)
      const status = newStock === 0 ? 'out_of_stock' : 'active'
      
      await updateDoc(productRef, {
        stock: newStock,
        status,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating stock:', error)
      throw new Error('Failed to update stock')
    }
  }

  // Upload product images to Firebase Storage
  private async uploadProductImages(images: File[], productId?: string): Promise<string[]> {
    const uploadPromises = images.map(async (image, index) => {
      const fileName = `${productId || Date.now()}_${index}_${image.name}`
      const imageRef = ref(storage, `products/${fileName}`)
      
      await uploadBytes(imageRef, image)
      return await getDownloadURL(imageRef)
    })

    return Promise.all(uploadPromises)
  }

  // Delete product images from Firebase Storage
  private async deleteProductImages(productId: string): Promise<void> {
    try {
      // This would require getting the product first to get image URLs
      // For now, we'll implement a simple version
      // In production, you might want to store image paths separately for easier deletion
      console.log(`Deleting images for product ${productId}`)
    } catch (error) {
      console.error('Error deleting product images:', error)
    }
  }

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('category', '==', category),
        where('status', '==', 'active'),
        orderBy('updatedAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
    } catch (error) {
      console.error('Error fetching products by category:', error)
      throw new Error('Failed to fetch products by category')
    }
  }

  // Search products by name or description
  async searchProducts(searchTerm: string): Promise<Product[]> {
    try {
      // Note: Firestore doesn't have full-text search
      // This is a basic implementation - for production, consider using Algolia or similar
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'active'),
        orderBy('updatedAt', 'desc')
      )

      const querySnapshot = await getDocs(q)
      const allProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]

      // Client-side filtering (not ideal for large datasets)
      return allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } catch (error) {
      console.error('Error searching products:', error)
      throw new Error('Failed to search products')
    }
  }

  // Get low stock products for a store
  async getLowStockProducts(storeOwnerId: string, threshold: number = 5): Promise<Product[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('storeOwnerId', '==', storeOwnerId),
        where('stock', '<=', threshold),
        orderBy('stock', 'asc')
      )

      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
    } catch (error) {
      console.error('Error fetching low stock products:', error)
      throw new Error('Failed to fetch low stock products')
    }
  }

  // Get product statistics for store dashboard
  async getProductStats(storeOwnerId: string): Promise<{
    totalProducts: number
    activeProducts: number
    totalValue: number
    lowStockCount: number
    categoryCounts: Record<string, number>
  }> {
    try {
      const products = await this.getProductsByStore(storeOwnerId)
      
      const activeProducts = products.filter(p => p.status === 'active').length
      const totalValue = products.reduce((sum, p) => sum + (p.price * p.limit), 0)
      const lowLimitCount = products.filter(p => p.limit <= 5000).length // Low limit models (< 5K calls)
      
      const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      return {
        totalProducts: products.length,
        activeProducts,
        totalValue,
        lowStockCount: lowLimitCount,
        categoryCounts
      }
    } catch (error) {
      console.error('Error calculating product stats:', error)
      throw new Error('Failed to calculate product statistics')
    }
  }
}

export const productService = new ProductService()