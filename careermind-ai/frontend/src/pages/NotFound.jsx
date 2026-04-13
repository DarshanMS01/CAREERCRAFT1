import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-9xl font-extrabold text-[#14532D]">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mt-4">Page not found</p>
      <p className="text-gray-500 mt-2 mb-8 text-center">Sorry, we couldn't find the page you're looking for.</p>
      <a href="/" className="px-6 py-3 bg-[#16A34A] text-white font-semibold rounded-full hover:bg-[#22C55E] transition-colors">
        Go Home
      </a>
    </div>
  );
}
