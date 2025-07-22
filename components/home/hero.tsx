'use client'

import { SparklesIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlValue, setUrlValue] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFileUpload(files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/bmp']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPG, PNG, WebP, BMP)')
      return
    }

    // 验证文件大小 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size cannot exceed 10MB')
      return
    }

    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await fetch('/api/upload-temp-image', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('上传失败')
      }
      
      const data = await response.json()
      
      // 检查数据大小，如果太大则不使用 sessionStorage
      const imageDataStr = JSON.stringify({
        imageUrl: data.imageUrl,
        imageBase64: data.imageBase64,
        uploadedAt: Date.now()
      })
      
      try {
        // 尝试存储到 sessionStorage，如果失败则直接跳转
        sessionStorage.setItem('uploadedImageData', imageDataStr)
        console.log('📦 Image data saved to sessionStorage')
      } catch (error) {
        console.warn('⚠️ SessionStorage quota exceeded, proceeding without cache:', error)
        // 如果存储失败，清除可能的部分数据
        sessionStorage.removeItem('uploadedImageData')
      }
      
      // 跳转到 buzz-cut-simulator 页面
      router.push('/buzz-cut-simulator')
      
          } catch (error) {
        console.error('Upload error:', error)
        alert('Upload failed, please try again')
      } finally {
      setIsUploading(false)
    }
  }

  const handleUrlSubmit = async () => {
    if (!urlValue.trim()) return
    
    setIsUploading(true)
    
    try {
      // 验证 URL 格式
      new URL(urlValue)
      
      const response = await fetch('/api/proxy-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl: urlValue }),
      })
      
      if (!response.ok) {
        throw new Error('无法加载图片 URL')
      }
      
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: blob.type })
      
      await handleFileUpload(file)
      
    } catch (error) {
      console.error('URL error:', error)
      alert('Invalid image URL or unable to load image')
    } finally {
      setIsUploading(false)
      setShowUrlInput(false)
      setUrlValue('')
    }
  }



  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // 添加全局粘贴事件监听器
  useEffect(() => {
    const handleGlobalPaste = async (e: ClipboardEvent) => {
      console.log('🍃 Global paste event detected')
      
      // 只在首页且没有其他输入框聚焦时处理粘贴
      const activeElement = document.activeElement
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        console.log('🚫 Paste ignored - input element focused')
        return
      }

      const items = e.clipboardData?.items
      if (!items) {
        console.log('🚫 No clipboard items')
        return
      }

      console.log('📋 Clipboard items:', Array.from(items).map(item => ({ type: item.type, kind: item.kind })))

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        
        if (item.type.indexOf('image') !== -1) {
          console.log('🖼️ Image detected in clipboard')
          e.preventDefault()
          const file = item.getAsFile()
          if (file) {
            console.log('📁 Processing pasted image file:', file.name, file.type, file.size)
            await handleFileUpload(file)
            return
          }
        }
        
        if (item.type === 'text/plain') {
          const text = await new Promise<string>((resolve) => {
            item.getAsString(resolve)
          })
          
          console.log('📝 Text detected in clipboard:', text.substring(0, 100))
          
          // 检查是否是图片 URL
          try {
            const url = new URL(text)
            if (url.protocol === 'http:' || url.protocol === 'https:') {
              console.log('🔗 URL detected, showing input')
              e.preventDefault()
              setUrlValue(text)
              setShowUrlInput(true)
            }
          } catch {
            // 不是有效 URL，忽略
          }
        }
      }
    }

    document.addEventListener('paste', handleGlobalPaste)
    return () => {
      document.removeEventListener('paste', handleGlobalPaste)
    }
  }, [handleFileUpload, setUrlValue, setShowUrlInput])

  // 简化的本地粘贴处理函数
  const handleLocalPaste = async (e: React.ClipboardEvent) => {
    e.preventDefault()
    const items = e.clipboardData.items
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile()
        if (file) {
          await handleFileUpload(file)
          return
        }
      }
    }
  }

  return (
    <section className="relative bg-white min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Buzz Cut Preview{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                100% Automatically
              </span>{' '}
              and{' '}
              <span className="relative">
                Free
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 120 12" fill="none">
                  <path
                    d="M2 10C20 4 40 2 60 6C80 2 100 4 118 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-yellow-400"
                  />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Buzz cut preview: Fully automated in{' '}
              <span className="font-semibold text-primary">5 seconds</span> with{' '}
              <span className="font-semibold text-primary">1 click</span>
            </p>
            
            <p className="text-gray-500 max-w-2xl mx-auto">
              Thanks to our AI, you can see your buzz cut transformation instantly. 
              Upload any photo and watch the magic happen automatically.
            </p>
          </div>

          {/* Upload Section - Remove.bg Style */}
          <div className="max-w-lg mx-auto">
            <div 
              className={`relative p-16 border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-white ${
                dragActive 
                  ? 'border-primary bg-primary/5 scale-105' 
                  : 'border-gray-300 hover:border-primary/50'
              } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onPaste={handleLocalPaste}
              onClick={handleUploadClick}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleUploadClick()
                }
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="text-center space-y-6">
                <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto" />
                
                {isUploading ? (
                  <div className="space-y-4">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-lg font-semibold text-primary">Uploading...</p>
                  </div>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="text-lg px-8 py-4 h-auto rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUploadClick()
                      }}
                    >
                      Upload Image
                    </Button>
                    
                    <div className="space-y-2">
                      <p className="text-gray-600 font-medium">or drop a file,</p>
                      <p className="text-sm text-gray-500">
                        paste image (Ctrl+V) or{' '}
                        <button 
                          className="text-primary hover:underline font-medium"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowUrlInput(true)
                          }}
                        >
                          URL
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* URL Input */}
            {showUrlInput && (
              <div className="mt-4 p-4 border rounded-xl bg-white space-y-3">
                <input
                  type="url"
                  placeholder="Enter image URL..."
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUrlSubmit()
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleUrlSubmit}
                    disabled={!urlValue.trim() || isUploading}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowUrlInput(false)
                      setUrlValue('')
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            {/* Sample Images */}
            <div className="mt-8 space-y-4">
              <p className="text-gray-600 text-center font-medium">
                No image? Try one of these:
              </p>
              <div className="flex justify-center gap-3">
                {[
                  { id: 1, filename: 'sample1.png', alt: 'Sample 1' },
                  { id: 2, filename: 'sample2.jpg', alt: 'Sample 2' },
                  { id: 3, filename: 'sample3.jpg', alt: 'Sample 3' },
                  { id: 4, filename: 'sample4.jpg', alt: 'Sample 4' }
                ].map((sample) => (
                  <button
                    key={sample.id}
                    className="w-16 h-16 rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all hover:scale-110 shadow-sm hover:shadow-md relative group"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      
                      console.log('🖱️ Sample image clicked:', sample.filename);
                      
                      try {
                        setIsUploading(true)
                        
                        // 直接传递图片URL，不使用sessionStorage
                        const imageUrl = `/images/${sample.filename}`;
                        
                        console.log('🔗 Preparing to navigate with URL:', imageUrl);
                        
                        // 将图片URL作为查询参数传递
                        const params = new URLSearchParams({
                          sampleImage: imageUrl,
                          filename: sample.filename
                        });
                        
                        const targetUrl = `/buzz-cut-simulator?${params.toString()}`;
                        console.log('🚀 Navigating to:', targetUrl);
                        
                        // 跳转到 buzz-cut-simulator 页面并传递参数
                        try {
                          await router.push(targetUrl);
                          console.log('✅ Navigation successful');
                        } catch (navError) {
                          console.error('❌ Navigation failed:', navError);
                          // 备用方案：使用 window.location
                          window.location.href = targetUrl;
                        }
                        
                      } catch (error) {
                        console.error('Failed to load sample image:', error);
                        alert('Failed to load sample image, please try uploading your own image');
                        setIsUploading(false)
                      }
                    }}
                    disabled={isUploading}
                    style={{ pointerEvents: 'auto' }}
                  >
                    <img 
                      src={`/images/${sample.filename}`}
                      alt={sample.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      onError={(e) => {
                        // 如果图片加载失败，显示占位符
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"><span class="text-xs text-gray-500 font-medium">${sample.alt}</span></div>`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center pointer-events-none">
                      <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Try This
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4" />
              <span>AI-Powered</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>No Registration Required</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>Instant Results</span>
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            By uploading an image you agree to our{' '}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
            To learn more about how we handle your personal data, check our{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
