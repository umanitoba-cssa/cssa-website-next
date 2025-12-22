import Image from 'next/image';

export default function PageHeader({ title, image }: { title: string; image: string }) {
    return (
        <>
            <div className="desktop-only">
                <div className="w-full h-[500px] overflow-hidden relative">
                    <Image
                        className="relative object-cover"
                        fill
                        src={image}
                        alt={title}
                    />
                    <div className="w-full h-full bg-opacity-30 bg-black p-12 relative">
                        <div className="container z-10">
                            <h2 className="border-l-4 p-8 border-cssa-gold">{title}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-only flex flex-col gap-4">
                <div className="container">
                    <h2 className="text-3xl">{title}</h2>
                </div>
                <div className="w-full h-48 relative">
                    <Image
                        className="relative object-cover"
                        fill
                        src={image}
                        alt={title}
                    />
                </div>
            </div>
        </>
    );
}
