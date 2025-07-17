"use client";

export default function TestResultPage() {
  const resultUrl = "https://replicate.delivery/xezq/bLtf5JeC7hqkiUZpHJ8kwHSqiQKQ0pfVx4zZtvlHDyUZoEDqA/tmptapvsyul.png";
  const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(resultUrl)}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Flux Result</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Generated Buzz Cut</h2>
          
          <div className="mb-4">
            <strong>Original URL:</strong> 
            <a href={resultUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2">
              {resultUrl}
            </a>
          </div>
          
          <div className="mb-4">
            <strong>Proxy URL:</strong> {proxyUrl}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Direct Image</h3>
              <img 
                src={resultUrl}
                alt="Generated Buzz Cut (Direct)"
                className="max-w-full border rounded"
                onError={(e) => {
                  console.error("Failed to load direct image");
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Proxied Image</h3>
              <img 
                src={proxyUrl}
                alt="Generated Buzz Cut (Proxied)"
                className="max-w-full border rounded"
                onError={(e) => {
                  console.error("Failed to load proxied image");
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}