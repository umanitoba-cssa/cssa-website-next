'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { NAV_SECTIONS } from '@/data/nav-sections';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface INavbarButton {
    href: string;
    label: string;
    tabNavigable: boolean;
    mobileExpanded: boolean;
    onMobileExpand: (href: string) => void;
    onSubsectionClick: () => void;
}

export const NavbarButton = ({
    href,
    label,
    tabNavigable,
    mobileExpanded,
    onMobileExpand,
    onSubsectionClick,
}: INavbarButton) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    const sections = NAV_SECTIONS[href];
    const hasSections = sections && sections.length > 0;

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setDropdownOpen(false);
    };

    const handleSectionClick = (anchor: string) => {
        setDropdownOpen(false);
        onSubsectionClick();
        router.push(`${href}#${anchor}`);
        setTimeout(() => {
            document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <>
            <div
                role="navigation"
                className="desktop-only relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="font-sans text-2xl text-center">
                    <Link
                        href={href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex flex-col justify-center h-full py-1 border-b-2 border-transparent hover:border-cssa-gold transition-colors duration-150">
                        {label}
                    </Link>
                </div>

                {hasSections && dropdownOpen && (
                    <div
                        role="menu"
                        className="absolute left-1/2 -translate-x-1/2 top-full z-50 min-w-[200px] rounded-md shadow-lg overflow-hidden bg-cssa-navy"
                        style={{
                            background: '#1a2744',
                            border: '1px solid rgba(255,255,255,0.12)',
                        }}>
                        <div
                            className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                            style={{
                                background: '#1a2744',
                                borderLeft: '1px solid rgba(255,255,255,0.12)',
                                borderTop: '1px solid rgba(255,255,255,0.12)',
                            }}
                        />
                        <ul className="py-1">
                            {sections.map((section) => (
                                <li
                                    key={section.anchor}
                                    role="none">
                                    <button
                                        role="menuitem"
                                        onClick={() => handleSectionClick(section.anchor)}
                                        className="w-full text-left px-4 py-2 text-base font-sans text-white whitespace-nowrap bg-transparent hover:bg-cssa-blue/40 transition-colors duration-100">
                                        {section.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {tabNavigable && (
                <div className="mobile-only w-full">
                    <div
                        className={`flex flex-row items-center w-full border-b-2 transition-colors duration-150 ${
                            mobileExpanded ? 'border-cssa-gold' : 'border-transparent'
                        }`}>
                        <Link
                            href={href}
                            onClick={onSubsectionClick}
                            className="flex-1 py-2 font-sans text-2xl text-center text-white">
                            {label}
                        </Link>

                        {hasSections && (
                            <Button
                                variant="ghost"
                                className="px-3 py-2"
                                style={{ background: 'transparent' }}
                                onClick={() => onMobileExpand(href)}
                                aria-label={
                                    mobileExpanded ? 'Collapse sections' : 'Expand sections'
                                }>
                                {mobileExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-cssa-gold" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-cssa-gold" />
                                )}
                            </Button>
                        )}
                    </div>

                    {hasSections && mobileExpanded && (
                        <ul className="flex flex-col pb-2">
                            {sections.map((section) => (
                                <li key={section.anchor}>
                                    <button
                                        onClick={() => handleSectionClick(section.anchor)}
                                        className="w-full text-left text-base font-sans px-6 py-2 flex flex-row items-center transition-colors duration-100"
                                        style={{
                                            background: 'transparent',
                                            color: 'rgba(255,255,255,0.65)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                                'rgba(26,55,100,0.9)';
                                            e.currentTarget.style.color = 'rgba(255,255,255,1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                                        }}>
                                        {section.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
};
