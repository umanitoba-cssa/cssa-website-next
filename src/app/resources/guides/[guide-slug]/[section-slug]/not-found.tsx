import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';
import { notFound } from 'next/navigation';
import { getGuideBySlug } from '@/lib/mdx';

export default async function SectionNotFound({
    params,
}: {
    params: Promise<{ 'guide-slug': string; 'section-slug': string }>;
}) {
    const { 'guide-slug': guideSlug, 'section-slug': sectionSlug } = await params;

    // If params or guide-slug is missing, delegate to a higher not-found boundary
    if (!guideSlug) {
        notFound();
    }

    // Check if the guide exists
    const guide = getGuideBySlug(guideSlug);

    // If the guide itself doesn't exist, show the main not found page
    if (!guide || guide.title === 'Guide Not Found') {
        notFound();
    }

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Section Not Found"
                image="/img/backgrounds/resources.png"
            />
            <div className="container py-12 flex flex-col items-center gap-6 text-center">
                <h2 className="text-2xl font-bold">The requested section could not be found</h2>
                <p className="text-muted-foreground max-w-xl">
                    The section &quot;{sectionSlug}&quot; in the guide &quot;
                    {guide.title}&quot; could not be found. It might have been removed or had its
                    name changed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button
                        className="bg-cssa-blue hover:bg-cssa-light-blue transition-colors text-white"
                        asChild>
                        <Link href={`/resources/guides/${guideSlug}`}>View Guide</Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="border-cssa-blue text-white bg-cssa-blue/20 transition-colors"
                        asChild>
                        <Link href="/resources/guides">Browse All Guides</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
