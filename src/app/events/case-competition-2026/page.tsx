import BlockHeader from '@/components/block-header';
import Image from 'next/image';

export default function CTF2026() {
    return (
        <main className="flex flex-col bg-[#2b3b74] text-[#ffffff]">
            <div className="w-full bg-[#2b3b74] h-72 sm:h-80 md:h-96 lg:h-[600px] xl:h-[800px] relative">
                <Image
                    src="/img/case-competition/banner-case-comp.png"
                    alt="Case Competition"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="container py-12 flex flex-col gap-12">
                {/* TODO in TECH-138: Update sponsors, add here */}

                <BlockHeader title="Event Details" />
                <div>
                    <p>📅 March 21, 2026</p>
                    <p>🕒 9:00 AM - 7:00 PM</p>
                    <p>📍 TBA, University of Manitoba</p>{' '}
                    {/* TODO in TECH-138: Update with rooms booked */}
                </div>

                <BlockHeader title="What is Case Competition?" />
                <div className="flex flex-col gap-6">
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
                        If time permits, teams are encouraged to create a mock-up by vibe-coding a
                        simple prototype or using a tool like Figma. The priority, however, should
                        be on delivering a clear and compelling presentation rather than ensuring a
                        fully functional product.
                    </p>
                    <p>
                        Judges will circulate during the evaluation period to assess each team. The
                        top teams will then move on to a final round of judging, where the winners
                        will be selected.
                    </p>
                </div>

                <BlockHeader title="How can I register?" />
                <div className="flex flex-col gap-6">
                    <p>
                        You can sign up for the event by joining the Case Competition 2026 Discord
                        server and following the instructions in the <i>#registration</i> channel.
                        Teams are limited up to a maximum of 5 people, but you can also register as
                        an individual and we will help you find a team.
                    </p>
                    <p>
                        <a
                            className="underline"
                            href="https://discord.gg/cSxPQD6VtZ"
                            target="_blank"
                            rel="noreferrer">
                            Join our Discord
                        </a>
                    </p>
                </div>

                <BlockHeader title="Coming Soon" />
                <p>
                    Curious about the sponsors, prizes, and schedule? We&apos;ll let you know soon.
                    We promise it&apos;s worth the wait!
                </p>

                {/* TODO in TECH-138: Add schedule, prizes blockheaders. Remove Coming Soon */}
            </div>
        </main>
    );
}
