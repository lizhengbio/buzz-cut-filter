import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Test with the known working image URL
    const testImageUrl = "https://tempfile.aiquickdraw.com/s/3d5da174a8f532cdf18b4697db96bd8f_0_1752712782_7216.png";
    
    console.log("Testing image access:", testImageUrl);

    // Try to fetch the image directly
    const directResponse = await fetch(testImageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BuzzCutFilter/1.0)',
        'Accept': 'image/*',
      },
    });

    console.log("Direct fetch result:", {
      status: directResponse.status,
      statusText: directResponse.statusText,
      headers: Object.fromEntries(directResponse.headers.entries()),
    });

    if (directResponse.ok) {
      const imageBuffer = await directResponse.arrayBuffer();
      console.log("Image size:", imageBuffer.byteLength);
      
      return NextResponse.json({
        success: true,
        imageUrl: testImageUrl,
        proxyUrl: `/api/proxy-image?url=${encodeURIComponent(testImageUrl)}`,
        directAccess: true,
        imageSize: imageBuffer.byteLength,
        contentType: directResponse.headers.get('content-type'),
      });
    } else {
      return NextResponse.json({
        success: false,
        imageUrl: testImageUrl,
        proxyUrl: `/api/proxy-image?url=${encodeURIComponent(testImageUrl)}`,
        directAccess: false,
        error: `${directResponse.status} ${directResponse.statusText}`,
      });
    }

  } catch (error) {
    console.error("Test image error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}