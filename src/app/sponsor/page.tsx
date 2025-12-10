import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";

export default function Sponsor() {

    return (
        <>
            <main className="flex flex-col">
                <PageHeader title="Sponsor Us" image="/img/backgrounds/sponsors2.jpg" />
                <div className="container py-12 flex flex-col gap-12">
                    <div className="flex flex-col gap-8">
                        <BlockHeader title="Why Sponsor Us?" />
                        <p>
                            Our events draw a diverse audience of potential customers, partners, and employees who
                            are interested in pursuing a career in computer science. By sponsoring our events, your
                            company can showcase its brand, products, and services to interested parties. You can
                            also demonstrate your commitment to fostering a culture of innovation, learning, and
                            community by helping us bring students these opportunities to develop their technical
                            skills and connect with one another. You can help build the next generation of the
                            computer science workforce by inspiring and empowering students to pursue their
                            curiosity for computer science, further helping them discover or cultivate their
                            passions in the field.
                        </p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <BlockHeader title="Sponsorship Package"></BlockHeader>
                        <p>View or download our <a className="underline" target="_blank" href="/docs/sponsorshipPackage.pdf">2025-2026 Sponsorship Package here</a>.</p>
                    </div>
                    <div className="flex flex-col gap-8">
                        <BlockHeader title="Contact Us" />
                        <p>
                            To inquire about sponsorships, please email us at <a className="text-cssa-gold hover:underline" href="mailto:cssa@umanitoba.ca">cssa@umanitoba.ca</a>
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
}
