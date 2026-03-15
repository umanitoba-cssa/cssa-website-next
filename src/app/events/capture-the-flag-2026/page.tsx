import BlockHeader from '@/components/block-header';
import Image from 'next/image';
import PageHeader from '@/components/page-header';
import SponsorCard from '@/components/sponsor-card';

export default function CTF2026() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="Capture The Flag 2026"
                image="/img/capture-the-flag/2026photos/IMG_1320.JPG"
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
                <div>
                    <p>🕒 February 7, 2026, 8:00AM-5:30PM</p>
                    <p>📍 E3-270, E2-150, University of Manitoba</p>
                </div>

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

                <BlockHeader title="Prizes" />
                <div className="flex flex-wrap flex-col justify-center gap-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-[#1f3a70] text-white rounded-full px-6 py-3">
                            <p className="font-semibold">First place: $200</p>
                        </div>
                        <div className="bg-[#1f3a70] text-white rounded-full px-6 py-3">
                            <p className="font-semibold">Second place: $125</p>
                        </div>
                        <div className="bg-[#1f3a70] text-white rounded-full px-6 py-3">
                            <p className="font-semibold">Third place: $75</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="bg-[#1f3a70] text-white rounded-full px-6 py-3">
                            <p className="font-semibold text-sm">Best First Time Team: $50</p>
                        </div>
                        <div className="bg-[#1f3a70] text-white rounded-full px-6 py-3">
                            <p className="font-semibold text-sm">
                                Best Woman and Gender Minority Team: $50
                            </p>
                        </div>
                    </div>
                </div>

                <BlockHeader title="Award Winners" />
                <div className="flex flex-wrap justify-center gap-4">
                    {[
                        {
                            id: 1,
                            src: '/img/capture-the-flag/2026photos/awards/first-place.jpg',
                            alt: 'First Place',
                        },
                        {
                            id: 2,
                            src: '/img/capture-the-flag/2026photos/awards/second-place.jpg',
                            alt: 'Second Place',
                        },
                        {
                            id: 3,
                            src: '/img/capture-the-flag/2026photos/awards/third-place.jpg',
                            alt: 'Third Place',
                        },
                        {
                            id: 4,
                            src: '/img/capture-the-flag/2026photos/awards/best-first-time.jpg',
                            alt: 'Best First Time Team',
                        },
                        {
                            id: 5,
                            src: '/img/capture-the-flag/2026photos/awards/best-gender-minority.jpg',
                            alt: 'Best Woman and Gender Minority Team',
                        },
                    ].map((award) => (
                        <div
                            key={award.id}
                            className="flex flex-col items-center"
                            style={{ width: '400px' }}>
                            <div
                                className="relative w-full"
                                style={{ aspectRatio: '16/9' }}>
                                <Image
                                    src={award.src}
                                    fill
                                    alt={award.alt}
                                    className={`object-contain`}
                                />
                            </div>
                            <p className="mt-2 text-center">{award.alt}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
