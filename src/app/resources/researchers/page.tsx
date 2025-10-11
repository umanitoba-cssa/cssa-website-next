"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ResearcherCard from "@/components/researcher-card";
import { ResearcherProfiles } from "@/data/researchers";

export default async function Researchers() {
    return (
        <main className="flex flex-col">
            <PageHeader title="Researchers" image="/img/backgrounds/resources.png" />
                <div className="container py-12 flex flex-col gap-8">
                    <BlockHeader title="Find Researchers" />
                    <div className="flex flex-row gap-4 flex-wrap justify-center">
                        {ResearcherProfiles.map((profile) => (
                            <ResearcherCard
                                profile={profile}
                                onClick={() => {}}
                            />
                        ))}                        
                    </div>
                </div>
        </main>
    );
}
