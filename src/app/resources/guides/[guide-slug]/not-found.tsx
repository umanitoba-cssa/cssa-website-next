import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';

export default function GuideNotFound() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="Guide Not Found"
                image="/img/backgrounds/resources.png"
            />
            <div className="container py-12 flex flex-col items-center gap-6 text-center">
                <h2 className="text-2xl font-bold">The requested guide could not be found</h2>
                <p className="text-muted-foreground max-w-xl">
                    The guide you are looking for might have been removed, had its name changed, or
                    is temporarily unavailable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button
                        className="bg-cssa-blue hover:bg-cssa-light-blue transition-colors text-white"
                        asChild>
                        <Link href="/resources/guides">Browse All Guides</Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="border-cssa-blue text-white bg-cssa-blue/20 transition-colors"
                        asChild>
                        <Link href="/resources">Back to Resources</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
