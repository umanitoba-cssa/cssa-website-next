'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { CalendarIcon, Pause, Play } from 'lucide-react';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { UPCOMING_EVENTS } from '@/data/events';

export default function UpcomingEventsSlideshow() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(true);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <div className="flex flex-col gap-4">
            <Carousel
                setApi={setApi}
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
                opts={{
                    loop: true,
                }}
                className="w-full">
                <CarouselContent>
                    {UPCOMING_EVENTS.map((event, index) => (
                        <CarouselItem key={index}>
                            <div className="grid lg:grid-cols-[400px_auto] gap-12 lg:gap-8 items-center p-1">
                                {/* Image Section */}
                                <div className="relative aspect-3/2 w-full overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content Section */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                                            <CalendarIcon className="h-3 w-3" />
                                            <span>{event.date}</span>
                                        </div>
                                        <h3 className="text-3xl font-bold leading-tight md:text-4xl">
                                            {event.title}
                                        </h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        {event.description.length > 150
                                            ? `${event.description.substring(0, 150)}...`
                                            : event.description}
                                    </p>
                                    {event.link && (
                                        <div className="pt-2">
                                            <Button
                                                asChild
                                                variant="outline">
                                                <Link href={event.link}>
                                                    {event.linkText || 'Learn More'}
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-12 bg-background/80 hover:bg-background lg:-left-12 lg:bg-background border-none" />
                <CarouselNext className="-right-12 bg-background/80 hover:bg-background lg:-right-12 lg:bg-background border-none" />
            </Carousel>

            {/* Pagination Dots and Autoplay Toggle */}
            <div className="flex items-center justify-center gap-4">
                <div className="flex justify-center gap-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            className={`h-2.5 w-2.5 rounded-full transition-colors ${
                                index === current ? 'bg-primary' : 'bg-muted-foreground/30'
                            }`}
                            onClick={() => api?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => {
                        const autoplay = api?.plugins()?.autoplay;
                        if (!autoplay) return;

                        if (autoplay.isPlaying()) {
                            autoplay.stop();
                            setIsPlaying(false);
                        } else {
                            autoplay.play();
                            setIsPlaying(true);
                        }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
}
