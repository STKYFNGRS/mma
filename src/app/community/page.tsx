import React from 'react';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">MMA Community</h1>
        <p className="text-xl text-gray-300 mb-8">
          Join the conversation with other MMA fans from around the world.
        </p>
        
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 