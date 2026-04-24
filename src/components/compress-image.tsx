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

export function getCompressedBannerImageProps(
    displaySizeDesktop: number,
    displaySizeMobile: number,
    quality = 75,
) {
    return {
        priority: true,
        fetchPriority: 'high' as const,
        loading: 'eager' as const,
        sizes: `(max-width: 768px) ${displaySizeMobile}px, ${displaySizeDesktop}px`,
        quality,
    };
}
