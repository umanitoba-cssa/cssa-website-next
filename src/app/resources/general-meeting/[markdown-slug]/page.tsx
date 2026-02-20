import MarkdownNotFound from '@/components/markdown/markdown-not-found';
import { getMarkdownBySlug, markdownToHtml } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import MarkdownSidebar from '@/components/markdown/markdown-sidebar';
import MarkdownContent from '@/components/markdown/markdown-content';
import Breadcrumbs from '@/components/markdown/breadcrumbs';

const contentDir = 'general-meeting';

interface MarkdownPageProps {
    params: Promise<{
        'markdown-slug': string;
    }>;
}

export default async function MeetingPage({ params }: MarkdownPageProps) {
    const { ['markdown-slug']: markdownSlug } = await params;
    const markdown = await getMarkdownBySlug(markdownSlug, contentDir);

    if (!markdown.title || markdown.title === 'Meeting Not Found') {
        return (
            <MarkdownNotFound
                sourceDir={`/resources/${contentDir}`}
                sourceLabel="Meeting"
            />
        );
    }

    const htmlContent = await markdownToHtml(markdown.content, markdownSlug, contentDir);

    const breadcrumbItems = [
        { label: 'Resources', href: '/resources' },
        { label: 'Meetings', href: `/resources/${contentDir}` },
        { label: markdown.title, href: `/resources/${contentDir}/${markdownSlug}`, active: true },
    ];

    return (
        <main className="flex flex-col">
            <PageHeader
                title={markdown.title}
                image="/img/backgrounds/resources.png"
            />

            <div className="container py-8">
                <Breadcrumbs
                    items={breadcrumbItems}
                    className="mb-6"
                />

                <div className="lg:grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <MarkdownSidebar
                            markdown={markdown}
                            rootPath={`/resources/${contentDir}`}
                        />
                    </div>

                    <div className="lg:col-span-2 markdown-content-container">
                        <article className="prose dark:prose-invert max-w-none">
                            <MarkdownContent source={htmlContent} />
                        </article>

                        {(markdown.author || markdown.date) && (
                            <div className="mt-12 pt-4 border-t border-gray-700 text-sm text-gray-400">
                                {markdown.author && <p>Written by: {markdown.author}</p>}
                                {markdown.date && (
                                    <p>
                                        Last updated:{' '}
                                        {new Date(markdown.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
