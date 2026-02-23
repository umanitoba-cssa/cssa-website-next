import { notFound, redirect } from 'next/navigation';
import redirects from '@/data/redirects.json';

export default async function RedirectPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;

    if (!slug) {
        notFound();
    }

    const path = slug.join('/');

    const match = redirects.find((item) => item['cssa-website-route-to-redirect'] === path);

    if (match) {
        redirect(match.destination);
    }

    notFound();
}
