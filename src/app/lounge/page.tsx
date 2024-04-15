import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import { ExecProfiles } from "@/data/team";

export default function Lounge() {
    return (
        <main className="flex flex-col">
            <PageHeader title="Lounge" image="/img/backgrounds/lounge.jpg" />
            <div className="container py-12 flex flex-col gap-12">
                <div className="flex flex-col gap-8">
                    <BlockHeader title="Lounge Location" />
                    <p>You can find our lounge at EITC E1-586.</p>
                    <div className="aspect-video w-full">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube-nocookie.com/embed/Eek6S5fP5sg?mute=1"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <BlockHeader title="Lounge Canteen Menu" />
                </div>
            </div>
        </main>
    );
}
