'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { FooterButtons, MonthGrid, YearSelector, MONTHS } from './MonthYearPickerModalComponents';

type MonthYearPickerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    currentMonth: number;
    currentYear: number;
    onSelect: (month: number, year: number) => void;
};

export function MonthYearPickerModal({
    isOpen,
    onClose,
    currentMonth,
    currentYear,
    onSelect,
}: MonthYearPickerModalProps) {
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [isExiting, setIsExiting] = useState(false);
    const pendingSelection = useRef<{ month: number; year: number } | null>(null);

    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const years = useMemo(() => {
        const result = [];
        for (let y = thisYear - 2; y <= thisYear + 1; y++) {
            result.push(y);
        }
        return result;
    }, [thisYear]);

    const handleClose = () => {
        setIsExiting(true);
    };

    const handleExitComplete = () => {
        if (isExiting) {
            setIsExiting(false);
            // Apply pending selection after animation completes
            if (pendingSelection.current) {
                onSelect(pendingSelection.current.month, pendingSelection.current.year);
                pendingSelection.current = null;
            }
            onClose();
        }
    };

    // Reset selections when modal opens with new values
    useEffect(() => {
        if (isOpen && !isExiting) {
            setSelectedMonth(currentMonth);
            setSelectedYear(currentYear);
        }
    }, [isOpen, currentMonth, currentYear, isExiting]);

    // Handle escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen && !isExiting) {
                e.preventDefault();
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, isExiting]);

    const handleConfirm = () => {
        pendingSelection.current = { month: selectedMonth, year: selectedYear };
        handleClose();
    };

    const handleGoToToday = () => {
        pendingSelection.current = { month: thisMonth, year: thisYear };
        handleClose();
    };

    if (!isOpen && !isExiting) return null;

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {isOpen && !isExiting && (
                <motion.div
                    key="month-year-picker-modal"
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
                            duration: 0.45,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="bg-gray-900 border border-gray-400 text-white p-6 rounded-xl w-full max-w-sm relative z-50 overflow-hidden mx-4 sm:mx-6"
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl">
                            <FaTimes />
                        </button>

                        <motion.div
                            key="modal-content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.25 }}>
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold">Select Month & Year</h2>
                            </div>

                            {/* Year Selector */}
                            <YearSelector
                                selectedYear={selectedYear}
                                setSelectedYear={setSelectedYear}
                                years={years}
                            />

                            {/* Month Grid */}
                            <MonthGrid
                                MONTHS={MONTHS}
                                selectedMonth={selectedMonth}
                                setSelectedMonth={setSelectedMonth}
                                thisMonth={thisMonth}
                                thisYear={thisYear}
                                selectedYear={selectedYear}
                            />

                            {/* Footer Buttons */}
                            <FooterButtons
                                handleGoToToday={handleGoToToday}
                                handleConfirm={handleConfirm}
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
