import { Routes } from "@/data/routes";
import { NavbarButton } from "./navbar-button";



export const Navbar = () => {
    const navbarButtons = Routes.map((route) => {
        return (
            <NavbarButton key={route.href} href={route.href} label={route.title} />
        )
    })
    return (
        <>
            <div className="desktop-only navbar h-56 bg-cssa-navy">
                <div className="container px-12 flex justify-start place-content-center h-full gap-8">
                    <div className="flex flex-col place-content-center">
                        <img src="/img/logo.svg" alt="CSSA Logo" className="w-32 h-32" />
                    </div>
                    <div className="flex flex-col place-content-center gap-4">
                        <div className="flex flex-row">
                            <h1>Computer Science Students' Association</h1>
                        </div>
                        <div className="flex flex-row gap-6">
                            {navbarButtons}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}