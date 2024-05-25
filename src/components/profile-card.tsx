import { FaGithub, FaGlobeAmericas, FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import Image from "next/image";

interface IProfile {
    name: string
    position: string
    image: string
    linkedin?: string
    instagram?: string
    github?: string
    website?: string
    discord?: string
}

export default function ProfileCard({ name, position, image, linkedin, instagram, github, website, discord }: IProfile) {
    return (
        <div className="flex flex-col border-solid border border-gray-400 rounded-xl items-center p-4 gap-4 min-w-[17rem] max-w-[17rem]">
            <div className="w-52 h-52 object-cover bg-contain rounded-full relative overflow-hidden">
                <Image src={image} alt={name} fill className="" />
            </div>
            <div className="text-center">
            <h3 className="text-xl font-bold pb-0">{name}</h3>
            <p className="my-0 text-xl">{position}</p>
            </div>
            <div className="flex flex-row gap-4">

                {linkedin && <a className="text-3xl" href={linkedin} target="_blank" rel="noreferrer">
                    <FaLinkedin />
                </a>}
                {instagram && <a className="text-3xl" href={instagram} target="_blank" rel="noreferrer">
                    <FaInstagram />
                </a>}
                {github && <a className="text-3xl" href={github} target="_blank" rel="noreferrer">
                    <FaGithub />
                </a>}
                {website && <a className="text-3xl" href={website} target="_blank" rel="noreferrer">
                    <FaGlobeAmericas />
                </a>}  
                {discord && <a className="text-3xl" href={website} target="_blank" rel="noreferrer">
                    <FaDiscord />
                </a>}  

            </div>
        </div>
    );
}