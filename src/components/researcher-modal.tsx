'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobeAmericas, FaTimes, FaExternalLinkAlt, FaRegEnvelope } from 'react-icons/fa';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IResearcher, noRequirements } from '@/data/researchers';

export default function ResearcherModal({
    researcher,
    onClose,
}: {
    researcher: IResearcher;
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
            if (e.key === 'Escape') {
                e.preventDefault();
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {!isExiting && (
                <motion.div
                    key={researcher.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    onClick={handleClose}>
                    <motion.div
                        layoutId={`card-${researcher.id}`}
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
                        className="bg-gray-900 border-solid border-2 border-amber-400 text-white rounded-xl w-full max-w-4xl relative z-50 overflow-y-auto max-h-[90vh] mx-4 sm:mx-6"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="z-10 bg-gray-900 sticky top-0 flex justify-end items-center px-4 py-3">
                            <button
                                onClick={handleClose}
                                className="text-white text-xl hover:opacity-80 transition-opacity flex items-center justify-center">
                                <FaTimes />
                            </button>
                        </div>
                        <div className="pl-6 pr-6 pb-11">
                            <motion.div
                                key="modal-content"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.25 }}>
                                <div className="flex flex-col lg:flex-row py-3">
                                    <div className="pb-5 lg:pb-0 lg:pr-5 border-b lg:border-b-0 lg:border-r border-solid border-amber-400">
                                        <div className="flex flex-col md:flex-row lg:flex-col lg:gap-1 md:gap-4 md:items-start">
                                            <div className="w-60 h-52 relative overflow-hidden rounded-lg mx-auto md:mx-0 lg:mx-auto md:flex-shrink-0">
                                                <Image
                                                    src={researcher?.image}
                                                    alt={researcher?.fullName}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="my-3 md:my-0 lg:my-3">
                                                <div className="mt-3 md:mt-0 lg:mt-3">
                                                    <p className="text-lg font-bold">
                                                        {researcher.fullName}
                                                    </p>
                                                    {researcher.lab?.name && (
                                                        <p className="text-sm">
                                                            {researcher.lab?.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mt-4">
                                                    {researcher.lab?.website && (
                                                        <div className="flex items-center gap-2">
                                                            <FaGlobeAmericas className="text-sm flex-shrink-0" />
                                                            <a
                                                                className="text-sm text-blue-600 visited:text-purple-600 hover:underline"
                                                                href={researcher.lab?.website}
                                                                target="_blank"
                                                                rel="noreferrer">
                                                                {researcher.lab?.name}
                                                            </a>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2">
                                                        <FaExternalLinkAlt className="text-sm flex-shrink-0" />
                                                        <a
                                                            className="block text-sm text-blue-600 visited:text-purple-600 hover:underline"
                                                            href={researcher.googleScholarLink}
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            Google Scholar
                                                        </a>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <FaRegEnvelope className="text-sm flex-shrink-0" />
                                                        <a
                                                            className="block text-sm text-blue-600 visited:text-purple-600 hover:underline"
                                                            href={`mailto:${researcher.email}`}
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            {researcher.email}
                                                        </a>
                                                    </div>
                                                    <div className="pt-5">
                                                        {researcher?.acceptingStudents && (
                                                            <span className="inline-flex items-center w-fit rounded-md bg-lime-700 px-2 py-1 text-xs font-medium text-white">
                                                                Accepting Student Researcher(s)
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 pt-5 lg:pt-0 lg:pl-5">
                                        <div className="overflow-hidden">
                                            <p className="text-lg font-bold">Lab Description</p>
                                            {researcher.lab?.description && (
                                                <p className="text-sm break-words whitespace-pre-line">
                                                    {researcher.lab?.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-lg font-bold">Research Interests</p>
                                            <ul className="space-y-1">
                                                {researcher?.researchInterests.map(
                                                    (interest, index) => (
                                                        <li
                                                            key={index}
                                                            className="relative pl-4 text-sm break-words whitespace-normal before:content-['•'] before:absolute before:left-0 before:text-white">
                                                            {interest}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-lg font-bold">
                                                Student Requirements
                                            </p>
                                            <ul className="space-y-1">
                                                {researcher?.minStudentRequirements.map(
                                                    (req, index) => (
                                                        <li
                                                            key={index}
                                                            className="relative pl-4 text-sm break-words whitespace-normal before:content-['•'] before:absolute before:left-0 before:text-white">
                                                            {req}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                            {researcher.minStudentRequirements.length > 0 &&
                                                !researcher.minStudentRequirements[0].startsWith(
                                                    noRequirements,
                                                ) && (
                                                    <p className="text-sm text-gray-500 italic pt-2">
                                                        Meeting these requirements won&apos;t
                                                        guarantee a successful application.
                                                    </p>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
