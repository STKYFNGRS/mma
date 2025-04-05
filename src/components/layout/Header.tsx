'use client'; // Needs client hooks for wallet state

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path: string) => pathname === path;

  // Navigation links array
  const navLinks = ['Events', 'News', 'Fighters', 'Shop', 'Community'];

  return (
    <header className={`text-white sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black shadow-lg backdrop-blur-sm' : 'bg-gradient-to-r from-black to-gray-900'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="py-4 flex justify-between items-center">
          {/* Logo with subtle animation */}
          <Link href="/" className="group flex items-center">
            <span className="text-2xl font-extrabold">
              <span className="text-red-600 group-hover:text-white transition-colors duration-300">mma</span>
              <span className="text-white group-hover:text-red-600 transition-colors duration-300">.box</span>
            </span>
            <div className="ml-1 h-2 w-2 bg-red-600 rounded-full animate-pulse hidden sm:block"></div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-6 items-center">
            {navLinks.map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className={`font-medium hover:text-red-500 transition-colors relative ${
                    isActive(`/${item.toLowerCase()}`) ? 'text-red-500' : ''
                  }`}
                >
                  {item}
                  {isActive(`/${item.toLowerCase()}`) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform origin-bottom"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 flex flex-col items-end">
              <span 
                className={`block h-0.5 ${isOpen ? 'w-6 -rotate-45 translate-y-1' : 'w-6'} bg-white mb-1 transform transition-all duration-300`}
              ></span>
              <span 
                className={`block h-0.5 ${isOpen ? 'w-0 opacity-0' : 'w-4'} bg-white mb-1 transition-all duration-300`}
              ></span>
              <span 
                className={`block h-0.5 ${isOpen ? 'w-6 rotate-45 -translate-y-1' : 'w-5'} bg-white transform transition-all duration-300`}
              ></span>
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-black overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 border-t border-gray-800' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <ul className="space-y-4 mb-6">
            {navLinks.map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className={`block py-2 px-3 rounded-lg ${
                    isActive(`/${item.toLowerCase()}`) 
                      ? 'bg-red-600/20 text-red-500' 
                      : 'hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}