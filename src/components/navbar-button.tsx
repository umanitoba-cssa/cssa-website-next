import Link from 'next/link';
import { Button } from './ui/button';

interface INavbarButton {
    href: string;
    label: string;
}

export const NavbarButton = ({ href, label }: INavbarButton) => {
    return (
        <>
            <div className="desktop-only">
                <div className="font-sans text-2xl text-center">
                    <Link href={href}>
                        <div className="flex flex-col justify-center h-full">{label}</div>
                    </Link>
                </div>
            </div>
            <div className="mobile-only w-full">
                <Link href={href}>
                    <Button
                        variant="ghost"
                        className="font-sans text-2xl w-full text-center">
                        <div className="flex flex-col justify-center h-full w-full">{label}</div>
                    </Button>
                </Link>
            </div>
        </>
    );
};
