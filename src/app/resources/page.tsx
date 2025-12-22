import './resources.css';
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
    CSSALinks,
    IPlaylist,
    MeetingArchivesID,
    PlaylistCollections,
    ResourceLinks,
} from '@/data/resources';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { GetPlaylistData, IVideoData } from '@/api/youtube';
import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';

function MakePlaylistCards(videos: IVideoData[]) {
    return videos?.map((video, index) => {
        return (
            <CarouselItem
                key={index}
                className="basis-[90%] md:basis-[45%] lg:basis-[30%]">
                <div className="px-2 w-full h-full">
                    <a
                        href={video.href}
                        target="_blank"
                        rel="noreferrer">
                        <Card className="h-full">
                            <CardHeader>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full object-cover aspect-video"
                                />
                                <CardTitle className="text-xl">{video.title}</CardTitle>
                            </CardHeader>
                        </Card>
                    </a>
                </div>
            </CarouselItem>
        );
    });
}

export default async function Resources() {
    for (const collection of PlaylistCollections) {
        for (const playlist of collection.playlists) {
            const videos = await GetPlaylistData(playlist.playlistId);
            playlist.videos = videos;
        }
    }

    const resourceCards = ResourceLinks.map((link, index) => {
        return (
            <CarouselItem
                key={index}
                className="md:basis-1/2 lg:basis-[30%]">
                <div className="px-2 w-full h-full">
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-lg flex flex-row gap-2">
                                    {link.title} <FaExternalLinkAlt className="my-auto" />
                                </CardTitle>
                                <CardDescription>{link.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    </a>
                </div>
            </CarouselItem>
        );
    });

    const cssaCards = CSSALinks.map((link, index) => {
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

    const collectionTabs = PlaylistCollections.map((collection, index) => {
        return (
            <TabsTrigger
                key={index}
                value={collection.category}>
                {collection.category}
            </TabsTrigger>
        );
    });

    const collectionContent = PlaylistCollections.map((collection, index) => {
        const playlistAccordions = collection.playlists.map((playlist, index) => {
            const videoCards = MakePlaylistCards(playlist.videos ?? []);
            return (
                <AccordionItem
                    value={playlist.playlistId}
                    key={index}>
                    <AccordionTrigger>
                        <span>
                            <span className="flex text-lg">{playlist.title}</span>
                            <span className="flex text-sm text-gray-400">
                                (by {playlist.author})
                            </span>
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Carousel
                            className="py-1"
                            opts={{ align: 'center' }}>
                            <CarouselContent>{videoCards}</CarouselContent>
                            <CarouselNext />
                            <CarouselPrevious />
                        </Carousel>
                    </AccordionContent>
                </AccordionItem>
            );
        });

        return (
            <TabsContent
                key={index}
                value={collection.category}>
                <Accordion type="multiple">{playlistAccordions}</Accordion>
            </TabsContent>
        );
    });

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Resources"
                image="/img/backgrounds/resources.png"
            />
            <div className="flex flex-col container py-12 gap-12">
                <div className="flex flex-col gap-8">
                    <BlockHeader title="CSSA Resources" />
                    <p>All the internal materials provided by the CSSA.</p>

                    <Carousel
                        className="py-1"
                        opts={{ align: 'center' }}>
                        <CarouselContent>{cssaCards}</CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>

                <div className="flex flex-col gap-8">
                    <BlockHeader title="Degree Resources" />
                    <p>
                        Questions about courses, programs, or Computer Science Co-op? Take a look at
                        these links!
                    </p>
                    <Carousel
                        className="py-1"
                        opts={{ align: 'center' }}>
                        <CarouselContent>{resourceCards}</CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>

                <div className="flex flex-col gap-8">
                    <BlockHeader title="Course Help" />
                    <p>Lectures and course resources on YouTube made by our instructors.</p>

                    <Tabs
                        defaultValue={PlaylistCollections[0].category}
                        className="w-full">
                        <TabsList className="w-full">{collectionTabs}</TabsList>
                        {collectionContent}
                    </Tabs>
                </div>

                <div className="flex flex-col gap-8">
                    <BlockHeader title="CSSA Meeting Archives" />
                    <p>Recordings of our general meetings.</p>
                    <Carousel
                        className="py-1"
                        opts={{ align: 'center' }}>
                        <CarouselContent>
                            {MakePlaylistCards(await GetPlaylistData(MeetingArchivesID))}
                        </CarouselContent>
                        <CarouselNext />
                        <CarouselPrevious />
                    </Carousel>
                </div>
            </div>
        </main>
    );
}
