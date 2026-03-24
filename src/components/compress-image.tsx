/**
 * getCompressedImageProps
 *
 * Returns Next.js <Image> props that constrain the served image to the actual
 * rendered size, preventing the browser from downloading a full-resolution
 * file for a small display slot.
 *
 * Usage:
 *   <Image src={src} alt={alt} fill {...getCompressedImageProps(208)} />
 *
 * @param displaySize - The largest dimension the image is rendered at (px)
 * @param quality     - Compression quality 1–100 (default: 75)
 */
/**
 * getCompressedImageProps
 *
 * Returns Next.js <Image> props with responsive sizes and quality.
 * Use with fill for correct responsive image delivery.
 *
 * Usage:
 *   <Image src={src} alt={alt} fill {...getCompressedImageProps(208)} />
 *
 * @param displaySize - The largest dimension the image is rendered at (px)
 * @param quality     - Compression quality 1–100 (default: 50)
 */
export function getCompressedImageProps(displaySize: number, quality = 50) {
    return {
        sizes: `(max-width: 768px) 320px, ${displaySize}px`,
        quality,
    };
}

export function getBannerImageProps(quality = 75) {
    return {
        priority: true,
        fetchPriority: 'high' as const,
        loading: 'eager' as const,
        sizes: '100vw',
        quality,
    };
}
