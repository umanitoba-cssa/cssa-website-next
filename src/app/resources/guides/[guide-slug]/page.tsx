import MarkdownNotFound from '@/components/guides/markdown-not-found';
import { getMarkdownBySlug, markdownToHtml } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import MarkdownSidebar from '@/components/guides/markdown-sidebar';
import MarkdownContent from '@/components/guides/markdown-content';
import Breadcrumbs from '@/components/guides/breadcrumbs';

const contentDir = 'guides';

interface GuidePageProps {
  params: Promise<{
    'guide-slug': string;
  }>;
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { ['guide-slug']: guideSlug } = await params;
  const guide = await getMarkdownBySlug(guideSlug, contentDir);
  
  if (!guide.title || guide.title === 'guide Not Found') {
    return (<MarkdownNotFound sourceDir="/resources/guides" sourceLabel="Guide"/>);
  }
  
  const htmlContent = await markdownToHtml(guide.content, guideSlug, contentDir);
  
  const breadcrumbItems = [
    { label: 'Resources', href: '/resources' },
    { label: 'Guides', href: '/resources/guides' },
    { label: guide.title, href: `/resources/guides/${guideSlug}`, active: true },
  ];
  
  return (
    <main className="flex flex-col">
      <PageHeader title={guide.title} image="/img/backgrounds/resources.png" />
      
      <div className="container py-8">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        <div className="lg:grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <MarkdownSidebar markdown={guide} rootPath={"/resources/guides"} />
          </div>
          
          <div className="lg:col-span-2 markdown-content-container">
            <article className="prose dark:prose-invert max-w-none">
              <MarkdownContent source={htmlContent} />
            </article>
            
            {(guide.author || guide.date) && (
              <div className="mt-12 pt-4 border-t border-gray-700 text-sm text-gray-400">
                {guide.author && <p>Written by: {guide.author}</p>}
                {guide.date && (
                  <p>
                    Last updated:{' '}
                    {new Date(guide.date).toLocaleDateString('en-US', {
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
