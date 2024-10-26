import Image from "next/image";

export default function EventPageHeader({ title, image }: { title: string; image: string }) {
    return (
        <>
            <div className="desktop-only">
                <div className="w-screen h-[750px] overflow-hidden relative">
                    <Image className="relative object-cover" fill src={image} alt={title} />
                    <div className="w-full h-full p-12 relative">
                    </div>
                </div>
            </div>
            <div className="mobile-only flex flex-col gap-4">
                <div className="w-full h-80 relative">
                    <Image className="relative object-cover" fill src={image} alt={title} />
                </div>
            </div>
        </>
    );
}
