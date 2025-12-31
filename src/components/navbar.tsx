'use client';
import { Routes } from '@/data/routes';
import { NavbarButton } from './navbar-button';
import { Button } from './ui/button';
import { IoMdMenu } from 'react-icons/io';
import { useState } from 'react';

export const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const navbarButtons = Routes.filter((route) => route.title).map((route) => {
        return (
            <NavbarButton
                key={route.href}
                href={route.href}
                label={route.title}
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
            <div className="mobile-only py-12" /> {/*spacer*/}
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
                            setNavOpen(!navOpen);
                        }}
                        variant="outline"
                        className="p-2">
                        <IoMdMenu className="h-8 w-8" />
                    </Button>
                </div>
                <div
                    onClick={() => {
                        setNavOpen(false);
                    }}
                    data-open={navOpen}
                    className="flex flex-col gap-2 items-center overflow-hidden transition-[max-height] duration-300 ease-in-out data-[open=false]:h-0 data-[open=true]:max-h-screen">
                    <div className="mobile-only py-1" /> {/*spacer*/}
                    {navbarButtons}
                </div>
            </div>
        </>
    );
};
