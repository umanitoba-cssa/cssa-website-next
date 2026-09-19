import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import SponsorCard from '@/components/sponsor-card';

export default function CaseComp2025() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="Case Competition 2025"
                image="/img/capture-the-flag/2025photos/IMG_0426.jpg"
            />
            <div className="container py-12 flex flex-col gap-12">
                <hr className="border-t-4 border-cssa-gold" />
                <div className="flex flex-col items-center gap-5">
                    <h3>PRESENTED BY</h3>
                    <div className="flex flex-wrap gap-5 justify-center items-center">
                        <SponsorCard
                            name="Payworks"
                            image="/img/sponsors/payworks.svg"
                            website="https://payworks.ca/"
                        />
                        <SponsorCard
                            name="G3"
                            image="/img/sponsors/g3-logo.svg"
                            website="https://g3.ca"
                        />
                    </div>
                </div>

                <BlockHeader title="What is this event about?" />
                <div className="flex flex-col gap-6">
                    <p>
                        The Case Competition is an exciting event where teams of students work on
                        real-world business cases and present their solutions to a panel of industry
                        professionals.
                    </p>
                    <p>
                        Students will be placed into teams of five and given a central case provided
                        by either a sponsor or the CSSA. Each team will have up to 6.5 hours to
                        develop the strongest solution they can.
                    </p>
                    <p>
                        The primary focus of the solution should be technical. Teams are not
                        expected to fully implement their ideas. Instead, they should concentrate on
                        clearly explaining the inner workings of their approach.
                    </p>
                    <p>
                        Judges will circulate during the evaluation period to assess each team. The
                        top teams will then move on to a final round of judging, where the winners
                        will be selected.
                    </p>
                </div>
            </div>
        </main>
    );
}
