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
  const [sliderValue, setSliderValue] = useState(50)
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
              AI Buzz Cut Filter{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Online
              </span>{' '}
              for{' '}
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
          </div>

          {/* Two Column Layout - Premium Style */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-7xl mx-auto">
            
            {/* Left Column - Image Comparison */}
            <div className="flex-1 lg:max-w-[540px]">
              {/* Image comparison container */}
              <div className="relative overflow-hidden bg-gray-100 border border-gray-200 select-none transition-all duration-300 rounded-2xl h-[360px]">
                <div className="relative h-full">
                  <div className="relative overflow-hidden h-full">
                    {/* After image (base layer) */}
                    <div className="w-full h-full">
                      <div className="relative w-full h-full">
                        <img 
                          src="/images/male-after.jpg" 
                          alt="AI Buzz Cut Result" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-xl text-xs font-semibold">
                          After
                        </div>
                      </div>
                    </div>
                    
                    {/* Before image overlay with clip path */}
                    <div 
                      className="absolute top-0 left-0 w-full h-full overflow-hidden"
                      style={{
                        clipPath: `inset(0 ${100 - sliderValue}% 0 0)`
                      }}
                    >
                      <div className="relative w-full h-full">
                        <img 
                          src="/images/male-before.jpg" 
                          alt="Original Photo with Hair" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-2 py-1 rounded-xl text-xs font-semibold">
                          Before
                        </div>
                      </div>
                    </div>
                    
                    {/* Slider overlay */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <label className="block h-full w-full" htmlFor="ImageSlider">
                        <input
                          id="ImageSlider"
                          className="bg-transparent appearance-none h-full cursor-ew-resize focus:outline-none w-full"
                          name="ImageSlider"
                          type="range"
                          step="0.01"
                          min="0"
                          max="100"
                          value={sliderValue}
                          onChange={(e) => setSliderValue(Number(e.target.value))}
                          style={{
                            background: 'transparent',
                            margin: '0 -24px',
                            width: 'calc(100% + 48px)'
                          }}
                        />
                      </label>
                    </div>
                    
                    {/* Slider line indicator */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none flex items-center justify-center"
                      style={{
                        left: `${sliderValue}%`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18M17 8l4 4m0 0l-4 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Upload Section */}
            <div className="flex-1 lg:max-w-[644px]">
              <div className="bg-white rounded-2xl shadow-[0_12px_48px_2px_rgba(0,0,0,0.08)] h-[360px] transition-all duration-300 hover:shadow-[0_20px_64px_4px_rgba(0,0,0,0.12)]">
                <div className="p-3 h-full">
                  <div 
                    className={`relative h-full border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer flex flex-col ${
                      dragActive 
                        ? 'border-primary bg-primary/5' 
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
                    
                    {/* Main Upload Area */}
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                      <div className="flex flex-col items-center space-y-4">
                        {isUploading ? (
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg font-semibold text-primary">Uploading...</p>
                          </div>
                        ) : (
                          <>
                            <Button
                              size="lg"
                              className="bg-[#00FFCA] hover:bg-[#00E6B5] text-black text-base px-6 py-3 h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleUploadClick()
                              }}
                            >
                              <CloudArrowUpIcon className="w-5 h-5" />
                              Upload a photo
                            </Button>
                            
                            <p className="text-sm text-gray-500 text-center">
                              Or drop image here, paste image or URL
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Sample Images */}
                    <div className="p-4 border-t border-gray-100">
                      <div className="space-y-2">
                        <p className="text-xs text-gray-500 text-center">
                          Try with one of these
                        </p>
                        <div className="flex justify-center gap-2">
                          {[
                            { id: 1, filename: 'sample1.png', alt: 'Sample 1' },
                            { id: 2, filename: 'sample2.jpg', alt: 'Sample 2' },
                            { id: 3, filename: 'sample3.jpg', alt: 'Sample 3' },
                            { id: 4, filename: 'sample4.jpg', alt: 'Sample 4' }
                          ].map((sample, index) => (
                            <button
                              key={sample.id}
                              className="w-12 h-12 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all hover:scale-105 shadow-sm hover:shadow-md relative group"
                              onClick={async (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                
                                console.log('🖱️ Sample image clicked:', sample.filename);
                                
                                try {
                                  setIsUploading(true)
                                  
                                  const imageUrl = `/images/${sample.filename}`;
                                  const params = new URLSearchParams({
                                    sampleImage: imageUrl,
                                    filename: sample.filename
                                  });
                                  
                                  const targetUrl = `/buzz-cut-simulator?${params.toString()}`;
                                  console.log('🚀 Navigating to:', targetUrl);
                                  
                                  try {
                                    await router.push(targetUrl);
                                    console.log('✅ Navigation successful');
                                  } catch (navError) {
                                    console.error('❌ Navigation failed:', navError);
                                    window.location.href = targetUrl;
                                  }
                                  
                                } catch (error) {
                                  console.error('Failed to load sample image:', error);
                                  alert('Failed to load sample image, please try uploading your own image');
                                  setIsUploading(false)
                                }
                              }}
                              disabled={isUploading}
                            >
                              <img 
                                src={`/images/${sample.filename}`}
                                alt={sample.alt}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"><span class="text-xs text-gray-500 font-medium">${sample.alt}</span></div>`;
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                                <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                  Try
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* URL Input */}
            {showUrlInput && (
              <div className="mt-4 p-4 border rounded-xl bg-white space-y-3 max-w-7xl mx-auto">
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
          </div>

          {/* Privacy Notice */}
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed mt-8">
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
