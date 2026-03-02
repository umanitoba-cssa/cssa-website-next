'use client';

import React from 'react';
import Image from 'next/image';

interface MarkdownImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

const MarkdownImage: React.FC<MarkdownImageProps> = ({ src, alt, width = 800, height = 400 }) => {
    // Use default dimensions
    let imageWidth = width;
    let imageHeight = height;

    // Check if it's an external image (starts with http/https)
    const isExternal = src.startsWith('http');

    // For external images, we need to use regular img tag
    if (isExternal) {
        return (
            <img
                src={src}
                alt={alt}
                className="markdown-image"
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        );
    }

    // For internal images, use Next.js Image component
    return (
        <Image
            src={src}
            alt={alt}
            width={imageWidth}
            height={imageHeight}
            className="markdown-image"
            style={{ maxWidth: '100%', height: 'auto' }}
            priority={false}
        />
    );
};

export default MarkdownImage;
