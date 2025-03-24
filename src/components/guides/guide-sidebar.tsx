"use client";

import React, { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();
  const router = useRouter();
  const isRootPath = pathname === `/resources/guides/${guide.slug}`;

  // Detect active section from hash or scroll position
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash.substring(1));
      }
    };

    // Initialize active section
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Set up intersection observer for scroll-based detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );

    // Observe all section headings
    const headingElements = document.querySelectorAll('h1[id], h2[id], h3[id]');
    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      headingElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [pathname]);

  // Function to handle section navigation
  const navigateToSection = (e: React.MouseEvent, sectionSlug: string) => {
    e.preventDefault();
    
    // Navigate to the guide page first if we're not already on it
    if (!pathname.includes(guide.slug)) {
      router.push(`/resources/guides/${guide.slug}`);
      
      // Save the section to navigate to after page load
      sessionStorage.setItem('pendingScrollTarget', sectionSlug);
      return;
    }
    
    // Handle direct navigation when already on the guide page
    const element = document.getElementById(sectionSlug);
    if (element) {
      // Update hash without triggering a page reload
      window.history.pushState(null, '', `#${sectionSlug}`);
      
      // Smooth scroll to element
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionSlug);
    }
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
                    isRootPath && !activeSection ? "text-primary font-medium" : "text-muted-foreground"
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
                      activeSection === section.slug 
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
                isRootPath && !activeSection ? "text-primary font-medium" : "text-muted-foreground"
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
                  activeSection === section.slug 
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