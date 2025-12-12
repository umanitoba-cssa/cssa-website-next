import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbsProps {
    items: {
        label: string;
        href: string;
        active?: boolean;
    }[];
    className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
    return (
        <nav className={cn('flex items-center space-x-1 text-sm', className)}>
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={item.href} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
                        )}

                        {isLast ? (
                            <span className="text-primary font-medium">{item.label}</span>
                        ) : (
                            <Link
                                href={item.href}
                                className="text-muted-foreground hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;
