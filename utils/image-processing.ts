// Hair detection and processing utilities
import { AdvancedHairProcessor } from './advanced-hair-detection';

export interface HairRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BuzzCutOptions {
  guardLength: number; // 1-12mm
  hairColor: string;
}

export class BuzzCutProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imageData: ImageData | null = null;
  private originalImageData: ImageData | null = null;
  private advancedProcessor: AdvancedHairProcessor;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.advancedProcessor = new AdvancedHairProcessor();
  }

  async processImage(imageUrl: string, options: BuzzCutOptions): Promise<string> {
    try {
      // Try advanced processing first
      return await this.advancedProcessor.processImage(imageUrl, options);
    } catch (error) {
      console.warn('Advanced processing failed, falling back to basic processing:', error);
      return this.basicProcessImage(imageUrl, options);
    }
  }

  private async basicProcessImage(imageUrl: string, options: BuzzCutOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        try {
          this.canvas.width = img.width;
          this.canvas.height = img.height;
          this.ctx.drawImage(img, 0, 0);
          
          this.originalImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
          this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
          
          // Apply buzz cut effect
          this.applyBuzzCut(options);
          
          // Convert back to image
          const processedImageUrl = this.canvas.toDataURL('image/jpeg', 0.9);
          resolve(processedImageUrl);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = reject;
      img.src = imageUrl;
    });
  }

  private applyBuzzCut(options: BuzzCutOptions) {
    if (!this.imageData || !this.originalImageData) return;

    // Detect hair regions (simplified approach)
    const hairRegions = this.detectHairRegions();
    
    // Apply buzz cut effect to hair regions
    hairRegions.forEach(region => {
      this.applyBuzzCutToRegion(region, options);
    });
    
    // Put the modified image data back
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  private detectHairRegions(): HairRegion[] {
    if (!this.imageData) return [];
    
    const { width, height, data } = this.imageData;
    const hairRegions: HairRegion[] = [];
    
    // Simple hair detection based on typical hair location (top portion of image)
    // In production, this would use more sophisticated AI models
    
    // Top 40% of image is likely hair area
    const hairHeight = Math.floor(height * 0.4);
    const hairWidth = Math.floor(width * 0.8);
    const hairX = Math.floor(width * 0.1);
    
    // Detect darker regions in the hair area (simplified)
    for (let y = 0; y < hairHeight; y += 10) {
      for (let x = hairX; x < hairX + hairWidth; x += 10) {
        const pixelIndex = (y * width + x) * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];
        
        // Check if pixel is likely hair (darker colors)
        const brightness = (r + g + b) / 3;
        if (brightness < 120) {
          hairRegions.push({
            x: x - 5,
            y: y - 5,
            width: 10,
            height: 10
          });
        }
      }
    }
    
    return hairRegions;
  }

  private applyBuzzCutToRegion(region: HairRegion, options: BuzzCutOptions) {
    if (!this.imageData) return;
    
    const { data, width } = this.imageData;
    const { guardLength, hairColor } = options;
    
    // Calculate buzz cut parameters
    const intensity = this.calculateBuzzCutIntensity(guardLength);
    const hairColorRGB = this.getHairColorRGB(hairColor);
    
    // Apply buzz cut effect
    for (let y = region.y; y < region.y + region.height; y++) {
      for (let x = region.x; x < region.x + region.width; x++) {
        if (x >= 0 && x < width && y >= 0 && y < this.canvas.height) {
          const pixelIndex = (y * width + x) * 4;
          
          // Apply buzz cut effect
          this.applyBuzzCutPixel(data, pixelIndex, intensity, hairColorRGB);
        }
      }
    }
  }

  private applyBuzzCutPixel(data: Uint8ClampedArray, pixelIndex: number, intensity: number, hairColor: [number, number, number]) {
    const r = data[pixelIndex];
    const g = data[pixelIndex + 1];
    const b = data[pixelIndex + 2];
    
    // Create buzz cut effect by:
    // 1. Darkening the hair (shorter = darker)
    // 2. Adding texture/grain
    // 3. Blending with chosen hair color
    
    const darkenFactor = intensity;
    const colorBlend = 0.3;
    const texture = this.generateHairTexture(pixelIndex);
    
    // Blend original color with hair color
    const blendedR = r * (1 - colorBlend) + hairColor[0] * colorBlend;
    const blendedG = g * (1 - colorBlend) + hairColor[1] * colorBlend;
    const blendedB = b * (1 - colorBlend) + hairColor[2] * colorBlend;
    
    // Apply buzz cut darkening and texture
    data[pixelIndex] = Math.max(0, Math.min(255, blendedR * darkenFactor + texture));
    data[pixelIndex + 1] = Math.max(0, Math.min(255, blendedG * darkenFactor + texture));
    data[pixelIndex + 2] = Math.max(0, Math.min(255, blendedB * darkenFactor + texture));
  }

  private calculateBuzzCutIntensity(guardLength: number): number {
    // Convert guard length to intensity (shorter = darker)
    // 1mm = 0.3, 12mm = 0.9
    return 0.3 + (guardLength - 1) * (0.6 / 11);
  }

  private getHairColorRGB(hairColor: string): [number, number, number] {
    const colors = {
      'natural': [101, 67, 33],
      'black': [20, 20, 20],
      'brown': [139, 69, 19],
      'blonde': [218, 165, 32],
      'gray': [128, 128, 128]
    };
    
    return (colors[hairColor as keyof typeof colors] || colors.natural) as [number, number, number];
  }

  private generateHairTexture(pixelIndex: number): number {
    // Generate subtle texture for buzz cut effect
    const noise = Math.random() * 10 - 5;
    const pattern = Math.sin(pixelIndex * 0.01) * 3;
    return noise + pattern;
  }

  // Face detection helper (simplified)
  private detectFaceRegion(): { x: number; y: number; width: number; height: number } | null {
    if (!this.imageData) return null;
    
    const { width, height } = this.imageData;
    
    // Simple face detection - assume face is in center portion
    return {
      x: Math.floor(width * 0.2),
      y: Math.floor(height * 0.3),
      width: Math.floor(width * 0.6),
      height: Math.floor(height * 0.4)
    };
  }

  // Enhanced hair detection using skin tone analysis
  private detectHairBySkinTone(): HairRegion[] {
    if (!this.imageData) return [];
    
    const { width, height, data } = this.imageData;
    const hairRegions: HairRegion[] = [];
    const faceRegion = this.detectFaceRegion();
    
    if (!faceRegion) return [];
    
    // Analyze skin tone in face region
    const avgSkinTone = this.calculateAverageSkinTone(faceRegion);
    
    // Find hair regions by contrasting with skin tone
    for (let y = 0; y < height * 0.6; y += 5) {
      for (let x = 0; x < width; x += 5) {
        const pixelIndex = (y * width + x) * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];
        
        // Check if pixel significantly differs from skin tone
        const skinDiff = Math.abs(r - avgSkinTone[0]) + 
                        Math.abs(g - avgSkinTone[1]) + 
                        Math.abs(b - avgSkinTone[2]);
        
        if (skinDiff > 80 && (r + g + b) / 3 < 150) {
          hairRegions.push({
            x: x - 2,
            y: y - 2,
            width: 4,
            height: 4
          });
        }
      }
    }
    
    return hairRegions;
  }

  private calculateAverageSkinTone(faceRegion: { x: number; y: number; width: number; height: number }): [number, number, number] {
    if (!this.imageData) return [200, 180, 160];
    
    const { data, width } = this.imageData;
    let totalR = 0, totalG = 0, totalB = 0, count = 0;
    
    for (let y = faceRegion.y; y < faceRegion.y + faceRegion.height; y += 5) {
      for (let x = faceRegion.x; x < faceRegion.x + faceRegion.width; x += 5) {
        const pixelIndex = (y * width + x) * 4;
        totalR += data[pixelIndex];
        totalG += data[pixelIndex + 1];
        totalB += data[pixelIndex + 2];
        count++;
      }
    }
    
    return [
      Math.floor(totalR / count),
      Math.floor(totalG / count),
      Math.floor(totalB / count)
    ] as [number, number, number];
  }
}