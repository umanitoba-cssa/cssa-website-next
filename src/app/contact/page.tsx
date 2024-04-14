import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import ProfileCard from "@/components/profile-card";
import { ExecProfiles } from "@/data/team";

export default function Sponsor() {

    return (
        <main className="flex flex-col">
            <PageHeader title="Contact Us" image="/img/backgrounds/contact.jpg" />
            <div className="p-12">
                <div className="pb-8">
                    <BlockHeader title="Contact Email" />
                    <p>If you'd like to get in touch by email, please contact us at <a className="text-cssa-gold hover:underline" href="mailto:cssa@umanitoba.ca">cssa@umanitoba.ca</a></p>
                </div>
                <div className="pb-8">
                    <BlockHeader title="Contact Form" />
                </div>
                <iframe title='Contact us form' className="border border-solid border-gray-400 w-full min-h-[1500px]" src="https://forms.office.com/Pages/ResponsePage.aspx?id=C92AT4wzTE6KFJBEaWL3uMetWVcCpo5KtSmErSAZ7GlUM1JYMFNPNURWWENLSzFONE5ZWUlURzNZOC4u&embed=true" />
            </div>
        </main>
    );
}
