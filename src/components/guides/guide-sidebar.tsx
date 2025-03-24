"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Guide, Section } from '@/lib/mdx';
import { ChevronDown } from 'lucide-react';

interface GuideSidebarProps {
  guide: Guide;
  className?: string;
}

const GuideSidebar: React.FC<GuideSidebarProps> = ({ guide, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isRootPath = pathname === `/resources/guides/${guide.slug}`;

  // Function to handle section navigation
  const navigateToSection = (e: React.MouseEvent, sectionSlug: string) => {
    e.preventDefault();
    
    // Navigate to the guide page first to ensure the content is loaded
    if (!pathname.includes(guide.slug)) {
      router.push(`/resources/guides/${guide.slug}`);
    }
    
    // Wait for page to load before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionSlug);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Mobile version with dropdown */}
      <div className="block lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-muted rounded-md"
          aria-expanded={isOpen}
        >
          <span className="font-medium">Guide Navigation</span>
          <ChevronDown 
            className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} 
          />
        </button>
        {isOpen && (
          <nav className="mt-2 border rounded-md p-4 bg-background">
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/resources/guides/${guide.slug}`}
                  className={cn(
                    "block py-1 hover:text-primary transition-colors",
                    isRootPath ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                >
                  Overview
                </Link>
              </li>
              {guide.sections.map((section) => (
                <li key={section.slug}>
                  <a
                    href={`#${section.slug}`}
                    onClick={(e) => navigateToSection(e, section.slug)}
                    className={cn(
                      "block py-1 hover:text-primary transition-colors",
                      pathname.includes(section.slug) 
                        ? "text-primary font-medium" 
                        : "text-muted-foreground"
                    )}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop version */}
      <nav className={cn("hidden lg:block sticky top-6", className)}>
        <h3 className="font-semibold text-lg mb-3">{guide.title}</h3>
        <ul className="space-y-3">
          <li>
            <Link
              href={`/resources/guides/${guide.slug}`}
              className={cn(
                "block py-1 hover:text-primary transition-colors",
                isRootPath ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              Overview
            </Link>
          </li>
          {guide.sections.map((section) => (
            <li key={section.slug}>
              <a
                href={`#${section.slug}`}
                onClick={(e) => navigateToSection(e, section.slug)}
                className={cn(
                  "block py-1 hover:text-primary transition-colors",
                  pathname.includes(section.slug) 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground"
                )}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default GuideSidebar; 