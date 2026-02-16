'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MarkdownGroup } from '@/lib/mdx';
import { ChevronDown } from 'lucide-react';
import path from 'path';

interface MarkdownSidebarProps {
  markdown: MarkdownGroup;
  rootPath: string;
  className?: string;
}

const MarkdownSidebar: React.FC<MarkdownSidebarProps> = ({ markdown: markdown, rootPath, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();
  const isRootPath = pathname === path.join(rootPath, markdown.slug);

  // Detect active section from pathname
  useEffect(() => {
    const pathParts = pathname.split('/');
    if (pathParts.length === 5 && 
        pathParts[1] === 'resources' && 
        pathParts[3] === markdown.slug) {
      setActiveSection(pathParts[4]);
    } else if (pathParts[3] === markdown.slug) {
      setActiveSection(''); // Indicates the overview page of the markdown
    }
    // Reset isOpen to false when path changes (for mobile view)
    setIsOpen(false);
  }, [pathname, markdown.slug]);

  return (
    <>
      {/* Mobile version with dropdown */}
      <div className="block lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-muted rounded-md"
          aria-expanded={isOpen}
        >
          <span className="font-medium">Markdown Navigation</span>
          <ChevronDown 
            className={cn("h-5 w-5 transition-transform", isOpen && "rotate-180")} 
          />
        </button>
        {isOpen && (
          <nav className="mt-2 border rounded-md p-4 bg-background">
            <ul className="space-y-3">
              <li>
                <Link
                  href={path.join(rootPath, markdown.slug)}
                  className={cn(
                    "block py-1 hover:text-primary transition-colors",
                    isRootPath && activeSection === '' ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)} // Close dropdown on click
                >
                  Overview
                </Link>
              </li>
              {markdown.sections.map((section) => (
                <li key={section.slug}>
                  <Link
                    href={path.join(rootPath, markdown.slug, section.slug)}
                    className={cn(
                      "block py-1 hover:text-primary transition-colors",
                      activeSection === section.slug 
                        ? "text-primary font-medium" 
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)} // Close dropdown on click
                  >
                    {section.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop version */}
      <nav className={cn("hidden lg:block sticky top-6", className)}>
        <h3 className="font-semibold text-lg mb-3">{markdown.title}</h3>
        <ul className="space-y-3">
          <li>
            <Link
              href={path.join(rootPath, markdown.slug)}
              className={cn(
                "block py-1 hover:text-primary transition-colors",
                isRootPath && activeSection === '' ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              Overview
            </Link>
          </li>
          {markdown.sections.map((section) => (
            <li key={section.slug}>
              <Link
                href={path.join(rootPath, markdown.slug, section.slug)}
                className={cn(
                  "block py-1 hover:text-primary transition-colors",
                  activeSection === section.slug 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground"
                )}
            </div>

            {/* Desktop version */}
            <nav className={cn('hidden lg:block sticky top-6', className)}>
                <h3 className="font-semibold text-lg mb-3">{guide.title}</h3>
                <ul className="space-y-3">
                    <li>
                        <Link
                            href={`/resources/guides/${guide.slug}`}
                            className={cn(
                                'block py-1 hover:text-primary transition-colors',
                                isRootPath && activeSection === ''
                                    ? 'text-primary font-medium'
                                    : 'text-muted-foreground',
                            )}>
                            Overview
                        </Link>
                    </li>
                    {guide.sections.map((section) => (
                        <li key={section.slug}>
                            <Link
                                href={`/resources/guides/${guide.slug}/${section.slug}`}
                                className={cn(
                                    'block py-1 hover:text-primary transition-colors',
                                    activeSection === section.slug
                                        ? 'text-primary font-medium'
                                        : 'text-muted-foreground',
                                )}>
                                {section.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default MarkdownSidebar; 
