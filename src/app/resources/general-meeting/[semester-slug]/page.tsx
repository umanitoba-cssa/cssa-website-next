import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { markdownToHtml, getMarkdownGroupByPath } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import GuideSidebar from '@/components/guides/guide-sidebar';
import MarkdownContent from '@/components/guides/markdown-content';
import Breadcrumbs from '@/components/guides/breadcrumbs';
import path from 'path';

interface groupPageProps {
  params: Promise<{
    'semester-slug': string;
  }>;
}

export default async function groupPage({ params }: groupPageProps) {
  const { ['semester-slug']: semesterSlug } = await params;
  const REPO = "general-meeting"

  const group = await getMarkdownGroupByPath(REPO, semesterSlug, semesterSlug);
  console.log("section slug", group.sections.map((section) => section.slug));
  // Redirect to 404 if group not found
  if (!group.title || group.title === 'group Not Found') {
    notFound();
  }
  
  // Process markdown content to HTML with group slug for proper image processing
  const htmlContent = await markdownToHtml(group.content, semesterSlug, "general-meeting");
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Resources', href: '/resources' },
    { label: 'General Meeting', href: '/resources/general-meeting' },
    { label: group.title, href: path.join('/resources/general-meeting', semesterSlug), active: true },
  ];
  
  return (
    <main className="flex flex-col">
      <PageHeader title={group.title} image="/img/backgrounds/resources.png" />
      
      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <GuideSidebar guide={group} rootPath={"/resources/general-meeting"} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 markdown-content-container">
            <article className="prose dark:prose-invert max-w-none">
              <MarkdownContent source={htmlContent} />
            </article>
            
            {/* Metadata */}
            {(group.author || group.date) && (
              <div className="mt-12 pt-4 border-t border-gray-700 text-sm text-gray-400">
                {group.author && <p>Written by: {group.author}</p>}
                {group.date && (
                  <p>
                    Last updated:{' '}
                    {new Date(group.date).toLocaleDateString('en-US', {
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
