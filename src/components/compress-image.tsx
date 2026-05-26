/**
 * getCompressedImageProps
 *
 * Returns Next.js <Image> props with responsive sizes and quality.
 * Use with fill for correct responsive image delivery.
 *
 * Usage:
 *   <Image src={src} alt={alt} fill {...getCompressedImageProps(208, 180)} />
 *
 * @param displaySizeDesktop - The largest dimension the image is rendered at (px) on desktop
 * @param displaySizeMobile - The largest dimension the image is rendered at (px) on mobile
 * @param quality     - Compression quality 1–100 (default: 50)
 */
export function getCompressedImageProps(
    displaySizeDesktop: number,
    displaySizeMobile: number,
    quality = 50,
) {
    return {
        sizes: `(max-width: 768px) ${displaySizeMobile}px, ${displaySizeDesktop}px`,
        quality,
    };
}

/**
 * getCompressedBannerImageProps
 *
 * Returns Next.js <Image> props optimised for full-width hero/banner images.
 * Marks the image as high-priority so the browser fetches it immediately,
 * avoiding LCP penalties.
 *
 * Usage:
 *   <Image src={src} alt={alt} fill {...getCompressedBannerImageProps()} />
 *
 * @param desktopMaxWidth - The largest width the image is rendered at on desktop (default: 1920)
 * @param quality         - Compression quality 1–100 (default: 65)
 */
export function getCompressedBannerImageProps(desktopMaxWidth = 1920, quality = 65) {
    return {
        priority: true,
        fetchPriority: 'high' as const,
        loading: 'eager' as const,
        // 100vw on mobile (full viewport), fixed cap on desktop
        sizes: `(max-width: 768px) 100vw, ${desktopMaxWidth}px`,
        quality,
    };
}
