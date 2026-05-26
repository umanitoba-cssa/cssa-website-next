import Image from 'next/image';
import { getCompressedBannerImageProps } from './compress-image';

export default function PageHeader({ title, image }: { title: string; image: string }) {
    return (
        <div>
            {/* Only visible on mobile */}
            <div className="block md:hidden container pb-3">
                <h2 className="text-3xl text-white">{title}</h2>
            </div>

            <div className="w-full h-48 md:h-[500px] overflow-hidden relative">
                <Image
                    className="object-cover"
                    fill
                    src={image}
                    alt={title}
                    {...getCompressedBannerImageProps(1920)}
                />

                {/* Only visible on desktop */}
                <div className="hidden md:block w-full h-full bg-opacity-30 bg-black p-12 relative">
                    <div className="container z-10">
                        <h2 className="border-l-4 p-8 border-cssa-gold text-white">{title}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
