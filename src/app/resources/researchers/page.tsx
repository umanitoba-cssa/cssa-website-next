"use client";

import PageHeader from "@/components/page-header";
import ResearcherCard from "@/components/researcher-card";
import { IResearcher, ResearchersInfo } from "@/data/researchers";
import { useState } from "react";

export default function Researchers() {
    const [selectedProfile, setSelectedProfile] = useState<IResearcher | null>(null);
    
    // add ids to each researcher
    const researcherProfiles: IResearcher[] = ResearchersInfo.map((researcher, i) => ({
        id: i + 1,
        ...researcher
    }));

    return (
        <main className="flex flex-col">
            <PageHeader title="Researchers" image="/img/backgrounds/resources.png" />
            <div className="container py-12 flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {researcherProfiles.map((profile) => (
                        <ResearcherCard
                            key={profile.id}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
