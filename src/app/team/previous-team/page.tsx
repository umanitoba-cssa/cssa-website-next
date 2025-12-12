'use client';
import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import ProfileCard from '@/components/profile-card';
import ProfileModal from '@/components/profile-modal';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { IProfile } from '@/data/team';
import { ExecProfiles, filterByYear } from '@/data/prev-team';
import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function PreviousTeam() {
    const [choice, setChoice] = useState('2025');

    const years = useMemo(() => {
        const allYears = ExecProfiles.map((e) => e.year);
        const min = Math.min(...allYears);
        const max = Math.max(...allYears);

        return Array.from({ length: max - min + 1 }, (_, i) => (min + i).toString());
    }, []);

    const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Previous Team"
                image="/img/backgrounds/team.png"
            />
            <div className="container py-12 flex flex-col gap-8">
                <BlockHeader title="Previous Team" />
                <Select
                    value={choice}
                    onValueChange={setChoice}>
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
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {filterByYear(choice).map((profile) => (
                        <ProfileCard
                            key={`${profile.name}-${profile.position}`}
                            profile={profile}
                            onClick={() => {
                                setSelectedProfile(profile);
                            }}
                        />
                    ))}
                </div>

                <BlockHeader title="Current Team" />
                <div className="flex items-center justify-center">
                    <div className="px-2 w-[270px]  h-full">
                        <Link href={'/team'}>
                            <Card className="h-full border-primary">
                                <CardHeader>
                                    <CardTitle className="text-lg flex flex-row gap-2">
                                        Current Team
                                    </CardTitle>
                                    <CardDescription>View the Current Team Page</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-end">
                                        <span className="text-sm text-primary hover:underline">
                                            View Current Team →
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
