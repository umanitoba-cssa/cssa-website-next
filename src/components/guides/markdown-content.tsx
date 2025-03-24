"use client";

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import 'github-markdown-css/github-markdown-light.css';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ 
  content,
  className 
}) => {
  // Add anchor links to headings and set IDs for navigation
  useEffect(() => {
    const articleElement = document.querySelector('.markdown-content');
    if (!articleElement) return;

    // Apply dark theme classes
    document.querySelectorAll('.markdown-body').forEach(el => {
      el.classList.add('markdown-dark');
    });

    const headings = articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      const text = heading.textContent || '';
      const slug = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      heading.setAttribute('id', slug);
      
      // Create anchor link
      const link = document.createElement('a');
      link.href = `#${slug}`;
      link.className = 'anchor-link';
      link.innerHTML = '<span class="sr-only">Link to this section</span>#';
      link.style.marginLeft = '0.5rem';
      link.style.opacity = '0';
      link.style.transition = 'opacity 0.2s';
      link.style.color = 'rgb(32, 102, 184)'; // cssa-blue
      
      heading.appendChild(link);
      
      heading.addEventListener('mouseenter', () => {
        link.style.opacity = '0.7';
      });
      
      heading.addEventListener('mouseleave', () => {
        link.style.opacity = '0';
      });
    });

    // Check for both hash and session storage target
    const pendingTarget = sessionStorage.getItem('pendingScrollTarget');
    if (pendingTarget) {
      setTimeout(() => {
        const element = document.getElementById(pendingTarget);
        if (element) {
          // Update hash without triggering a page reload
          window.history.pushState(null, '', `#${pendingTarget}`);
          element.scrollIntoView({ behavior: 'smooth' });
        }
        sessionStorage.removeItem('pendingScrollTarget');
      }, 300);
    } else if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [content]);

  return (
    <article 
      className={cn(
        'markdown-content markdown-body prose prose-headings:scroll-mt-20 max-w-none',
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
};

export default MarkdownContent; 