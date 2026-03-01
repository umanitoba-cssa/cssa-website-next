'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { IEventLink } from '@/data/events';
import { useEffect, useState } from 'react';

interface EventModalProps {
    event: IEventLink;
    onClose: () => void;
    onViewEvent: () => void;
}

export default function EventModal({ event, onClose, onViewEvent }: EventModalProps) {
    const [isExiting, setIsExiting] = useState(false);

    const handleClose = () => {
        setIsExiting(true);
    };

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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    onClick={handleClose}>
                    <motion.div
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
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl">
                            <FaTimes />
                        </button>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}>
                            <div className={`text-center ${event.href ? 'mb-6' : ''}`}>
                                <h3 className={`text-2xl font-bold ${event.href ? 'mb-2' : ''}`}>
                                    {event.title}
                                </h3>
                            </div>

                            {event.href && (
                                <div className="flex justify-center">
                                    <button
                                        onClick={onViewEvent}
                                        className="px-6 py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                                        View Event Page
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
