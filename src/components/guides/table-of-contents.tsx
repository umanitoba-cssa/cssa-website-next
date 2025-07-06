"use client";

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Heading {
  level: number;
  text: string;
  slug: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  headings, 
  className 
}) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    // Observe all section headings
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headingElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Filter out h1 headings as they're usually the title
  const filteredHeadings = headings.filter(heading => heading.level > 1);

  if (filteredHeadings.length === 0) {
    return null;
  }

  return (
    <nav className={cn('toc', className)}>
      <h2 className="text-lg font-semibold mb-3">Table of Contents</h2>
      <ul className="text-sm space-y-1">
        {filteredHeadings.map((heading) => (
          <li 
            key={heading.slug}
            className={cn(
              'ml-[calc(1rem*(heading.level-2))]',
              { 'ml-0': heading.level === 2 },
              { 'ml-4': heading.level === 3 },
              { 'ml-8': heading.level === 4 },
              { 'ml-12': heading.level === 5 },
              { 'ml-16': heading.level === 6 }
            )}
          >
            <a
              href={`#${heading.slug}`}
              className={cn(
                'block py-1 hover:text-primary transition-colors',
                activeId === heading.slug 
                  ? 'text-primary font-medium' 
                  : 'text-muted-foreground'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.slug)?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents; 