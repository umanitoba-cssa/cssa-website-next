import Image from 'next/image';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

import type { IEventCard } from '@/data/events';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EventCarouselProps {
    events: ReadonlyMap<string, IEventCard>;
    label: string;
}

function EventCard({ event }: { event: IEventCard }) {
    const card = (
        <Card className="flex h-full flex-col border-primary">
            <CardHeader>
                <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>
                <CardTitle className="flex flex-row gap-2 text-lg group-hover:underline">
                    {event.title}
                    {!event.internal && (
                        <FaExternalLinkAlt
                            className="my-auto"
                            aria-hidden="true"
                        />
                    )}
                </CardTitle>
                <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
                <div className="flex justify-end">
                    <span className="text-sm text-primary group-hover:underline">
                        {event.linkText}
                    </span>
                </div>
            </CardContent>
        </Card>
    );

    if (event.internal) {
        return (
            <Link
                href={event.href}
                className="group block h-full">
                {card}
            </Link>
        );
    }

    return (
        <a
            href={event.href}
            target="_blank"
            rel="noreferrer"
            className="group block h-full">
            {card}
        </a>
    );
}

export default function EventCarousel({ events, label }: EventCarouselProps) {
    return (
        <Carousel
            aria-label={label}
            className="py-1"
            opts={{ align: 'center' }}>
            <CarouselContent>
                {Array.from(events.entries()).map(([eventKey, event]) => (
                    <CarouselItem
                        key={eventKey}
                        className="md:basis-1/2 lg:basis-[30%]">
                        <div className="h-full w-full px-2">
                            <EventCard event={event} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
        </Carousel>
    );
}
