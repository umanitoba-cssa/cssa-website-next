import Image from "next/image";

interface ISponsor {
    name: string
    website: string
    image?: string
}

export default function SponsorCard({ name, image, website }: ISponsor) {
    return (
        <div className="min-w-[17rem] max-w-[17rem] min-h-[17rem] max-h-[17rem]">
    <a href={website}>
        <div className="flex flex-col border-solid border border-cssa-navy rounded-xl items-center p-4 gap-4 min-w-[17rem] max-w-[17rem] bg-white bg-opacity-70">
            {image &&<div className="w-52 h-52 object-cover bg-contain relative overflow-hidden content-center">
                <Image src={image} alt={name} width="0" height="0" style={{width: '100%', height: 'auto',}} className=""/>
            </div>}
            <div className="text-center">
            <h3 className="text-xl text-cssa-navy font-bold pb-0">{name}</h3>
            </div>
        </div>
        </a>
        </div>
    );
}
