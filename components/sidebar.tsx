'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Menu, X, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { dayInfo } from '@/lib/slide-utils';

interface SidebarProps {
  className?: string;
  currentDay?: number;
}

// Custom Link component that tracks navigation
const TrackedLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const handleClick = () => {
    trackEvent({
      name: 'sidebar_navigation',
      properties: {
        destination: href,
      },
    });
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}>
      {children}
    </Link>
  );
};

export function Sidebar({ className, currentDay = 1 }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Sidebar trigger button - visible on all devices */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-800/80 backdrop-blur-sm transition-all hover:bg-slate-700/80"
        aria-label="Toggle sidebar">
        {isOpen ? (
          isMobile ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-white" />
          )
        ) : (
          <Menu className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full bg-slate-900 text-white z-40 transform transition-all duration-300 ease-in-out border-r border-slate-700 shadow-xl',
          isOpen ? 'translate-x-0 w-64' : isMobile ? '-translate-x-full w-64' : 'translate-x-0 w-0 border-transparent',
          className,
        )}>
        <div
          className={cn(
            'p-4 border-b border-slate-700',
            !isOpen && !isMobile && 'opacity-0 invisible',
            isOpen && 'opacity-100 visible',
          )}>
          <div className="w-full">
            <h2 className="text-xl font-bold whitespace-nowrap">Technical SEO 分享</h2>
            <p className="text-sm text-slate-400 whitespace-nowrap">由 Meathill 精心制作</p>
          </div>
        </div>

        <nav className={cn('p-4 w-64', !isOpen && !isMobile && 'opacity-0 invisible', isOpen && 'opacity-100 visible')}>
          <ul className="space-y-2 w-full">
            {dayInfo.map((day) => (
              <li
                key={day.day}
                className="w-full">
                <TrackedLink
                  href={`/${day.slug}`}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md transition-colors whitespace-nowrap w-full',
                    day.day === currentDay ? 'bg-primary text-primary-foreground' : 'text-slate-400 hover:bg-slate-800',
                  )}>
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-medium flex-shrink-0">
                    {day.day}
                  </div>
                  <span className="truncate">{day.title}</span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700',
            !isOpen && !isMobile && 'opacity-0 invisible',
            isOpen && 'opacity-100 visible',
          )}>
          <div className="flex items-center gap-2 text-sm text-slate-400 whitespace-nowrap">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>2025 年 3 月系列</span>
          </div>
        </div>
      </div>
    </>
  );
}
