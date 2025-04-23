'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  // Zdefiniuj nawigację zależną od stanu logowania
  const publicNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
    { name: 'About', href: '/about' }
  ];

  const privateNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Test', href: '/test' },
    { name: 'About', href: '/about' }
  ];

  // Wybierz odpowiednią nawigację w zależności od stanu logowania
  const navigation = isAuthenticated ? privateNavigation : publicNavigation;

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="bg-primary-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-primary-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-white font-bold text-xl">
                PakSafe
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isCurrent = pathname === item.href || 
                    (pathname?.startsWith(item.href) && item.href !== '/');
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={classNames(
                        isCurrent
                          ? 'bg-primary-900 text-white'
                          : 'text-gray-200 hover:bg-primary-700 hover:text-white',
                        'rounded-md px-3 py-2 text-lg font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Scan Button for Desktop */}
            <div className="hidden sm:block">
              <Link
                href="/scan"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
              >
                Start Scan
              </Link>
            </div>

            {/* Profile dropdown - pokazuje tylko po zalogowaniu */}
            {isAuthenticated && (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-primary-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-800"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                      {user?.email.substring(0, 2).toUpperCase() || 'U'}
                    </div>
                  </button>
                </div>
                
                {isProfileMenuOpen && (
                  <div 
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      {user?.email}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => {
              const isCurrent = pathname === item.href || 
                (pathname?.startsWith(item.href) && item.href !== '/');
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={classNames(
                    isCurrent
                      ? 'bg-primary-900 text-white'
                      : 'text-gray-200 hover:bg-primary-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/scan"
              className="block w-full text-center mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Scan
            </Link>
            {isAuthenticated && (
              <button
                className="block w-full text-left mt-2 px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700"
                onClick={handleLogout}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}