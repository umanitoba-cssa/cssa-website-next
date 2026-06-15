'use client';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NAV_SECTIONS } from '@/data/nav-sections';

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
    const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const router = useRouter();

    const sections = NAV_SECTIONS[href];
    const hasSections = sections && sections.length > 0;

    const handleMouseEnter = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => setDropdownOpen(false), 150);
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
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 min-w-[200px] rounded-md shadow-lg overflow-hidden"
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
                                        className="w-full text-left px-4 py-2 text-base font-sans text-white whitespace-nowrap transition-colors duration-100"
                                        style={{ background: 'transparent' }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.background =
                                                'rgba(26,55,100,0.9)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = 'transparent')
                                        }>
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
                    <Button
                        variant="ghost"
                        className="font-sans text-2xl w-full text-center"
                        style={{
                            borderBottom: mobileExpanded
                                ? '2px solid #eab308'
                                : '2px solid transparent',
                            borderRadius: mobileExpanded ? '4px 4px 0 0' : undefined,
                            transition: 'border-color 0.15s',
                            background: 'transparent',
                        }}
                        onClick={() => {
                            if (hasSections) {
                                onMobileExpand(href);
                            } else {
                                router.push(href);
                            }
                        }}>
                        <div className="flex flex-row justify-center items-center w-full">
                            {label}
                        </div>
                    </Button>

                    {hasSections && mobileExpanded && (
                        <ul className="flex flex-col gap-1 pl-4 pb-2">
                            {sections.map((section) => (
                                <li key={section.anchor}>
                                    <button
                                        onClick={() => handleSectionClick(section.anchor)}
                                        className="w-full text-left text-base font-sans px-3 py-1 rounded text-white/80 hover:text-white transition-colors duration-100"
                                        style={{ background: 'transparent' }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.background =
                                                'rgba(26,55,100,0.9)')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.background = 'transparent')
                                        }>
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
