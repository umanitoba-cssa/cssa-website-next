"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import ProfileModal from "@/components/profile-modal";
import { ExecProfiles, LoungeProfiles, PromotionsProfiles, FinanceProfiles, MerchProfiles, EventsProfiles, TechnologyProfiles, AdvocacyProfiles, StudentResourcesProfiles, IProfile } from "@/data/team";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

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
                            key={`${profile.name}-${profile.position}`}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-center">
              <button className="hover:shadow-form rounded-md bg-cssa-blue py-3 px-8 text-base font-semibold text-white outline-none">
                <Link href="/team/previous-execs">
                View Previous Execs
                </Link>
 
              </button>
            </div>

                <BlockHeader title="Promotions Committee" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {PromotionsProfiles.map((profile) => (
                        <ProfileCard
                            key={`${profile.name}-${profile.position}`}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>

                <BlockHeader title="Events Committee" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {EventsProfiles.map((profile) => (
                        <ProfileCard
                            key={`${profile.name}-${profile.position}`}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>

                <BlockHeader title="Technology Committee" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {TechnologyProfiles.map((profile) => (
                        <ProfileCard
                            key={`${profile.name}-${profile.position}`}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>

                <BlockHeader title="Advocacy Committee" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {AdvocacyProfiles.map((profile) => (
                        <ProfileCard
                            key={`${profile.name}-${profile.position}`}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>

                <BlockHeader title="Student Resources Committee" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {StudentResourcesProfiles.map((profile) => (
                        <ProfileCard
                            key={`${profile.name}-${profile.position}`}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>

                <BlockHeader title="Lounge Affairs" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {LoungeProfiles.map((profile) => (
                        <ProfileCard
                            key={`${profile.name}-${profile.position}`}
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