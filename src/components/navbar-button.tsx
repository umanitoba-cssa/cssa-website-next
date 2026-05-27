import Link from 'next/link';
import { Button } from './ui/button';

interface INavbarButton {
    href: string;
    label: string;
    tabNavigable: boolean;
}

export const NavbarButton = ({ href, label, tabNavigable }: INavbarButton) => {
    return (
        <>
            <div className="desktop-only">
                <div className="font-sans text-2xl text-center">
                    <Link href={href}>
                        <div className="flex flex-col justify-center h-full">{label}</div>
                    </Link>
                </div>
            </div>
            {tabNavigable && (
                <div className="mobile-only w-full">
                    <Link href={href}>
                        <Button
                            variant="ghost"
                            className="font-sans text-2xl w-full text-center">
                            <div className="flex flex-col justify-center h-full w-full">
                                {label}
                            </div>
                        </Button>
                    </Link>
                </div>
            )}
        </>
    );
};
