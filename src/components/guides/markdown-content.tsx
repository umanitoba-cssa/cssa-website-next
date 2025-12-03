'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import 'github-markdown-css/github-markdown-light.css';
import '@/app/resources/markdown.css'; // Import custom markdown styles
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prism-themes/themes/prism-atom-dark.css';
import { useState } from 'react';

interface MarkdownContentProps {
    source: string;
    className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ source, className }) => {
    // Setup code highlighting and anchors after render
    useEffect(() => {
        const articleElement = document.querySelector('.markdown-content');
        if (!articleElement) return;

        // Apply dark theme classes
        document.querySelectorAll('.markdown-body').forEach((el) => {
            el.classList.add('markdown-dark');
        });

        // Process headings
        const headings = articleElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading) => {
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

        // Process images to add responsive behavior
        const images = articleElement.querySelectorAll('img');
        images.forEach((img) => {
            // Add standard responsive classes
            img.classList.add('max-w-full', 'h-auto');
            // Add lazy loading attribute
            img.setAttribute('loading', 'lazy');
        });

        // Process tables for enhanced styling
        const tables = articleElement.querySelectorAll('table');
        tables.forEach((table) => {
            // Ensure tables have proper classes
            table.classList.add('custom-styled-table');

            // Add wrapper for responsive tables if needed
            if (!table.parentElement?.classList.contains('table-wrapper')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-wrapper';
                wrapper.style.overflowX = 'auto';
                table.parentNode?.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });

        // Process code blocks
        const codeBlocks = articleElement.querySelectorAll('pre code');
        codeBlocks.forEach((codeBlock) => {
            // Try to identify language from class
            const classes = codeBlock.className.split(' ');
            const languageClass = classes.find((cls) => cls.startsWith('language-'));

            if (languageClass) {
                // Extract the language name from the class
                const language = languageClass.replace('language-', '');

                // Already has a language class, ensure Prism applies highlighting
                const preElement = codeBlock.parentElement;
                if (preElement) {
                    // Add line numbers for all code blocks
                    preElement.classList.add('line-numbers');

                    // Ensure parent also has the language class for Prism
                    if (!preElement.classList.contains(`language-${language}`)) {
                        preElement.classList.add(`language-${language}`);
                    }
                }
            } else {
                // No language specified, add a default
                codeBlock.classList.add('language-plaintext');
                if (codeBlock.parentElement) {
                    codeBlock.parentElement.classList.add('language-plaintext');
                }
            }
        });

        // Apply syntax highlighting
        Prism.highlightAll();

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
    }, [source]);

    return (
        <article
            className={cn(
                'markdown-content markdown-body prose prose-headings:scroll-mt-20 max-w-none',
                'prose-table:overflow-hidden prose-table:border-collapse prose-th:bg-cssa-blue prose-th:text-white',
                className,
            )}
            dangerouslySetInnerHTML={{ __html: source }}
        />
    );
};

export default MarkdownContent;
