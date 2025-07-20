/**
 * API Helper Functions
 * 
 * Common utilities for API error handling and response formatting
 */

import { NextResponse } from "next/server";

/**
 * Standard error response structure
 */
export interface ApiError {
  error: string;
  details?: string;
  status?: number;
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
  message: string, 
  status: number = 500, 
  details?: string
): NextResponse {
  const errorBody: ApiError = {
    error: message,
    ...(details && { details }),
    status
  };

  console.error(`❌ API Error (${status}):`, message, details ? `- ${details}` : '');
  
  return NextResponse.json(errorBody, { status });
}

/**
 * Create a standardized success response
 */
export function createSuccessResponse<T>(data: T, status: number = 200): NextResponse {
  return NextResponse.json(data, { status });
}

/**
 * Handle and format errors consistently
 */
export function handleApiError(error: unknown, defaultMessage: string = "Internal server error"): NextResponse {
  if (error instanceof Error) {
    // Known error types
    if (error.message.includes("REPLICATE_API_TOKEN")) {
      return createErrorResponse("API configuration error", 500, "Missing or invalid API token");
    }
    
    if (error.message.includes("Image too large")) {
      return createErrorResponse("Image too large", 400, "Please use a smaller image");
    }
    
    if (error.message.includes("timeout")) {
      return createErrorResponse("Request timeout", 408, "The operation took too long");
    }
    
    // Network/API errors
    if (error.message.includes("fetch failed") || error.message.includes("ECONNRESET")) {
      return createErrorResponse("Service unavailable", 503, "External service is temporarily unavailable");
    }
    
    return createErrorResponse(defaultMessage, 500, error.message);
  }
  
  return createErrorResponse(defaultMessage, 500, String(error));
}

/**
 * Validate required environment variables
 */
export function validateRequiredEnvVars(vars: string[]): void {
  const missing = vars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Validate image data format
 */
export function validateImageData(imageBase64: string): void {
  if (!imageBase64 || imageBase64.length === 0) {
    throw new Error("Image data is required");
  }
  
  // Basic size check (10MB limit)
  const maxSize = 10 * 1024 * 1024;
  if (imageBase64.length > maxSize) {
    throw new Error(`Image too large: ${(imageBase64.length / 1024 / 1024).toFixed(2)}MB. Maximum allowed: 10MB`);
  }
}