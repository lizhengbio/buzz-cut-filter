// Advanced hair detection and buzz cut simulation
export class AdvancedHairProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private tempCanvas: HTMLCanvasElement;
  private tempCtx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.tempCanvas = document.createElement('canvas');
    this.tempCtx = this.tempCanvas.getContext('2d')!;
  }

  async processImage(imageUrl: string, options: { guardLength: number; hairColor: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          // Set up canvas dimensions
          this.canvas.width = img.width;
          this.canvas.height = img.height;
          this.tempCanvas.width = img.width;
          this.tempCanvas.height = img.height;
          
          // Draw original image
          this.ctx.drawImage(img, 0, 0);
          this.tempCtx.drawImage(img, 0, 0);
          
          // Apply advanced buzz cut processing
          this.applyAdvancedBuzzCut(options);
          
          resolve(this.canvas.toDataURL('image/jpeg', 0.95));
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = reject;
      img.src = imageUrl;
    });
  }

  private applyAdvancedBuzzCut(options: { guardLength: number; hairColor: string }) {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const { width, height, data } = imageData;
    
    // Step 1: Detect face and hair regions
    const faceRegion = this.detectFaceRegion(data, width, height);
    const hairMask = this.createHairMask(data, width, height, faceRegion);
    
    // Step 2: Apply buzz cut effect
    this.applyBuzzCutEffect(data, width, height, hairMask, options);
    
    // Step 3: Apply post-processing
    this.applyPostProcessing(data, width, height, hairMask, options);
    
    // Put processed data back
    this.ctx.putImageData(imageData, 0, 0);
  }

  private detectFaceRegion(data: Uint8ClampedArray, width: number, height: number) {
    // Enhanced face detection using skin color analysis
    const skinPixels: { x: number; y: number; r: number; g: number; b: number }[] = [];
    
    // Sample pixels to find skin tone
    for (let y = Math.floor(height * 0.2); y < Math.floor(height * 0.8); y += 5) {
      for (let x = Math.floor(width * 0.2); x < Math.floor(width * 0.8); x += 5) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        
        // Check if pixel looks like skin
        if (this.isSkinColor(r, g, b)) {
          skinPixels.push({ x, y, r, g, b });
        }
      }
    }
    
    if (skinPixels.length === 0) {
      // Fallback to center region
      return {
        x: Math.floor(width * 0.25),
        y: Math.floor(height * 0.3),
        width: Math.floor(width * 0.5),
        height: Math.floor(height * 0.4)
      };
    }
    
    // Find bounding box of skin pixels
    const minX = Math.min(...skinPixels.map(p => p.x));
    const maxX = Math.max(...skinPixels.map(p => p.x));
    const minY = Math.min(...skinPixels.map(p => p.y));
    const maxY = Math.max(...skinPixels.map(p => p.y));
    
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

  private isSkinColor(r: number, g: number, b: number): boolean {
    // Enhanced skin color detection
    const skinConditions = [
      // Condition 1: Basic skin tone range
      r > 95 && g > 40 && b > 20 && 
      Math.max(r, g, b) - Math.min(r, g, b) > 15 &&
      Math.abs(r - g) > 15 && r > g && r > b,
      
      // Condition 2: Alternative skin tone
      r > 220 && g > 210 && b > 170 &&
      Math.abs(r - g) <= 15 && r > b && g > b,
      
      // Condition 3: Darker skin tones
      r > 50 && g > 30 && b > 15 &&
      r > g && g > b && r - b > 10
    ];
    
    return skinConditions.some(condition => condition);
  }

  private createHairMask(data: Uint8ClampedArray, width: number, height: number, faceRegion: any): boolean[] {
    const hairMask = new Array(width * height).fill(false);
    
    // Calculate average skin tone
    const skinTone = this.calculateAverageSkinTone(data, width, height, faceRegion);
    
    // Hair detection - look for areas that are darker than skin and in likely hair regions
    for (let y = 0; y < Math.floor(height * 0.7); y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        
        // Check if pixel is likely hair
        if (this.isLikelyHair(r, g, b, skinTone, x, y, width, height, faceRegion)) {
          hairMask[y * width + x] = true;
        }
      }
    }
    
    // Apply morphological operations to clean up the mask
    return this.cleanHairMask(hairMask, width, height);
  }

  private calculateAverageSkinTone(data: Uint8ClampedArray, width: number, height: number, faceRegion: any): [number, number, number] {
    let totalR = 0, totalG = 0, totalB = 0, count = 0;
    
    for (let y = faceRegion.y; y < faceRegion.y + faceRegion.height; y += 2) {
      for (let x = faceRegion.x; x < faceRegion.x + faceRegion.width; x += 2) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        
        if (this.isSkinColor(r, g, b)) {
          totalR += r;
          totalG += g;
          totalB += b;
          count++;
        }
      }
    }
    
    return count > 0 ? [totalR / count, totalG / count, totalB / count] as [number, number, number] : [200, 170, 140];
  }

  private isLikelyHair(r: number, g: number, b: number, skinTone: [number, number, number], x: number, y: number, width: number, height: number, faceRegion: any): boolean {
    // Check if in likely hair region (top portion, not in face center)
    const inHairRegion = y < height * 0.6 && 
                        !(x > faceRegion.x + faceRegion.width * 0.2 && 
                          x < faceRegion.x + faceRegion.width * 0.8 && 
                          y > faceRegion.y + faceRegion.height * 0.2 && 
                          y < faceRegion.y + faceRegion.height * 0.8);
    
    if (!inHairRegion) return false;
    
    // Check if significantly darker than skin
    const brightness = (r + g + b) / 3;
    const skinBrightness = (skinTone[0] + skinTone[1] + skinTone[2]) / 3;
    
    return brightness < skinBrightness - 30 && brightness < 120;
  }

  private cleanHairMask(mask: boolean[], width: number, height: number): boolean[] {
    const cleaned = [...mask];
    
    // Remove isolated pixels
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;
        if (mask[idx]) {
          let neighbors = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              if (mask[(y + dy) * width + (x + dx)]) neighbors++;
            }
          }
          if (neighbors < 2) cleaned[idx] = false;
        }
      }
    }
    
    return cleaned;
  }

  private applyBuzzCutEffect(data: Uint8ClampedArray, width: number, height: number, hairMask: boolean[], options: { guardLength: number; hairColor: string }) {
    const { guardLength, hairColor } = options;
    const hairColorRGB = this.getHairColorRGB(hairColor);
    const intensity = this.calculateIntensity(guardLength);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const maskIdx = y * width + x;
        
        if (hairMask[maskIdx]) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          
          // Apply buzz cut transformation
          const newColor = this.transformHairPixel(r, g, b, hairColorRGB, intensity, guardLength);
          
          data[idx] = newColor[0];
          data[idx + 1] = newColor[1];
          data[idx + 2] = newColor[2];
        }
      }
    }
  }

  private transformHairPixel(r: number, g: number, b: number, hairColor: [number, number, number], intensity: number, guardLength: number): [number, number, number] {
    // Create buzz cut effect
    const colorBlend = 0.4;
    const shadowFactor = 0.6 + (guardLength / 12) * 0.4;
    
    // Blend with target hair color
    const blendedR = r * (1 - colorBlend) + hairColor[0] * colorBlend;
    const blendedG = g * (1 - colorBlend) + hairColor[1] * colorBlend;
    const blendedB = b * (1 - colorBlend) + hairColor[2] * colorBlend;
    
    // Apply shadow/depth based on guard length
    const finalR = Math.max(0, Math.min(255, blendedR * shadowFactor));
    const finalG = Math.max(0, Math.min(255, blendedG * shadowFactor));
    const finalB = Math.max(0, Math.min(255, blendedB * shadowFactor));
    
    return [finalR, finalG, finalB];
  }

  private applyPostProcessing(data: Uint8ClampedArray, width: number, height: number, hairMask: boolean[], options: { guardLength: number; hairColor: string }) {
    // Add subtle texture and noise for realism
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const maskIdx = y * width + x;
        
        if (hairMask[maskIdx]) {
          // Add subtle noise for texture
          const noise = (Math.random() - 0.5) * 8;
          
          data[idx] = Math.max(0, Math.min(255, data[idx] + noise));
          data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + noise));
          data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + noise));
        }
      }
    }
  }

  private calculateIntensity(guardLength: number): number {
    return 0.4 + (guardLength / 12) * 0.6;
  }

  private getHairColorRGB(hairColor: string): [number, number, number] {
    const colors = {
      'natural': [89, 58, 35],
      'black': [30, 30, 30],
      'brown': [101, 67, 33],
      'blonde': [194, 154, 108],
      'gray': [100, 100, 100]
    };
    
    return (colors[hairColor as keyof typeof colors] || colors.natural) as [number, number, number];
  }
}