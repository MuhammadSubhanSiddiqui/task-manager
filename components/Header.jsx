'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5"></div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 shadow-lg">
              <span className="text-4xl">ðŸ“‹</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Task Manager
              </h1>
              <p className="text-sm text-white/80 font-light">Organize your life beautifully</p>
            </div>
          </div>
          <nav>
            <ul className="flex gap-2">
              <li>
                <Link
                  href="/"
                  className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                    pathname === '/'
                      ? 'bg-white text-indigo-600 shadow-lg scale-105'
                      : 'bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  ðŸ  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                    pathname === '/tasks'
                      ? 'bg-white text-indigo-600 shadow-lg scale-105'
                      : 'bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  âœ… Tasks
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`px-5 py-2.5 rounded-xl transition-all duration-300 font-medium ${
                    pathname === '/about'
                      ? 'bg-white text-indigo-600 shadow-lg scale-105'
                      : 'bg-white/10 backdrop-blur-md hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  â„¹ï¸ About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
