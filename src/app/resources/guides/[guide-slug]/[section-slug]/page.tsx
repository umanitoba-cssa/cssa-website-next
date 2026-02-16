import MarkdownNotFound from '@/components/markdown/markdown-not-found';
import { getMarkdownBySlug, getMarkdownSectionBySlug, markdownToHtml } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import MarkdownSidebar from '@/components/markdown/markdown-sidebar';
import MarkdownContent from '@/components/markdown/markdown-content';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/markdown/breadcrumbs';

const contentDir = 'guides';

interface SectionPageProps {
    params: Promise<{
        'guide-slug': string;
        'section-slug': string;
    }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { ['guide-slug']: guideSlug, ['section-slug']: sectionSlug } = params;
  const guide = await getMarkdownBySlug(guideSlug, contentDir);
  
  // Redirect to 404 if guide not found
  if (!guide.title || guide.title === 'Guide Not Found') {
    return (<MarkdownNotFound sourceDir="/resources/guides" sourceLabel="Guide"/>);
  }

  const section = getMarkdownSectionBySlug(guideSlug, sectionSlug, contentDir);
  // Redirect to 404 if section not found
  if (!section.title || section.title === 'Section Not Found') {
    return (<MarkdownNotFound sourceDir="/resources/guides" sourceLabel="Guide"/>);
  }
  
  // Process markdown content to HTML with guide slug for proper image processing
  const htmlContent = await markdownToHtml(section.content, guideSlug, contentDir);
  
  // Find the current section index for prev/next navigation
  const currentSectionIndex = guide.sections.findIndex(s => s.slug === sectionSlug);
  const prevSection = currentSectionIndex > 0 ? guide.sections[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < guide.sections.length - 1 ? guide.sections[currentSectionIndex + 1] : null;
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Resources', href: '/resources' },
    { label: 'Guides', href: '/resources/guides' },
    { label: guide.title, href: `/resources/guides/${guideSlug}` },
    { label: section.title, href: `/resources/guides/${guideSlug}/${sectionSlug}`, active: true },
  ];
  
  return (
    <main className="flex flex-col">
      <PageHeader title={section.title} image="/img/backgrounds/resources.png" />
      
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
            
            <div className="mt-12 pt-4 border-t border-gray-700 flex justify-between">
              {prevSection ? (
                <Button 
                  variant="outline" 
                  className="border-cssa-blue text-white hover:bg-cssa-blue/20 transition-colors flex items-center gap-2" 
                  asChild
                >
                  <Link href={`/resources/guides/${guideSlug}/${prevSection.slug}`}>
                    <ChevronLeft className="h-4 w-4" />
                    {prevSection.title}
                  </Link>
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  className="border-cssa-blue text-white bg-cssa-blue/20 transition-colors flex items-center gap-2" 
                  asChild
                >
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
                  asChild
                >
                  <Link href={`/resources/guides/${guideSlug}/${nextSection.slug}`}>
                    {nextSection.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
            
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
                <p className="mt-2">
                  Reading time: {section.readingTime.text}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 
