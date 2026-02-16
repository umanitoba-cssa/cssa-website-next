import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MarkdownCardProps {
  title: string;
  description: string;
  author?: string;
  date?: string;
  href: string;
}

const MarkdownCard: React.FC<MarkdownCardProps> = ({
  title,
  description,
  author,
  date,
  href
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
    <Link href={href} className="block h-full">
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
            <span className="text-sm text-primary hover:underline">
              Read now →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MarkdownCard; 
