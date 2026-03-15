import BlockHeader from '@/components/block-header';
import SponsorCard from '@/components/sponsor-card';
import Image from 'next/image';

export default function CTF2026() {
    return (
        <main className="flex flex-col bg-[#2b3b74] text-[#ffffff]">
            <div className="w-full bg-[#2b3b74] h-72 sm:h-80 md:h-96 lg:h-[600px] xl:h-[800px] relative">
                <Image
                    src="/img/case-competition/banner.png"
                    alt="Case Competition"
                    fill
                    className="object-contain"
                />
            </div>

            <div className="container py-12 flex flex-col gap-12">
                <div className="flex flex-col items-center  pb-8">
                    <h3>PRESENTED BY</h3>

                    <div className="flex flex-col items-center gap-5 my-5">
                        <h4>Gold Sponsors</h4>
                        <div className="flex flex-wrap gap-5 justify-center items-center">
                            <SponsorCard
                                name="Payworks"
                                image="/img/sponsors/payworks.svg"
                                website="https://payworks.ca/"
                            />
                            <SponsorCard
                                name="Science Students' Association"
                                image="/img/sponsors/ssa.svg"
                                website="https://www.umanitobassa.com/"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-5">
                        <h4 className="pt-10">Silver Sponsors</h4>
                        <div className="flex flex-wrap gap-12 justify-center items-center">
                            <SponsorCard
                                name="Department of Computer Science"
                                image="/img/sponsors/UMDeptCS.svg"
                                website="https://umanitoba.ca/science/computer-science"
                            />
                            <SponsorCard
                                name="G3"
                                image="/img/sponsors/g3-logo.svg"
                                website="https://g3.ca"
                            />
                        </div>
                    </div>
                </div>

                <BlockHeader title="Event Details" />
                <div>
                    <p>📅 March 21, 2026</p>
                    <p>🕒 9:00 AM - 7:00 PM</p>
                    <p>📍 EITC Atrium, University of Manitoba</p>
                </div>

                <BlockHeader title="What is this event about?" />
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
                        You can sign up for the event by joining the Design & Craft 2026 Discord
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

                <BlockHeader title="Schedule" />
                <div className="w-full overflow-hidden rounded-xl">
                    <table className="w-full">
                        <tbody>
                            <tr className="bg-[#384b89]">
                                <td className="px-4 py-3">8:30 AM</td>
                                <td className="px-4 py-3">Registration starts</td>
                            </tr>
                            <tr className="bg-[#1f2d5a]">
                                <td className="px-4 py-3">9:00 AM</td>
                                <td className="px-4 py-3">Opening ceremony</td>
                            </tr>
                            <tr className="bg-[#384b89]">
                                <td className="px-4 py-3">9:15 AM</td>
                                <td className="px-4 py-3">Sprint starts</td>
                            </tr>
                            <tr className="bg-[#1f2d5a]">
                                <td className="px-4 py-3">12:00 PM</td>
                                <td className="px-4 py-3">Lunch</td>
                            </tr>
                            <tr className="bg-[#384b89]">
                                <td className="px-4 py-3">3:15 PM</td>
                                <td className="px-4 py-3">Sprint ends</td>
                            </tr>
                            <tr className="bg-[#1f2d5a]">
                                <td className="px-4 py-3">3:30 PM</td>
                                <td className="px-4 py-3">Initial round of judging starts</td>
                            </tr>
                            <tr className="bg-[#384b89]">
                                <td className="px-4 py-3">5:00 PM</td>
                                <td className="px-4 py-3">Dinner</td>
                            </tr>
                            <tr className="bg-[#1f2d5a]">
                                <td className="px-4 py-3">5:30 PM</td>
                                <td className="px-4 py-3">Final round of judging starts</td>
                            </tr>
                            <tr className="bg-[#384b89]">
                                <td className="px-4 py-3">6:45 PM</td>
                                <td className="px-4 py-3">Judging ends</td>
                            </tr>
                            <tr className="bg-[#1f2d5a]">
                                <td className="px-4 py-3">7:00 PM</td>
                                <td className="px-4 py-3">Closing ceremony</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <BlockHeader title="Prizes" />
                <p>To be revealed at the event!</p>
            </div>
        </main>
    );
}
