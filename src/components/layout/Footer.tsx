'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the subscription
    setSubscribed(true);
    // Reset form after mock submission
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-gradient-to-b from-black to-gray-900 text-gray-300 mt-auto border-t border-red-900/30">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-extrabold">
                <span className="text-red-600">mma</span>
                <span className="text-white">.box</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              The ultimate MMA hub for fans and fighters. Follow live events, 
              stay updated with news, dive into fighter stats, and join our 
              community.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {[
                { name: 'Twitter', icon: 'ri-twitter-x-fill' },
                { name: 'Instagram', icon: 'ri-instagram-fill' },
                { name: 'YouTube', icon: 'ri-youtube-fill' },
                { name: 'Discord', icon: 'ri-discord-fill' },
                { name: 'TikTok', icon: 'ri-tiktok-fill' },
              ].map((social) => (
                <a 
                  key={social.name} 
                  href="#" 
                  aria-label={social.name}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Navigation</h3>
              <ul className="space-y-2">
                {['Events', 'News', 'Fighters', 'Shop', 'Community', 'Rankings', 'Videos'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                    >
                      <span className="mr-1 text-xs">&#9656;</span> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Support</h3>
              <ul className="space-y-2">
                {['About', 'Contact', 'FAQ', 'Careers'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase()}`} 
                      className="text-gray-400 hover:text-red-500 transition-colors text-sm flex items-center"
                    >
                      <span className="mr-1 text-xs">&#9656;</span> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Column 3 - Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Get MMA Updates</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive content, event alerts, and fighter insights.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-200"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={subscribed}
                className={`w-full px-4 py-2 rounded font-medium text-sm transition-colors ${
                  subscribed 
                    ? 'bg-green-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom Bar - Copyright and Legal */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            &copy; {currentYear}{' '}
            <a 
              href="https://www.dude.box" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-colors"
            >
              Dude dot box llc
            </a>. 
            All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center space-x-4 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-red-500 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-red-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}