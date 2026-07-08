import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import Image from 'next/image';

export default function GeneralMeetingBonfire2026() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="Summer General Meeting & Bonfire 2026"
                image="/img/bonfire/2024photos/IMG_1670.jpeg"
            />
            <div className="container py-12 flex flex-col gap-12">
                <BlockHeader title="Event Details" />
                <div>
                    <p>🕒 July 13, 2026</p>
                    <br />
                    <p>⏰ Time: Meeting 5:00PM-6:00PM | Bonfire 6:30PM-9:00PM</p>
                    <br />
                    <p>
                        📍 Meeting @ EITC E2-105, University of Manitoba | Bonfire @{' '}
                        <a
                            className="underline"
                            href="https://maps.app.goo.gl/nCx1UmkqSpEpxrvc9"
                            target="_blank"
                            rel="noreferrer">
                            Whitecastle Park
                        </a>
                    </p>
                    <br />
                    <p>
                        🔗 RSVP{' '}
                        <a
                            className="underline"
                            href="https://docs.google.com/forms/d/1xBKfu6r9TF4Qi70xrobEo_AKXjArAStKF-7MYJAv24c/edit?chromeless=1"
                            target="_blank"
                            rel="noreferrer">
                            Here!
                        </a>
                    </p>
                </div>

                <BlockHeader title="Posters" />
                <div className="flex flex-col lg:flex-row justify-center gap-8">
                    <Image
                        src="/img/bonfire/2026/general-meeting-poster.png"
                        alt="Summer General Meeting Poster 2026"
                        width={400}
                        height={400}
                        className="w-full lg:w-1/2"
                    />
                    <Image
                        src="/img/bonfire/2026/bonfire-poster.png"
                        alt="Bonfire Poster 2026"
                        width={400}
                        height={400}
                        className="w-full lg:w-1/2"
                    />
                </div>
            </div>
        </main>
    );
}
