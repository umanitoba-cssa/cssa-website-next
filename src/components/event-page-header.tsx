import Image from "next/image";

export default function EventPageHeader({ title, image }: { title: string; image: string }) {
    return (
        <>
            <div className="desktop-only">
                <div className="w-full max-w-[1920px] mx-auto h-[800px] overflow-hidden relative">
                    <Image className="relative object-cover" fill src={image} alt={title} />
                    <div className="w-full h-full p-12 relative">
                    </div>
                </div>
            </div>
            <div className="mobile-only flex flex-col gap-4">
                <div className="w-full h-48 relative">
                    <Image className="relative object-cover" fill src={image} alt={title} />
                </div>
            </div>
        </>
    );
}
