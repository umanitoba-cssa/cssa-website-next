import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import { ExecProfiles } from "@/data/team";

export default function Team() {
    const execCards = ExecProfiles.map((profile) => (
        <ProfileCard
            key={profile.name}
            name={profile.name}
            position={profile.position}
            image={profile.image}
            linkedin={profile.linkedin}
            instagram={profile.instagram}
            github={profile.github}
            website={profile.website}
        />
    ));

    return (
        <main className="flex flex-col">
            <PageHeader title="Team" image="/img/backgrounds/team.png" />
            <div className="p-12">
                <BlockHeader title="Executive Team" />
                <div className="my-8 flex flex-row gap-4 flex-wrap justify-evenly">
                    {execCards}
                </div>
            </div>
        </main>
    );
}
