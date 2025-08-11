const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, maxWidth = 1200, quality = 85) {
  try {
    const info = await sharp(inputPath)
      .resize(maxWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality, effort: 6 })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = info.size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
    console.log(`   ${(originalSize / 1024).toFixed(1)}KB -> ${(optimizedSize / 1024).toFixed(1)}KB (${savings}% savings)`);
    
    return { originalSize, optimizedSize, savings };
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
    return null;
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(imagesDir)
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
    .filter(file => !file.startsWith('.'));

  console.log(`🔄 Optimizing ${files.length} images...`);
  
  let totalOriginal = 0;
  let totalOptimized = 0;
  
  // 特殊处理大文件
  const largeFiles = ['sample1.png', 'sample2.jpg', 'sample3.jpg', 'sample4.jpg'];
  
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(outputDir, outputName);
    
    // 为sample文件使用更小的尺寸
    const maxWidth = largeFiles.includes(file) ? 96 : 1200;
    const quality = largeFiles.includes(file) ? 75 : 85;
    
    const result = await optimizeImage(inputPath, outputPath, maxWidth, quality);
    if (result) {
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;
    }
  }
  
  const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
  console.log(`\n📊 总结:`);
  console.log(`   原始总大小: ${(totalOriginal / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   优化后大小: ${(totalOptimized / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   节省空间: ${((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(1)}MB (${totalSavings}%)`);
  
  console.log(`\n🎯 下一步: 更新代码中的图片路径到优化版本`);
}

optimizeAllImages().catch(console.error);