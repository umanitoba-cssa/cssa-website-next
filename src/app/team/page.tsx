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
            github={profile.github}
            website={profile.website}
            description={profile.description}
            // discord={profile.discord}
        />
    ));

    return (
        <main className="flex flex-col">
            <PageHeader title="Team" image="/img/backgrounds/team.png" />
            <div className="container py-12 flex flex-col gap-8">
                <BlockHeader title="Executive Team" />
                <div className="flex flex-row gap-4 flex-wrap justify-center">
                    {execCards}
                </div>
            </div>
        </main>
    );
}
