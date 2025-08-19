"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import ProfileModal from "@/components/profile-modal";
import { ExecProfiles, IProfile } from "@/data/team";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export default function Team() {
    const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);

    return (
        <main className="flex flex-col">
            <PageHeader title="Team" image="/img/backgrounds/team.png" />
            <div className="container py-12 flex flex-col gap-8">
                <BlockHeader title="Executive Team" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {ExecProfiles.map((profile) => (
                        <ProfileCard
                            key={profile.name}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedProfile && (
                    <ProfileModal
                    profile={selectedProfile}
                    onClose={() => setSelectedProfile(null)}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}