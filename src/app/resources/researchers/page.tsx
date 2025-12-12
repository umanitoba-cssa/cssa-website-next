'use client';

import PageHeader from '@/components/page-header';
import ResearcherCard from '@/components/researcher-card';
import ResearcherModal from '@/components/researcher-modal';
import { IResearcher, ResearchersInfo } from '@/data/researchers';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function Researchers() {
    const [selectedResearcher, setSelectedResearcher] = useState<IResearcher | null>(null);

    // add ids to each researcher
    const researcherProfiles: IResearcher[] = ResearchersInfo.map((researcher, i) => ({
        id: i + 1,
        ...researcher,
    }));

    return (
        <main className="flex flex-col">
            <PageHeader title="Researchers" image="/img/backgrounds/resources.png" />
            <div className="container py-12 flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {researcherProfiles.map((researcher) => (
                        <ResearcherCard
                            key={researcher.id}
                            researcher={researcher}
                            onClick={() => {
                                setSelectedResearcher(researcher);
                            }}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedResearcher && (
                    <ResearcherModal
                        researcher={selectedResearcher}
                        onClose={() => setSelectedResearcher(null)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
