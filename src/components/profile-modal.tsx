"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub, FaGlobeAmericas, FaDiscord, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { IProfile } from "@/data/team";
import { useEffect, useState } from "react";

export default function ProfileModal({
  profile,
  onClose,
}: {
  profile: IProfile;
  onClose: () => void;
}) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
  };

  // Delay removal until animation finishes
  const handleExitComplete = () => {
    if (isExiting) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          key={`${profile.name}-${profile.position}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={handleClose}
        >
          <motion.div
            layoutId={`card-${profile.name}-${profile.position}`}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.98 }}
            transition={{
              layout: {
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
              },
              scale: {
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
              },
            }}
            className="bg-gray-900 border border-gray-400 text-white p-6 rounded-xl w-full max-w-lg relative z-50 overflow-hidden mx-4 sm:mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
            >
              <FaTimes />
            </button>

            <motion.div
              key="modal-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="w-52 h-52 rounded-full relative overflow-hidden mx-auto m-4">
                <Image src={profile?.image} alt={profile?.name} fill className="object-cover" />
              </div>

              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                <p className="text-lg text-gray-300">{profile.position}</p>
              </div>

              <p className="text-sm mb-4">{profile.description}</p>

              <div className="flex justify-center gap-4 text-2xl">
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
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
