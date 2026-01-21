import BlockHeader from '@/components/block-header';
import EventPageHeader from '@/components/event-page-header';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import SponsorCard from '@/components/sponsor-card';

export default function GameJam2025() {
    return (
        <main className="flex flex-col bg-[#84a2ce] text-[#0C1118]">
            <EventPageHeader
                alt="Game Jam Logo"
                image="/img/game-jam/gj_banner.svg"
            />
            <div className="container py-12 flex flex-col gap-12">
                <BlockHeader title="Theme" />
                <p>This years theme is &quot;Evolution&quot;!</p>
                <BlockHeader title="Rules" />
                <p>
                    Participants must follow our{' '}
                    <a
                        className="underline"
                        href="https://umanitobacssa.ca/docs/discordTOU.pdf"
                        target="_blank"
                        rel="noreferrer">
                        Discord Terms of Use
                    </a>{' '}
                    This includes:
                </p>
                <ul>
                    <li>- Be respectful of your fellow peers.</li>
                    <li>
                        - No NSFW content or discussion of illegal/questionable content/activities.
                    </li>
                    <li>- Disruptive Behaviour is prohibited.</li>
                    <li>
                        - Racism, sexism, homophobia, transphobia, or other interactions which
                        conform to hate speech are not tolerated.
                    </li>
                    <li>- We ask that you follow those guidelines in person and on the discord.</li>
                </ul>
                <BlockHeader title="Event Details" />
                <p> Location: EITC Atrium and EITC E3-270</p>
                <p> Date/Time: November 28th, 2025 @ 5pm to November 30th, 2025 @ 1pm</p>
                <BlockHeader title="Schedule" />
                <div className="flex justify-center">
                    <Image
                        src="/img/game-jam/schedule.png"
                        alt="Game Jam 2025 Schedule"
                        width={400}
                        height={400}
                        className="w-full lg:w-1/2"
                    />
                </div>
                <BlockHeader title="Sponsors" />
                <p>
                    We&apos;d like to thank all our sponsors that allow us to put on events like
                    this for Computer Science students!
                </p>
                <div className="flex flex-wrap gap-5 justify-center">
                    <SponsorCard
                        name="Ubisoft"
                        image="/img/sponsors/ubisoft-logo.svg"
                        website="https://winnipeg.ubisoft.com/"
                    />
                    <SponsorCard
                        name="G3"
                        image="/img/sponsors/g3-logo.svg"
                        website="https://g3.ca"
                    />
                    <SponsorCard
                        name="Niche"
                        image="/img/sponsors/niche-logo.svg"
                        website="https://nicherms.com"
                    />
                </div>
                <div className="flex gap-5" />
                <BlockHeader title="Award Categories" />
                <div className="flex justify-center">
                    <Image
                        src="/img/game-jam/award-categories.png"
                        alt="Game Jam 2025 Award Categories"
                        width={400}
                        height={400}
                        className="w-full lg:w-1/2"
                    />
                </div>
                <BlockHeader title="Resources" />
                <ul>
                    <li>
                        -{' '}
                        <a
                            rel="noreferrer"
                            className="underline"
                            href="https://itch.io/game-development/engines/most-projects">
                            Most used game engines
                        </a>{' '}
                        - This resource is there to help you see what other projects are being
                        developed in.
                    </li>
                    <li>
                        -{' '}
                        <a
                            rel="noreferrer"
                            className="underline"
                            href="https://toolsntechniques.ca/topic03/topic-3.html">
                            The Comp1002 basic Git guide
                        </a>{' '}
                        and{' '}
                        <a
                            rel="noreferrer"
                            className="underline"
                            href="https://toolsntechniques.ca/topic04/topic-2.html">
                            advanced Git guide
                        </a>{' '}
                        - These were created to support Comp1002 but they could also be useful in
                        quickly going over Git.
                    </li>
                </ul>
                <BlockHeader title="Registration" />
                <p>
                    Please register by joining our{' '}
                    <a
                        rel="noreferrer"
                        className="underline"
                        href="https://discord.umanitobacssa.ca/gamejam">
                        discord
                    </a>{' '}
                    and following the instructions in <i>#welcome</i> <br />
                    <br />
                    Teams are recommended to be a team of 4 participants (not everyone needs to be a
                    coder). 5 team members maximum. All users should register on the discord. Only{' '}
                    <b>ONE</b> user needs to submit their project to this page. You may also
                    register solo.
                    <br />
                    <br />
                    To ensure that you are all set up for the jam we recommend that you have:
                </p>
                <ul>
                    <li>
                        -{' '}
                        <a
                            rel="noreferrer"
                            className="underline"
                            href="https://itch.io">
                            Itch.io
                        </a>{' '}
                        account if you are leading a team
                    </li>
                </ul>
                <p>
                    If you do not have a team, you can look for a team in the{' '}
                    <i>#looking-for-a-team</i> channel in the server to find a team.
                </p>
                <div
                    rel="noreferrer"
                    className="grid grid-cols-2 text-center table-auto gap-8">
                    <a href="https://discord.umanitobacssa.ca/gamejam">
                        <Button
                            className="w-full"
                            variant="default"
                            size="lg">
                            Join the Discord
                        </Button>
                    </a>{' '}
                    <a
                        rel="noreferrer"
                        href="https://itch.io/jam/cssa-game-jam-2025">
                        <Button
                            className="w-full"
                            variant="default"
                            size="lg">
                            Itch.io Page
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    );
}
