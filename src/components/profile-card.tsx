import {
  FaGithub,
  FaGlobeAmericas,
  FaInstagram,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { IProfile } from "@/data/team";

export default function ProfileCard({
  profile, 
  onClick,
}: { 
    profile: IProfile, 
    onClick?: () => void 
}) {
    return (
        <motion.div
            layoutId={`card-${profile.name}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick?.();
            }}
            className="flex flex-col border-solid border border-gray-400 rounded-xl items-center p-4 gap-4 min-w-[17rem] max-w-[17rem] cursor-pointer"
        >
            <div className="w-52 h-52 object-cover bg-contain rounded-full relative overflow-hidden">
                <Image src={profile?.image} alt={profile?.name} fill className="" />
            </div>
            <div className="text-center">
                <h3 className="text-xl font-bold pb-0">{profile?.name}</h3>
                <p className="my-0 text-xl">{profile?.position}</p>
            </div>
            {(profile?.linkedin || profile?.instagram || profile?.github || profile?.website || profile?.discord) &&
                <div className="flex flex-row gap-4">
                    {profile?.linkedin && <a className="text-3xl" href={profile.linkedin} target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>}
                    {profile?.instagram && <a className="text-3xl" href={profile.instagram} target="_blank" rel="noreferrer">
                        <FaInstagram />
                    </a>}
                    {profile?.github && <a className="text-3xl" href={profile.github} target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>}
                    {profile?.website && <a className="text-3xl" href={profile.website} target="_blank" rel="noreferrer">
                        <FaGlobeAmericas />
                    </a>}  
                    {profile?.discord && <a className="text-3xl" href={profile.discord} target="_blank" rel="noreferrer">
                        <FaDiscord />
                    </a>}  
                </div>
            }

            <div className="mt-auto text-sm text-gray-500 font-medium text-center flex items-center justify-center gap-1">
                <span>View profile</span>
                <span>→</span>
            </div>
        </motion.div>
    );
}