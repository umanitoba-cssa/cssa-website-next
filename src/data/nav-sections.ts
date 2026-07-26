import { UpcomingEvents } from '@/data/events';

interface INavSection {
    label: string;
    anchor: string;
}

export const NAV_SECTIONS: Record<string, INavSection[]> = {
    '/': [
        ...(UpcomingEvents.length > 0
            ? [{ label: 'Upcoming Events', anchor: 'upcoming-events' }]
            : []),
        { label: 'Who We Are', anchor: 'who-we-are' },
        { label: 'What We Do', anchor: 'what-we-do' },
        { label: 'How We Support', anchor: 'how-we-support' },
    ],
    '/team': [
        { label: 'Executive Team', anchor: 'executive-team' },
        { label: 'Promotions Committee', anchor: 'promotions-committee' },
        { label: 'Events Committee', anchor: 'events-committee' },
        { label: 'Technology Committee', anchor: 'technology-committee' },
        { label: 'Advocacy Committee', anchor: 'advocacy-committee' },
        { label: 'Student Resources Committee', anchor: 'student-resources-committee' },
        { label: 'Merch Committee', anchor: 'merch-committee' },
        { label: 'Lounge Affairs', anchor: 'lounge-affairs' },
    ],
    '/resources': [
        { label: 'CSSA Resources', anchor: 'cssa-resources' },
        { label: 'Degree Resources', anchor: 'degree-resources' },
        { label: 'Course Help', anchor: 'course-help' },
        { label: 'CSSA Meeting Archives', anchor: 'cssa-meeting-archives' },
    ],
    '/events': [
        { label: 'Recent Events', anchor: 'recent-events' },
        { label: 'Older Events', anchor: 'older-events' },
        { label: 'Calendar', anchor: 'calendar' },
    ],
    '/lounge': [
        { label: 'Lounge Location', anchor: 'lounge-location' },
        { label: 'Lounge Canteen Menu', anchor: 'lounge-canteen-menu' },
    ],
    '/sponsor': [
        { label: 'Why Sponsor Us?', anchor: 'why-sponsor-us' },
        { label: 'Sponsorship Package', anchor: 'sponsorship-package' },
        { label: 'Contact Us', anchor: 'contact-us' },
    ],
    '/contact': [
        { label: 'Contact Email', anchor: 'contact-email' },
        { label: 'Contact Form', anchor: 'contact-form' },
    ],
};
