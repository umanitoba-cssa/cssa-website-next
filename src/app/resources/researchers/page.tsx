'use client';

import PageHeader from '@/components/page-header';
import ResearcherCard from '@/components/researcher-card';
import ResearcherModal from '@/components/researcher-modal';
import { SearchBar } from '@/components/ui/search-bar';
import { IResearcher, ResearchersInfo } from '@/data/researchers';
import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';

export default function Researchers() {
    const [selectedResearcher, setSelectedResearcher] = useState<IResearcher | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // add ids to each researcher
    const researcherProfiles: IResearcher[] = ResearchersInfo.map((researcher, i) => ({
        id: i + 1,
        ...researcher,
    }));

    // filter researchers based on search query
    const filteredResearchers = useMemo(() => {
        if (!searchQuery.trim()) return researcherProfiles;

        const query = searchQuery.toLowerCase();
        return researcherProfiles.filter((researcher) => {
            const matchesName = researcher.fullName.toLowerCase().includes(query);
            const matchesEmail = researcher.email.toLowerCase().includes(query);
            const matchesLab = researcher.lab?.name?.toLowerCase().includes(query);
            const matchesInterests = researcher.researchInterests.some((interest) =>
                interest.toLowerCase().includes(query),
            );
            return matchesName || matchesEmail || matchesLab || matchesInterests;
        });
    }, [searchQuery, researcherProfiles]);

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Researchers"
                image="/img/backgrounds/resources.png"
            />
            <div className="container pt-6 sm:pt-8 flex justify-center">
                <SearchBar
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                    placeholder="Search for researchers..."
                />
            </div>
            <div className="container py-12 flex flex-col gap-8">
                {filteredResearchers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {filteredResearchers.map((researcher) => (
                            <ResearcherCard
                                key={researcher.id}
                                researcher={researcher}
                                onClick={() => {
                                    setSelectedResearcher(researcher);
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 sm:py-12 px-4">
                        <p className="text-lg sm:text-xl text-gray-500 italic pt-2">
                            No researchers found matching your search.
                        </p>
                    </div>
                )}
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
