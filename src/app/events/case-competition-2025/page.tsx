import BlockHeader from '@/components/block-header';
import SponsorCard from '@/components/sponsor-card';
import Image from 'next/image';

export default function CaseComp2025() {
    return (
        <main className="flex flex-col bg-[#2b3b74] text-[#ffffff]">
            <div className="w-full bg-[#2b3b74] h-72 sm:h-80 md:h-96 lg:h-[600px] xl:h-[800px] relative">
                <Image
                    src=""
                    alt="Case Competition 2025"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="container py-12 flex flex-col gap-12">
                <div className="flex flex-col items-center  pb-8">
                    <h3>PRESENTED BY</h3>

                    <div className="flex flex-col items-center gap-5 my-5">
                        <h4>Sponsors</h4>
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
