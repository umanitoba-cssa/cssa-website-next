import { notFound } from 'next/navigation';
import { getMarkdownBySlug, markdownToHtml } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import GuideSidebar from '@/components/guides/guide-sidebar';
import MarkdownContent from '@/components/guides/markdown-content';
import Breadcrumbs from '@/components/guides/breadcrumbs';

const contentDir = 'src/content/general-meeting';
const imageDir = 'general-meeting';

interface MeetingPageProps {
  params: Promise<{
    'semester-slug': string;
  }>;
}

export default async function MeetingPage({ params }: MeetingPageProps) {
  const { ['semester-slug']: semesterSlug } = await params;
  const meeting = await getMarkdownBySlug(semesterSlug, contentDir);
  
  if (!meeting.title || meeting.title === 'Meeting Not Found') {
    notFound();
  }
  
  const htmlContent = await markdownToHtml(meeting.content, semesterSlug, contentDir, imageDir);
  
  const breadcrumbItems = [
    { label: 'Resources', href: '/resources' },
    { label: 'Meetings', href: '/resources/general-meeting' },
    { label: meeting.title, href: `/resources/general-meeting/${semesterSlug}`, active: true },
  ];
  
  return (
    <main className="flex flex-col">
      <PageHeader title={meeting.title} image="/img/backgrounds/resources.png" />
      
      <div className="container py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        <div className="lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <GuideSidebar guide={meeting} rootPath={"/resources/general-meeting"} />
          </div>
          
          <div className="lg:col-span-2 markdown-content-container">
            <article className="prose dark:prose-invert max-w-none">
              <MarkdownContent source={htmlContent} />
            </article>
            
            {(meeting.author || meeting.date) && (
              <div className="mt-12 pt-4 border-t border-gray-700 text-sm text-gray-400">
                {meeting.author && <p>Written by: {meeting.author}</p>}
                {meeting.date && (
                  <p>
                    Last updated:{' '}
                    {new Date(meeting.date).toLocaleDateString('en-US', {
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
