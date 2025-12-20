'use client';

import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import ProfileCard from '@/components/profile-card';
import ProfileModal from '@/components/profile-modal';
import {
    ExecProfiles,
    LoungeProfiles,
    PromotionsProfiles,
    FinanceProfiles,
    MerchProfiles,
    EventsProfiles,
    TechnologyProfiles,
    AdvocacyProfiles,
    StudentResourcesProfiles,
    IProfile,
    filterByYear,
    years,
} from '@/data/team';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Team() {
    const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);
    const [year, setYear] = useState('2025 - 2026');

    return (
        <main className="flex flex-col">
            <PageHeader title="Team" image="/img/backgrounds/team.jpg" />
            <div className="container py-12 flex flex-col gap-8">
                <Select
                    value={year}
                    onValueChange={setYear}>
                    <SelectTrigger className="w-[180px] focus:outline-none">
                        <SelectValue placeholder="Select a Year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {years.map((year: string) => (
                                <SelectItem
                                    key={year}
                                    value={year}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {filterByYear(ExecProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Executive Team" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(ExecProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {filterByYear(PromotionsProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Promotions Committee" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(PromotionsProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {filterByYear(EventsProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Events Committee" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(EventsProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {filterByYear(TechnologyProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Technology Committee" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(TechnologyProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {filterByYear(AdvocacyProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Advocacy Committee" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(AdvocacyProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {filterByYear(StudentResourcesProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Student Resources Committee" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(StudentResourcesProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {filterByYear(MerchProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Merch Committee" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(MerchProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}

                {filterByYear(LoungeProfiles, year).length > 0 && (
                    <>
                        <BlockHeader title="Lounge Affairs" />
                        <div className="flex flex-row gap-4 flex-wrap justify-center">
                            {filterByYear(LoungeProfiles, year).map((profile) => (
                                <ProfileCard
                                    key={`${profile.name}-${profile.position}`}
                                    profile={profile}
                                    onClick={() => {
                                        setSelectedProfile(profile);
                                    }}
                                />
                            ))}
                        </div>
                    </>
                )}
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
