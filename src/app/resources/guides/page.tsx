import { getAllGuides } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import BlockHeader from '@/components/block-header';
import MarkdownList from '@/components/guides/markdown-list';

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

        <MarkdownList markdown={guides} href="/resources/guides" />
      </div>
    </main>
  );
} 
