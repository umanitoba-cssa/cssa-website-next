import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getGuideBySlug, getGuidesSlugs, extractHeadings, markdownToHtml } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import GuideSidebar from '@/components/guides/guide-sidebar';
import MarkdownContent from '@/components/guides/markdown-content';
import Breadcrumbs from '@/components/guides/breadcrumbs';

interface GuidePageProps {
  params: {
    'guide-slug': string;
  };
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = await getGuideBySlug(params['guide-slug']);
  
  if (!guide.title || guide.title === 'Guide Not Found') {
    return {
      title: 'Guide Not Found | CSSA Resources',
      description: 'The requested guide could not be found.',
    };
  }
  
  return {
    title: `${guide.title} | CSSA Guides`,
    description: guide.description,
  };
}

export async function generateStaticParams() {
  const guides = await getGuidesSlugs();
  return guides.map((slug) => ({
    'guide-slug': slug,
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = await getGuideBySlug(params['guide-slug']);
  
  // Redirect to 404 if guide not found
  if (!guide.title || guide.title === 'Guide Not Found') {
    notFound();
  }
  
  // Process markdown content to HTML with guide slug for proper image processing
  const htmlContent = await markdownToHtml(guide.content, params['guide-slug']);
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Resources', href: '/resources' },
    { label: 'Guides', href: '/resources/guides' },
    { label: guide.title, href: `/resources/guides/${params['guide-slug']}`, active: true },
  ];
  
  return (
    <main className="flex flex-col">
      <PageHeader title={guide.title} image="/img/backgrounds/resources.png" />
      
      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <GuideSidebar guide={guide} rootPath={"/resources/guides"} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 markdown-content-container">
            <article className="prose dark:prose-invert max-w-none">
              <MarkdownContent source={htmlContent} />
            </article>
            
            {/* Metadata */}
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
