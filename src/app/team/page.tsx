"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import ProfileModal from "@/components/profile-modal";
import { ExecProfiles, LoungeProfiles, PromotionsProfiles, FinanceProfiles, MerchProfiles, EventsProfiles, TechnologyProfiles, AdvocacyProfiles, StudentResourcesProfiles, IProfile } from "@/data/team";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";


export default function PreviousTeam() {
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

                <BlockHeader title="Previous Team" />
                <div className="flex items-center justify-center">
                <div className="px-2 w-full md:w-2/5 h-full">
                    <Link href={"/team/previous-team"}>
                <Card className="h-full border-primary">
                            <CardHeader>
                                <CardTitle className="text-lg flex flex-row gap-2">
                                    Previous Team
                                </CardTitle>
                                <CardDescription>View the Previous Team Page</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex justify-end">
                                <span className="text-sm text-primary hover:underline">
                                  View Previous Team →
                                </span>
                              </div>
                            </CardContent>
                        </Card>
                        </Link>
                        </div>
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