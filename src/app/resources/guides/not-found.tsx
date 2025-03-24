import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';

export default function GuidesNotFound() {
  return (
    <main className="flex flex-col">
      <PageHeader title="Page Not Found" image="/img/backgrounds/resources.png" />
      <div className="container py-12 flex flex-col items-center gap-6 text-center">
        <h2 className="text-2xl font-bold">The requested page could not be found</h2>
        <p className="text-muted-foreground max-w-xl">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button variant="default" className="bg-cssa-blue hover:bg-cssa-light-blue" asChild>
            <Link href="/resources">
              Back to Resources
            </Link>
          </Button>
          <Button variant="outline" className="border-cssa-blue text-cssa-blue hover:bg-cssa-blue hover:text-white" asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
} 