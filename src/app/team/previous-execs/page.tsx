"use client";

import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import ProfileModal from "@/components/profile-modal";
import { IProfile } from "@/data/team";
import { ExecProfiles, filterByYear } from "@/data/prev-team";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Team() {
  const [choice, setChoice] = useState("2022");

  const [selectedProfile, setSelectedProfile] = useState<IProfile | null>(null);

  return (
    <main className="flex flex-col">
      <PageHeader title="Previous Execs" image="/img/backgrounds/team.png" />
      <div className="container py-12 flex flex-col gap-8">
        <BlockHeader title="Previous Executive Team" />
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
        <div className="flex items-center justify-center">
          <button className="hover:shadow-form rounded-md bg-cssa-blue py-3 px-8 text-base font-semibold text-white outline-none">
            <Link href="/team">View Execs</Link>
          </button>
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
