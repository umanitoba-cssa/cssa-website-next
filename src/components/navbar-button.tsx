import Link from "next/link";

interface INavbarButton {
    href: string;
    label: string;
}

export const NavbarButton = ({href, label}: INavbarButton) => {
    return (
        <div className="font-sans text-2xl">
            <Link href={href}>
                <div className="flex flex-col justify-center h-full">
                    {label}
                </div>
            </Link>
        </div>
    )
}