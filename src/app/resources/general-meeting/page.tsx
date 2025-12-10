import { getAllGuides, getAllMarkdownGroups } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import BlockHeader from '@/components/block-header';
import GuidesList from '@/components/guides/guides-list';

export default async function GuidesPage() {
  const REPO = "general-meeting"
  const BRANCH = 'develop'

  const guides = await getAllMarkdownGroups(REPO, BRANCH);
  return (
    <main className="flex flex-col">
      <PageHeader title="General Meeting Archives" image="/img/backgrounds/resources.png" />
      <div className="container py-8 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <BlockHeader title="General Meeting Archives" />
          <p>
            The CSSA has compiled a collection of general meeting archives to help computer science students
            navigate their academic journey and prepare for their careers. These archives cover
            a range of topics from getting started with computer science to finding internships
            and jobs.
          </p>
        </div>

        <GuidesList guides={guides} href="/resources/general-meeting" />
      </div>
    </main>
  );
} 