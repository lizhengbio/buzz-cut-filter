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

    console.log("Testing image upload...");
    console.log("Base64 length:", image_base64.length);
    console.log("Base64 prefix:", image_base64.substring(0, 50));

    // Check if it's a valid base64 image
    const isValidDataUrl = image_base64.startsWith('data:image/');
    const hasBase64Prefix = image_base64.includes('base64,');
    
    let actualBase64Data = image_base64;
    if (hasBase64Prefix) {
      actualBase64Data = image_base64.split('base64,')[1];
    }

    // Try to decode base64 to verify it's valid
    try {
      const buffer = Buffer.from(actualBase64Data, 'base64');
      console.log("Decoded buffer size:", buffer.length);
      
      // Check image format by looking at file signature
      const signature = buffer.slice(0, 10).toString('hex');
      console.log("File signature:", signature);
      
      let imageFormat = 'unknown';
      if (signature.startsWith('ffd8ff')) {
        imageFormat = 'JPEG';
      } else if (signature.startsWith('89504e47')) {
        imageFormat = 'PNG';
      } else if (signature.startsWith('47494638')) {
        imageFormat = 'GIF';
      }

      return NextResponse.json({
        success: true,
        imageFormat: imageFormat,
        base64Length: image_base64.length,
        actualDataLength: actualBase64Data.length,
        bufferSize: buffer.length,
        isValidDataUrl: isValidDataUrl,
        hasBase64Prefix: hasBase64Prefix,
        fileSignature: signature,
        sampleData: image_base64.substring(0, 100) + "...",
      });

    } catch (decodeError) {
      return NextResponse.json({
        success: false,
        error: "Invalid base64 data",
        decodeError: decodeError instanceof Error ? decodeError.message : String(decodeError),
      });
    }

  } catch (error) {
    console.error("Test upload error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}