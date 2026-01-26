export const revalidate = 86400;
// 86400 seconds = 60 * 60 * 24 , which is 1 day

import './events.css';
import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { RecentEvents, OlderEvents } from '@/data/events';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import CalendarSection from './components/CalendarSection';
import { getEvents } from '@/api/calendar';

export default async function Events() {
    const events = await getEvents();

    const recentEvents = Array.from(RecentEvents.values()).map((link, index) => {
        return (
            <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-[30%]">
                <div className="px-2 w-full h-full">
                    <a
                        href={link.href}
                        target={link.internal ? undefined : '_blank'}
                        rel={link.internal ? undefined : 'noreferrer'}>
                        <Card className="h-full border-primary">
                            <CardHeader>
                                <CardTitle className="text-lg flex flex-row gap-2">
                                    {link.title}
                                    {!link.internal && <FaExternalLinkAlt className="my-auto" />}
                                </CardTitle>
                                <CardDescription>{link.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-end">
                                    <span className="text-sm text-primary hover:underline">
                                        {link.linkText}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                </div>
            </CarouselItem>
        );
    });

    const olderEvents = Array.from(OlderEvents.values()).map((link, index) => {
        return (
            <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-[30%]">
                <div className="px-2 w-full h-full">
                    <a
                        href={link.href}
                        target={link.internal ? undefined : '_blank'}
                        rel={link.internal ? undefined : 'noreferrer'}>
                        <Card className="h-full border-primary">
                            <CardHeader>
                                <CardTitle className="text-lg flex flex-row gap-2">
                                    {link.title}
                                    {!link.internal && <FaExternalLinkAlt className="my-auto" />}
                                </CardTitle>
                                <CardDescription>{link.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-end">
                                    <span className="text-sm text-primary hover:underline">
                                        {link.linkText}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </a>
                </div>
            </CarouselItem>
        );
    });

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Events"
                image="/img/backgrounds/events.jpg"
            />
            <div className="flex flex-col container py-12 gap-12">
                <div className="flex flex-col gap-8 p-4">
                    <BlockHeader title="Recent Events" />
                    <p>All latest events ran by the CSSA.</p>

                    <Carousel
                        className="py-1"
                        opts={{ align: 'center' }}>
                        <CarouselContent>{recentEvents}</CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>

                <div className="flex flex-col gap-8 p-4">
                    <BlockHeader title="Older Events" />
                    <p>Some older events ran by the CSSA.</p>

                    <Carousel
                        className="py-1"
                        opts={{ align: 'center' }}>
                        <CarouselContent>{olderEvents}</CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>

                <div className="flex flex-col gap-8 p-4">
                    <BlockHeader title="Calendar" />
                    <p>Calendar View of events ran by the CSSA.</p>

                    <CalendarSection events={events} />
                </div>
            </div>
        </main>
    );
}
