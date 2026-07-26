'use client';
import { Routes } from '@/data/routes';
import { NavbarButton } from './navbar-button';
import { Button } from './ui/button';
import { IoMdMenu } from 'react-icons/io';
import { useState } from 'react';

export const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [expandedHref, setExpandedHref] = useState<string | null>(null);

    const closeNav = () => {
        setNavOpen(false);
        setExpandedHref(null);
    };

    const navbarButtons = Routes.filter((route) => route.title).map((route) => {
        return (
            <NavbarButton
                key={route.href}
                href={route.href}
                label={route.title}
                tabNavigable={navOpen}
                mobileExpanded={expandedHref === route.href}
                onMobileExpand={(href) => setExpandedHref((prev) => (prev === href ? null : href))}
                onSubsectionClick={closeNav}
            />
        );
    });

    return (
        <>
            <div className="desktop-only h-56 bg-cssa-navy container">
                <div className="flex justify-start place-content-center h-full gap-8">
                    <div className="flex flex-col place-content-center">
                        <img
                            src="/img/logo.svg"
                            alt="CSSA Logo"
                            className="w-32 h-32"
                        />
                    </div>
                    <div className="flex flex-col place-content-center gap-4">
                        <div className="flex flex-row">
                            <h1>Computer Science Students&apos; Association</h1>
                        </div>
                        <div className="flex flex-row flex-wrap gap-6">{navbarButtons}</div>
                    </div>
                </div>
            </div>
            <div className="mobile-only py-12" />
            <div className="flex flex-col py-4 mobile-only bg-cssa-navy container fixed top-0 z-50 overflow-hidden">
                <div className="flex flex-row justify-between items-center">
                    <img
                        src="/img/logo.svg"
                        alt="CSSA Logo"
                        className="w-12 h-12"
                    />
                    <h1 className="text-xl h-min">UManitoba CSSA</h1>
                    <Button
                        onClick={() => {
                            if (navOpen) {
                                closeNav();
                            } else {
                                setNavOpen(true);
                            }
                        }}
                        variant="outline"
                        className="p-2"
                        aria-label="Toggle Menu">
                        <IoMdMenu
                            className="h-8 w-8"
                            aria-label="Menu"
                        />
                    </Button>
                </div>
                <div
                    className={`flex flex-col gap-2 items-center overflow-hidden transition-[max-height] duration-300 ease-in-out ${navOpen ? 'max-h-screen' : 'h-0'}`}>
                    <div className="mobile-only py-1" />
                    {navbarButtons}
                </div>
            </div>
        </>
    );
};
