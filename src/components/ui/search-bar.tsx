'use client';

import { cn } from '@/lib/utils';

interface SearchBarProps {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

function SearchBar({ value, onValueChange, placeholder = 'Search...', className }: SearchBarProps) {
    return (
        <div className={cn('w-full max-w-2xl mx-auto px-4 sm:px-0', className)}>
            <div className="relative">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    className="w-full px-4 py-3 bg-cssa-navy border border-gray-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all text-sm sm:text-base"
                />
            </div>
        </div>
    );
}

export { SearchBar };
export type { SearchBarProps };
