// DOCS: Cloudinary image upload service

interface CloudinaryUploadResponse {
  secure_url: string
  public_id: string
  format: string
  width: number
  height: number
}

class CloudinaryService {
  private readonly cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  private readonly uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  private readonly apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY
  private readonly apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET

  constructor() {
    if (!this.cloudName || !this.uploadPreset) {
      console.warn('Cloudinary credentials not configured properly')
    }
  }

  // Upload single image
  async uploadImage(file: File, folder: string = 'ai-marketplace'): Promise<CloudinaryUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', this.uploadPreset)
    formData.append('folder', folder)
    formData.append('resource_type', 'image')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      throw new Error('Failed to upload image to Cloudinary')
    }
  }

  // Upload multiple images
  async uploadImages(files: File[], folder: string = 'ai-marketplace'): Promise<CloudinaryUploadResponse[]> {
    const uploadPromises = files.map(file => this.uploadImage(file, folder))
    return Promise.all(uploadPromises)
  }

  // Delete image by public_id
  async deleteImage(publicId: string): Promise<void> {
    if (!this.apiKey || !this.apiSecret) {
      console.warn('Cloudinary API credentials not configured for deletion')
      return
    }

    try {
      // Note: For security, image deletion should ideally be done server-side
      // This is a simplified client-side implementation
      const timestamp = Math.floor(Date.now() / 1000)
      const signature = await this.generateSignature(publicId, timestamp)

      const formData = new FormData()
      formData.append('public_id', publicId)
      formData.append('signature', signature)
      formData.append('api_key', this.apiKey)
      formData.append('timestamp', timestamp.toString())

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/destroy`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Cloudinary delete error:', error)
      throw new Error('Failed to delete image from Cloudinary')
    }
  }

  // Generate signature for authenticated requests
  private async generateSignature(publicId: string, timestamp: number): Promise<string> {
    // Note: In production, signature generation should be done server-side for security
    // This is a simplified implementation
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${this.apiSecret}`
    
    // Using Web Crypto API for SHA-1 hash
    const encoder = new TextEncoder()
    const data = encoder.encode(paramsToSign)
    const hashBuffer = await crypto.subtle.digest('SHA-1', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    
    return hashHex
  }

  // Get optimized image URL with transformations
  getOptimizedUrl(
    publicId: string, 
    options: {
      width?: number
      height?: number
      crop?: 'fill' | 'fit' | 'scale' | 'crop'
      quality?: 'auto' | number
      format?: 'auto' | 'webp' | 'jpg' | 'png'
    } = {}
  ): string {
    const {
      width = 400,
      height = 300,
      crop = 'fill',
      quality = 'auto',
      format = 'auto'
    } = options

    const transformations = [
      width && `w_${width}`,
      height && `h_${height}`,
      crop && `c_${crop}`,
      quality && `q_${quality}`,
      format && `f_${format}`
    ].filter(Boolean).join(',')

    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformations}/${publicId}`
  }

  // Generate thumbnail URL
  getThumbnailUrl(publicId: string): string {
    return this.getOptimizedUrl(publicId, {
      width: 150,
      height: 150,
      crop: 'fill',
      quality: 'auto',
      format: 'webp'
    })
  }

  // Generate preview URL
  getPreviewUrl(publicId: string): string {
    return this.getOptimizedUrl(publicId, {
      width: 800,
      height: 600,
      crop: 'fit',
      quality: 'auto',
      format: 'webp'
    })
  }
}

export const cloudinaryService = new CloudinaryService()
export type { CloudinaryUploadResponse }