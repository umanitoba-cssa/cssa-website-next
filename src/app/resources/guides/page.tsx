import { getAllGuides } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import BlockHeader from '@/components/block-header';
import MarkdownList from '@/components/markdown/markdown-list';
import { OldGuides } from '@/data/resources';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
    title: 'Guides | CSSA Resources',
    description: 'Comprehensive guides for computer science students',
};

export default async function GuidesPage() {
    const guides = await getAllGuides();

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Guides"
                image="/img/backgrounds/resources.png"
            />
            <div className="container py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <BlockHeader title="Student Guides" />
                    <p>
                        The CSSA has compiled a collection of guides to help computer science
                        students navigate their academic journey and prepare for their careers.
                        These guides cover a range of topics from getting started with computer
                        science to finding internships and jobs.
                    </p>
                </div>

                <MarkdownList
                    markdown={guides}
                    href="/resources/guides"
                />

                {OldGuides.length > 0 && (
                    <>
                        <div className="flex flex-col gap-4">
                            <BlockHeader title="Old Guides" />
                            <p>Explore archived CSSA guides. Some information may be outdated.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {OldGuides.map(({ href, title, description }, index) => (
                                <div
                                    className="px-2 w-full h-full"
                                    key={index}>
                                    <Link href={`/${href}`}>
                                        <Card className="h-full">
                                            <CardHeader>
                                                <CardTitle className="text-lg flex flex-row gap-2">
                                                    {title}
                                                    <FaExternalLinkAlt className="my-auto" />
                                                </CardTitle>
                                                <CardDescription>{description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
