import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getGuideBySlug, getSectionBySlug, getGuidesSlugs, markdownToHtml } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import GuideSidebar from '@/components/guides/guide-sidebar';
import MarkdownContent from '@/components/guides/markdown-content';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/guides/breadcrumbs';

interface SectionPageProps {
    params: Promise<{
        'guide-slug': string;
        'section-slug': string;
    }>;
}

export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
    const { 'guide-slug': guideSlug, 'section-slug': sectionSlug } = await params;
    const guide = getGuideBySlug(guideSlug);

    if (!guide.title || guide.title === 'Guide Not Found') {
        return {
            title: 'Guide Not Found | CSSA Resources',
            description: 'The requested guide could not be found.',
        };
    }

    const section = getSectionBySlug(params['guide-slug'], params['section-slug']);

    if (!section.title || section.title === 'Section Not Found') {
        return {
            title: `Section Not Found | ${guide.title}`,
            description: 'The requested section could not be found.',
        };
    }

    return {
        title: `${section.title} | ${guide.title}`,
        description: section.description || guide.description,
    };
}

export async function generateStaticParams() {
    const guides = await getGuidesSlugs();
    const params: { 'guide-slug': string; 'section-slug': string }[] = [];

    for (const guideSlug of guides) {
        const guide = getGuideBySlug(guideSlug);
        guide.sections.forEach((section) => {
            params.push({
                'guide-slug': guideSlug,
                'section-slug': section.slug,
            });
        });
    }

    return params;
}

export default async function SectionPage({ params }: SectionPageProps) {
    const { 'guide-slug': guideSlug, 'section-slug': sectionSlug } = await params;
    const guide = getGuideBySlug(guideSlug);

    // Redirect to 404 if guide not found
    if (!guide.title || guide.title === 'Guide Not Found') {
        notFound();
    }

    const section = getSectionBySlug(guideSlug, sectionSlug);

    // Redirect to 404 if section not found
    if (!section.title || section.title === 'Section Not Found') {
        notFound();
    }

    // Process markdown content to HTML with guide slug for proper image processing
    const htmlContent = await markdownToHtml(section.content, guideSlug);

    // Find the current section index for prev/next navigation
    const currentSectionIndex = guide.sections.findIndex((s) => s.slug === sectionSlug);
    const prevSection = currentSectionIndex > 0 ? guide.sections[currentSectionIndex - 1] : null;
    const nextSection =
        currentSectionIndex < guide.sections.length - 1
            ? guide.sections[currentSectionIndex + 1]
            : null;

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Resources', href: '/resources' },
        { label: 'Guides', href: '/resources/guides' },
        { label: guide.title, href: `/resources/guides/${guideSlug}` },
        {
            label: section.title,
            href: `/resources/guides/${guideSlug}/${sectionSlug}`,
            active: true,
        },
    ];

    return (
        <main className="flex flex-col">
            <PageHeader
                title={section.title}
                image="/img/backgrounds/resources.png"
            />

            <div className="container py-8">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={breadcrumbItems}
                    className="mb-6"
                />

                <div className="lg:grid lg:grid-cols-3 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <GuideSidebar guide={guide} />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 markdown-content-container">
                        <article className="prose dark:prose-invert max-w-none">
                            <MarkdownContent source={htmlContent} />
                        </article>

                        {/* Section Navigation */}
                        <div className="mt-12 pt-4 border-t border-gray-700 flex justify-between">
                            {prevSection ? (
                                <Button
                                    variant="outline"
                                    className="border-cssa-blue text-white hover:bg-cssa-blue/20 transition-colors flex items-center gap-2"
                                    asChild>
                                    <Link
                                        href={`/resources/guides/${guideSlug}/${prevSection.slug}`}>
                                        <ChevronLeft className="h-4 w-4" />
                                        {prevSection.title}
                                    </Link>
                                </Button>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="border-cssa-blue text-white bg-cssa-blue/20 transition-colors flex items-center gap-2"
                                    asChild>
                                    <Link href={`/resources/guides/${guideSlug}`}>
                                        <ChevronLeft className="h-4 w-4" />
                                        Guide Overview
                                    </Link>
                                </Button>
                            )}

                            {nextSection && (
                                <Button
                                    variant="outline"
                                    className="border-cssa-blue text-white bg-cssa-blue/20 transition-colors flex items-center gap-2"
                                    asChild>
                                    <Link
                                        href={`/resources/guides/${guideSlug}/${nextSection.slug}`}>
                                        {nextSection.title}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>

                        {/* Metadata */}
                        {(section.author || section.date) && (
                            <div className="mt-6 pt-4 text-sm text-gray-400">
                                {section.author && <p>Written by: {section.author}</p>}
                                {section.date && (
                                    <p>
                                        Last updated:{' '}
                                        {new Date(section.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                )}
                                <p className="mt-2">Reading time: {section.readingTime.text}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
