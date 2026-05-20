import Image from 'next/image';
import { getCompressedBannerImageProps } from './compress-image';

export default function PageHeader({ title, image }: { title: string; image: string }) {
    return (
        <>
            {/* DESKTOP LAYOUT */}
            <div className="hidden md:block">
                <div className="w-full h-[500px] overflow-hidden relative">
                    <Image
                        className="relative object-cover"
                        fill
                        src={image}
                        alt={title}
                        {...getCompressedBannerImageProps(1920, 200)}
                    />
                    <div className="w-full h-full bg-opacity-30 bg-black p-12 relative">
                        <div className="container z-10">
                            <h2 className="border-l-4 p-8 border-cssa-gold text-white">{title}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE LAYOUT */}
            <div className="block md:hidden flex flex-col gap-4">
                <div className="container">
                    <h2 className="text-3xl text-white">{title}</h2>
                </div>
                <div className="w-full h-48 relative">
                    <div className="absolute inset-0">
                        <Image
                            className="relative object-cover"
                            fill
                            src={image}
                            alt={title}
                            {...getCompressedBannerImageProps(1920, 768)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
