import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image_base64 } = body;

    if (!image_base64) {
      return NextResponse.json(
        { error: "Image base64 data is required" },
        { status: 400 }
      );
    }

    console.log("🔍 Verifying image data...");
    console.log("Base64 length:", image_base64.length);
    console.log("Base64 prefix:", image_base64.substring(0, 50));
    
    // Check if it's a valid base64 image
    const isDataUrl = image_base64.startsWith('data:image/');
    const hasBase64Marker = image_base64.includes('base64,');
    
    let actualBase64 = image_base64;
    let imageType = 'unknown';
    
    if (isDataUrl && hasBase64Marker) {
      // Extract the actual base64 part
      const parts = image_base64.split('base64,');
      if (parts.length === 2) {
        actualBase64 = parts[1];
        imageType = parts[0]; // e.g., "data:image/jpeg"
      }
    }

    // Try to decode and verify the image
    try {
      const buffer = Buffer.from(actualBase64, 'base64');
      console.log("Decoded buffer size:", buffer.length);
      
      // Check file signature
      const signature = buffer.slice(0, 8).toString('hex');
      console.log("File signature (hex):", signature);
      
      let detectedFormat = 'unknown';
      if (signature.startsWith('ffd8ff')) {
        detectedFormat = 'JPEG';
      } else if (signature.startsWith('89504e47')) {
        detectedFormat = 'PNG';
      } else if (signature.startsWith('47494638')) {
        detectedFormat = 'GIF';
      } else if (signature.startsWith('52494646')) {
        detectedFormat = 'WEBP';
      }

      // Convert back to data URL for verification
      const verificationDataUrl = `data:image/${detectedFormat.toLowerCase()};base64,${actualBase64}`;

      return NextResponse.json({
        success: true,
        originalLength: image_base64.length,
        base64Length: actualBase64.length,
        bufferSize: buffer.length,
        isDataUrl: isDataUrl,
        hasBase64Marker: hasBase64Marker,
        imageType: imageType,
        detectedFormat: detectedFormat,
        fileSignature: signature,
        verificationDataUrl: verificationDataUrl.substring(0, 100) + "...", // Truncated for display
        // Return a small sample for visual verification
        sampleData: image_base64.substring(0, 200),
        isValidImage: detectedFormat !== 'unknown'
      });

    } catch (decodeError) {
      console.error("Failed to decode base64:", decodeError);
      return NextResponse.json({
        success: false,
        error: "Invalid base64 image data",
        decodeError: decodeError instanceof Error ? decodeError.message : String(decodeError),
        originalLength: image_base64.length,
        sampleData: image_base64.substring(0, 100)
      });
    }

  } catch (error) {
    console.error("Image verification error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}