"use client";

import { FaGithub, FaGlobeAmericas, FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";
import React from "react";

interface IProfile {
    name: string
    position: string
    image: string
    linkedin?: string
    instagram?: string
    github?: string
    website?: string
    description?: string
    discord?: string
}

const useTruncatedElement = ({ ref }: { ref: React.RefObject<HTMLElement> }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {};

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [ref]);

  const toggleIsShowingMore = () => setIsShowingMore(prev => !prev);

  return {
    isTruncated,
    isShowingMore,
    toggleIsShowingMore,
  };
};

export default function ProfileCard({ name, position, image, linkedin, instagram, github, website, discord, description }: IProfile) {
   const ref = React.useRef(null);
    const { isTruncated, isShowingMore, toggleIsShowingMore } = useTruncatedElement({
        ref,
    });

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

            <div className="relative w-full text-center">
                <p ref={ref} className={`text-sm transition-all duration-300 ease-in-out ${!isShowingMore && 'line-clamp-4'}`}>
                    {description}
                </p>
                {isTruncated && (
                    <div className={!
                        isShowingMore ? 
                        "absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[rgb(3,13,31)] via-[rgba(3,13,31,0.9)] to-transparent flex items-end justify-center pointer-events-none" 
                        : ""}
                    >
                        <button onClick={toggleIsShowingMore} className="text-gray-300 underline text-sm pointer-events-auto">
                            {isShowingMore ? 'Show less' : 'Show more'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}