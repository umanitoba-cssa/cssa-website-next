// TODO:
// - Get image background to replace resources.png

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
import {
    RecentEvents,
    OlderEvents,
} from '@/data/events';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default async function Events() {

    const recentEvents = RecentEvents.map((link, index) => {
        return (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-[30%]">
                <div className="px-2 w-full h-full">
                    <a
                        href={link.href}
                        target={link.internal ? undefined : '_blank'}
                        rel={link.internal ? undefined : 'noreferrer'}
                    >
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

    const olderEvents = OlderEvents.map((link, index) => {
        return (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-[30%]">
                <div className="px-2 w-full h-full">
                    <a
                        href={link.href}
                        target={link.internal ? undefined : '_blank'}
                        rel={link.internal ? undefined : 'noreferrer'}
                    >
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
            <PageHeader title="Events" image="/img/backgrounds/resources.png" /> 
            <div className="flex flex-col container py-12 gap-12">
                <div className="flex flex-col gap-8">
                    <BlockHeader title="Recent Events" />
                    <p>All latest past events ran by the CSSA.</p>

                    <Carousel className="py-1" opts={{ align: 'center' }}>
                        <CarouselContent>{recentEvents}</CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>


                <div className="flex flex-col gap-8">
                    <BlockHeader title="Older Events" />
                    <p>Some older events ran by the CSSA.</p>

                    <Carousel className="py-1" opts={{ align: 'center' }}>
                        <CarouselContent>{olderEvents}</CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>
            </div>
        </main>
    );
}
