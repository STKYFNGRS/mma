'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock fighters data for the page
const mockFighters = [
  {
    id: 1,
    name: 'Alex "The Destroyer" Johnson',
    record: '24-2-0',
    division: 'Lightweight',
    image: '/next.svg',
  },
  {
    id: 2,
    name: 'Sarah "Knockout Queen" Williams',
    record: '18-0-0',
    division: 'Women\'s Bantamweight',
    image: '/next.svg',
  },
  {
    id: 3,
    name: 'Mike "Iron Fist" Rodriguez',
    record: '22-3-1',
    division: 'Middleweight',
    image: '/next.svg',
  },
  {
    id: 4,
    name: 'James "The Machine" Thompson',
    record: '19-4-2',
    division: 'Welterweight',
    image: '/next.svg',
  },
  {
    id: 5,
    name: 'Elena "The Assassin" Martinez',
    record: '15-1-0',
    division: 'Women\'s Flyweight',
    image: '/next.svg',
  },
  {
    id: 6,
    name: 'Carlos "Dynamite" Mendez',
    record: '20-5-0',
    division: 'Heavyweight',
    image: '/next.svg',
  },
];

export default function FightersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('All');
  
  // Divisions for filter
  const divisions = ['All', 'Lightweight', 'Welterweight', 'Middleweight', 'Heavyweight', 'Women\'s Bantamweight', 'Women\'s Flyweight'];
  
  // Filter fighters based on search and division
  const filteredFighters = mockFighters.filter(fighter => {
    const matchesSearch = fighter.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = selectedDivision === 'All' || fighter.division === selectedDivision;
    return matchesSearch && matchesDivision;
  });

  return (
    <div className="bg-black text-white min-h-screen pb-16">
      {/* Page Header */}
      <div className="relative py-16 bg-black border-b border-gray-800/30">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Featured Fighters</h1>
          <p className="text-gray-400 max-w-2xl">
            Explore profiles of the top MMA fighters from around the world. 
            View their stats, fight records, and upcoming matches.
          </p>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 mb-8">
          {/* Search input */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search fighters..."
              className="w-full bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          
          {/* Division filter */}
          <div>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="bg-black border border-gray-800 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-red-600"
            >
              {divisions.map((division) => (
                <option key={division} value={division}>{division}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Fighters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFighters.map((fighter) => (
            <div 
              key={fighter.id} 
              className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-all border border-gray-800/50 p-6 text-center"
            >
              {/* Fighter Image - Circle */}
              <div className="w-32 h-32 mx-auto bg-gray-800 rounded-full mb-4 relative border-2 border-red-900/20">
                <div className="absolute inset-0 flex items-center justify-center rounded-full">
                  <span className="text-gray-500">[Fighter]</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-1 text-white">{fighter.name}</h3>
              <p className="text-red-500 font-medium mb-2">{fighter.division}</p>
              <div className="inline-block px-3 py-1 bg-black border border-gray-800/50 rounded-full text-sm text-gray-300 mb-4">
                {fighter.record}
              </div>
              
              <Link 
                href={`/fighters/${fighter.id}`} 
                className="inline-block w-full text-center border border-red-600 text-red-500 hover:bg-red-600 hover:text-white py-2 rounded-lg text-sm font-medium transition-colors"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
        
        {filteredFighters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No fighters found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 