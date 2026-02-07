import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import SponsorCard from '@/components/sponsor-card';

export default function CTF2026() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="Capture The Flag 2026"
                image="/img/capture-the-flag/2025photos/IMG_0818.jpeg"
            />
            <div className="container py-12 flex flex-col gap-12">
                <hr className="border-t-4 border-cssa-gold" />
                <div className="flex flex-col items-center gap-5">
                    <h3>PRESENTED BY</h3>
                    <div className="flex flex-wrap gap-5 justify-center items-center">
                        <SponsorCard
                            name="GlitchSecure"
                            image="/img/sponsors/glitchsecure.svg"
                            website="https://glitchsecure.com/"
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
                </div>

                <BlockHeader title="Event Details" />
                <p>🕒 February 7, 2026, 8:00AM-5:30PM</p>
                <p>📍 E3-270, E2-150, University of Manitoba</p>

                <BlockHeader title="What is Capture The Flag Competition?" />
                <p>
                    If you&apos;ve never participated in a CTF before, it&apos;s a fun competition
                    where you can engage in solving various computer science and cybersecurity
                    challenges. Your goal is to find secret flags hidden within code, applications
                    or networks. By solving puzzles and exploiting vulnerabilities, you&apos;ll earn
                    points, and there are big prizes for the top scoring teams! It&apos;s a great
                    way to learn about binary & web exploitation, reverse engineering, digital
                    forensics and programming. Our competition is designed to cater to all skill
                    levels, so whether you&apos;re a seasoned pro or a total beginner, there&apos;s
                    something for everyone.
                </p>

                <BlockHeader title="How can I register?" />
                <p>
                    You can sign up for an account here to be able to log your progress once the CTF
                    starts. Teams are limited up to a maximum of 5 people. You can also join the CTF
                    discord to be kept up to date on announcements about the CTF and connect with
                    other people that may be looking for teams.
                </p>
                <p>
                    {' '}
                    <a
                        className="underline"
                        href="https://discord.gg/aQphKK9EyE"
                        target="_blank"
                        rel="noreferrer">
                        Join our Discord
                    </a>
                </p>

                <BlockHeader title="Schedule" />
                <p>More details to come!</p>

                <BlockHeader title="Prize(s)" />
                <p>More details to come!</p>
            </div>
        </main>
    );
}
