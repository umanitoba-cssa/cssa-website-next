import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GuideCardProps {
    title: string;
    description: string;
    slug: string;
    author?: string;
    date?: string;
}

const GuideCard: React.FC<GuideCardProps> = ({
    title,
    description,
    slug,
    author,
    date,
}: {
    title: string;
    description: string;
    slug: string;
    author?: string;
    date?: string;
}) => {
    // Format date if available
    const formattedDate = date
        ? new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : null;

    return (
        <Link
            href={`/resources/guides/${slug}`}
            className="block h-full">
            <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    {(author || formattedDate) && (
                        <div className="text-sm text-muted-foreground">
                            {author && <span>By {author}</span>}
                            {author && formattedDate && <span> · </span>}
                            {formattedDate && <span>Last updated: {formattedDate}</span>}
                        </div>
                    )}
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end">
                        <span className="text-sm text-primary hover:underline">Read guide →</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};

export default GuideCard;
