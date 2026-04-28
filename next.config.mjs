/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        imageSizes: [16, 32, 48, 64, 96, 128, 160, 208, 256, 320, 384, 416, 512],
        deviceSizes: [
            320, 375, 393, 400, 430, 480, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840,
        ],
        qualities: [50, 75],
    },
};

export default nextConfig;
