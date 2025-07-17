/**
 * Image compression utilities
 */

export interface CompressionOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  maxSizeKB: number;
}

export async function compressImage(
  imageDataUrl: string,
  options: CompressionOptions = {
    maxWidth: 1024,
    maxHeight: 1024,
    quality: 0.8,
    maxSizeKB: 1024 // 1MB
  }
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Calculate new dimensions
        let { width, height } = img;
        const aspectRatio = width / height;

        if (width > options.maxWidth) {
          width = options.maxWidth;
          height = width / aspectRatio;
        }

        if (height > options.maxHeight) {
          height = options.maxHeight;
          width = height * aspectRatio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        let quality = options.quality;
        let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        // Reduce quality if still too large
        while (compressedDataUrl.length > options.maxSizeKB * 1024 * 1.37 && quality > 0.1) {
          quality -= 0.1;
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        console.log('🗜️ Image compressed:', {
          originalSize: imageDataUrl.length,
          compressedSize: compressedDataUrl.length,
          ratio: ((1 - compressedDataUrl.length / imageDataUrl.length) * 100).toFixed(1) + '%',
          quality: quality
        });

        resolve(compressedDataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for compression'));
      };

      img.src = imageDataUrl;
    } catch (error) {
      reject(error);
    }
  });
}

export function getImageSizeInfo(dataUrl: string) {
  const sizeInBytes = dataUrl.length;
  const sizeInKB = sizeInBytes / 1024;
  const sizeInMB = sizeInKB / 1024;
  
  return {
    bytes: sizeInBytes,
    kb: Math.round(sizeInKB),
    mb: parseFloat(sizeInMB.toFixed(2)),
    formatted: sizeInMB > 1 ? `${sizeInMB.toFixed(2)}MB` : `${sizeInKB.toFixed(0)}KB`
  };
}