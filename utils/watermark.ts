/**
 * Watermark utility functions for adding branding to generated images
 */

/**
 * Add a watermark to an image URL for free users
 * @param imageUrl - The URL of the generated image
 * @param isSubscribed - Whether the user is subscribed (no watermark for pro users)
 * @returns Promise<string> - Data URL of the watermarked image
 */
export async function addWatermarkToImage(imageUrl: string, isSubscribed: boolean = false): Promise<string> {
  // If user is subscribed, return original image
  if (isSubscribed) {
    return imageUrl;
  }

  try {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Cannot get canvas context');

    // Load the image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the original image
        ctx.drawImage(img, 0, 0);

        // Add watermark
        const watermarkText = 'buzzcutfilter.app';
        const fontSize = Math.max(16, Math.min(img.width * 0.03, 24));
        
        // Configure text style
        ctx.font = `${fontSize}px Arial, sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';

        // Add text shadow for better visibility
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        // Position watermark in bottom right corner with padding
        const padding = 15;
        const x = img.width - padding;
        const y = img.height - padding;

        // Draw watermark
        ctx.strokeText(watermarkText, x, y);
        ctx.fillText(watermarkText, x, y);

        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/png', 0.9);
        resolve(dataUrl);
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for watermarking'));
      };

      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Error adding watermark:', error);
    // Return original image if watermarking fails
    return imageUrl;
  }
}

/**
 * Server-side watermark function using Sharp (optional implementation)
 * This would be used if we want to add watermarks on the server side
 */
export async function addWatermarkServerSide(imageBuffer: Buffer, isSubscribed: boolean = false): Promise<Buffer> {
  // If user is subscribed, return original image
  if (isSubscribed) {
    return imageBuffer;
  }

  // Note: This would require installing Sharp and implementing server-side watermarking
  // For now, we'll use client-side watermarking
  console.log('Server-side watermarking not implemented, using client-side approach');
  return imageBuffer;
}