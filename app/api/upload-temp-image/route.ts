import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit before compression)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    console.log("Processing uploaded file:", file.name, file.size);

    // Convert file to base64 for kie.ai API
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');
    
    // Create data URL for display
    const dataUrl = `data:${file.type};base64,${base64Data}`;
    
    console.log("File converted to base64:");
    console.log("- Original size:", file.size);
    console.log("- Base64 length:", base64Data.length);
    console.log("- File type:", file.type);
    console.log("- Base64 preview:", base64Data.substring(0, 50) + "...");

    return NextResponse.json({
      imageUrl: dataUrl,
      imageBase64: dataUrl, // Return data URL instead of raw base64
      filename: file.name,
      fileType: file.type,
      fileSize: file.size,
    });

  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { 
        error: "Failed to process image",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}