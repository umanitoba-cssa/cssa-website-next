import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getGuideBySlug, getMarkdownSectionBySlug, getGuidesSlugs, markdownToHtml, getMarkdownGroupByPath } from '@/lib/mdx';
import PageHeader from '@/components/page-header';
import GuideSidebar from '@/components/guides/guide-sidebar';
import MarkdownContent from '@/components/guides/markdown-content';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumbs from '@/components/guides/breadcrumbs';
import path from 'path';

interface SectionPageProps {
  params: Promise<{
    'semester-slug': string;
    'meeting-item-slug': string;
  }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { ['semester-slug']: semesterSlug, ['meeting-item-slug']: meetingItemSlug } = await params;
  const REPO = "general-meeting"
  const guide = await getMarkdownGroupByPath(REPO, semesterSlug, semesterSlug);
  const filePath = path.join(semesterSlug, meetingItemSlug+".md");
  // Redirect to 404 if guide not found
  if (!guide.title || guide.title === 'Guide Not Found') {
    notFound();
  }
  const section = await getMarkdownSectionBySlug(REPO, filePath, meetingItemSlug);
  // Redirect to 404 if section not found
  if (!section.title || section.title === 'Section Not Found') {
    notFound();
  }
  
  // Process markdown content to HTML with guide slug for proper image processing
  const htmlContent = await markdownToHtml(section.content, semesterSlug, "general-meeting");
  
  // Find the current section index for prev/next navigation
  const currentSectionIndex = guide.sections.findIndex(s => s.slug === meetingItemSlug);
  const prevSection = currentSectionIndex > 0 ? guide.sections[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < guide.sections.length - 1 ? guide.sections[currentSectionIndex + 1] : null;
  
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Resources', href: '/resources' },
    { label: 'Guides', href: '/resources/guides' },
    { label: guide.title, href: `/resources/guides/${semesterSlug}` },
    { label: section.title, href: `/resources/guides/${semesterSlug}/${meetingItemSlug}`, active: true },
  ];
  
  return (
    <main className="flex flex-col">
      <PageHeader title={section.title} image="/img/backgrounds/resources.png" />
      
      <div className="container py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <GuideSidebar guide={guide} rootPath={"/resources/general-meeting"} />
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
                  asChild
                >
                  <Link href={`/resources/guides/${semesterSlug}/${prevSection.slug}`}>
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
                  <Link href={`/resources/guides/${semesterSlug}`}>
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
                  <Link href={`/resources/guides/${semesterSlug}/${nextSection.slug}`}>
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
