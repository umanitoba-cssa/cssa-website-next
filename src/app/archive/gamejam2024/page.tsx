import BlockHeader from "@/components/block-header";
import EventPageHeader from "@/components/event-page-header";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import SponsorCard from "@/components/sponsor-card";

export default function GameJam() {
    return (
        <main className="flex flex-col bg-cssa-light-blue">
            <EventPageHeader title="Game Jam Logo" image="/img/gamejam/2024/banner.svg"/>
            <div className="container py-12 flex flex-col gap-12">
                <BlockHeader title="Theme"/>
                <p>The theme this year was "Under Pressure" and was voted on during the opening ceremony.</p>
                <BlockHeader title={`Winners & Awards`}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        {id: 1, src: "/img/gamejam/2024/awards/art-design.png", alt: "Best Art Design"},
                        {id: 2, src: "/img/gamejam/2024/awards/sound-design.png", alt: "Best Sound Design"},
                        {
                            id: 3,
                            src: "/img/gamejam/2024/awards/first-time.png",
                            alt: "Best First-Time Game Jam Submission"
                        },
                        {id: 4, src: "/img/gamejam/2024/awards/innovative.png", alt: "Most Innovative"},
                        {id: 5, src: "/img/gamejam/2024/awards/on-theme.png", alt: "Most On Theme"},
                        {id: 6, src: "/img/gamejam/2024/awards/peoples-choice.png", alt: "People's Choice Award"},
                        {id: 7, src: "/img/gamejam/2024/awards/overall.png", alt: "Overall Best Game"},
                    ].map(award => (
                        <div key={award.id} className="relative w-full m-2" style={{aspectRatio: "16/9"}}>
                            <Image src={award.src} fill alt={award.alt} className={`object-contain`}/>
                        </div>
                    ))}
                </div>
                <BlockHeader title="Rules"/>
                <p>Participants must follow our <a className="underline"
                                                   href="https://umanitobacssa.ca/docs/discordTOU.pdf">Discord Terms of
                    Use</a> This includes:</p>
                <ul>
                    <li>- Be respectful of your fellow peers.</li>
                    <li>- No NSFW content or discussion of illegal/questionable content/activities.</li>
                    <li>- Disruptive Behaviour is prohibited.</li>
                    <li>- Racism, sexism, homophobia, transphobia, or other interactions which conform to hate speech
                        are not tolerated.
                    </li>
                    <li>- We ask that you follow those guidelines in person and on the discord.</li>
                </ul>
                <BlockHeader title="Schedule"/>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                        "/img/gamejam/2024/schedule/day1.png",
                        "/img/gamejam/2024/schedule/day2.png",
                        "/img/gamejam/2024/schedule/day3.png",
                    ].map((src, idx) => (
                        <div key={src} className="relative w-full mx-2" style={{aspectRatio: "15/20"}}>
                            <Image src={src} fill alt={`Day ${idx + 1} Schedule`} className="object-contain"/>
                        </div>
                    ))}
                </div>
                <BlockHeader title="Sponsors"/>
                <p>We'd like to thank all our sponsors that allow us to put on events like this for Computer Science
                    students!</p>
                {/**
                 * <h4>Gold Sponsors</h4>
                 *<p>- TBD</p>
                 */}
                <h4>Silver Sponsors</h4>
                <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    <SponsorCard name="Niche" image="/img/gamejam/niche-logo.svg" website="https://nicherms.com"/>
                    <SponsorCard name="Pollard Banknote" image="/img/gamejam/pollard.svg"
                                 website="https://www.pollardbanknote.com"/>
                </div>
                <h4>Bronze Sponsors</h4>
                <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                    <SponsorCard name="G3" image="/img/gamejam/g3-logo.svg" website="https://g3.ca"/>
                    <SponsorCard name="New Media Manitoba" image="/img/gamejam/NMM.svg"
                                 website="https://newmediamanitoba.com"/>
                    <SponsorCard name="Department of Computer Science" image="/img/gamejam/UMDeptCS.svg"
                                 website="https://umanitoba.ca/science/computer-science"/>
                </div>
                <BlockHeader title="Resources"/>
                <ul>
                    <li>- <a className="underline" href="https://itch.io/game-development/engines/most-projects">Most
                        used game engines</a> - This resource is there to help you see what other projects are being
                        developed in.
                    </li>
                    <li>- <a className="underline" href="https://toolsntechniques.ca/topic03/topic-3.html">The Comp1002
                        basic Git guide</a> and <a className="underline"
                                                   href="https://toolsntechniques.ca/topic04/topic-2.html">advanced Git
                        guide</a> - These were created to support Comp1002 but they could also be useful in quickly
                        going over Git.
                    </li>
                </ul>
                <BlockHeader title="Registration"/>
                <p>Please register by joining our <a className="underline"
                                                     href="https://discord.umanitobacssa.ca/gamejam">discord</a> and
                    following the instructions in <i>#welcome</i> <br/>
                    <br/>
                    Teams are recommended to be a team of 4 participants (not everyone needs to be a coder). 6 team
                    members maximum. All users should register on the discord. Only <b>ONE</b> user needs to submit
                    their project to this page. You may also register solo.<br/>
                    <br/>
                    We are providing a Git repo for all teams that want it (it will be created automatically) and are
                    recommending that groups use it, but it is not required.
                    To ensure that you are all set up for the jam we recommend that you have:</p>
                <ul>
                    <li>- <a className="underline" href="https://itch.io">Itch.io</a> account if you are leading a team
                    </li>
                    <li>- <a className="underline" href="https://github.com">GitHub</a> account for code management.
                    </li>
                    <li>- <a className="underline" href="https://git-scm.com/downloads">Git</a> installed.</li>
                    <li>- <a className="underline" href="https://cli.github.com">GitHub CLI</a> installed (unless you
                        are comfortable with Git and SSH key based authentication for pulling/pushing to GitHub).
                    </li>
                </ul>
                <p>If you do not have a team, you can look for a team in the <i>#looking-for-a-team</i> channel in the
                    server to find a team.</p>
                <div className="grid grid-cols-1 text-center table-auto gap-8">
                    <a href="https://itch.io/jam/cssa-game-jam-2024"><Button className="w-full" variant="default"
                                                                             size="lg">Itch.io Page for CSSA Game Jam
                        2024</Button></a>
                </div>
            </div>
        </main>
    );
}
