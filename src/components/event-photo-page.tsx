import PageHeader from '@/components/page-header';
import EventPageHeader from '@/components/event-page-header';
import BlockHeader from '@/components/block-header';
import { RecentEvents } from '@/data/events';
import fs from 'fs';
import path from 'path';
import React from 'react';

interface EventPhotoPageProps {
    eventKey: string;
    photoDir: string;
    headerImageIdx?: number;
    keepHeaderImageInBody?: boolean;
}

export default async function EventPhotoPage({
    eventKey,
    photoDir,
    headerImageIdx = 0,
    keepHeaderImageInBody = false,
}: EventPhotoPageProps) {
    const event = RecentEvents.get(eventKey);

    if (!event) {
        throw new Error(`Event not found: ${eventKey}`);
    }

    const dir = path.join(process.cwd(), 'public' + photoDir);
    const images = fs.readdirSync(dir);

    if (!images[headerImageIdx]) {
        throw new Error(`Header image index ${headerImageIdx} out of bounds for ${photoDir}`);
    }

    const galleryImages = keepHeaderImageInBody
        ? images
        : images.slice(0, headerImageIdx).concat(images.slice(headerImageIdx + 1));

    return (
        <main className="flex flex-col">
            <PageHeader
                title={event.title}
                image={photoDir + images[headerImageIdx]}
            />

            <div className="flex flex-col container py-12 gap-12">
                <BlockHeader title="Description"></BlockHeader>
                <p>{event.description}</p>

                {galleryImages.map((img) => (
                    <EventPageHeader
                        key={img}
                        image={photoDir + img}
                        alt=""
                    />
                ))}
            </div>
        </main>
    );
}
