// DOCS: Image upload component for product management

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  maxImages?: number
}

export default function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (fileList: File[]) => {
    const imageFiles = fileList.filter(file => file.type.startsWith('image/'))
    const remainingSlots = maxImages - images.length
    const newFiles = imageFiles.slice(0, remainingSlots)
    
    if (newFiles.length > 0) {
      onImagesChange([...images, ...newFiles])
    }
  }

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-2">
          <div className="text-4xl">�️</div>
          <div>
            <p className="text-sm font-medium">
              {images.length >= maxImages 
                ? `Maximum ${maxImages} screenshots allowed`
                : "Upload model screenshots, demos, or interface images"
              }
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 10MB each • Screenshots of your AI model in action
            </p>
          </div>
          {images.length < maxImages && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              onClick={openFileDialog}
            >
              Choose Files
            </Button>
          )}
        </div>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((file, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                onClick={() => removeImage(index)}
              >
                ×
              </Button>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {index === 0 ? "Main" : `${index + 1}`}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Count */}
      <div className="text-sm text-gray-500 text-center">
        {images.length} of {maxImages} images selected
      </div>
    </div>
  )
}