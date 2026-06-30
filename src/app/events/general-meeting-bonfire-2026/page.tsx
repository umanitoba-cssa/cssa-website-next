import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';

export default function GeneralMeetingBonfire2026() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="Summer General Meeting & Bonfire 2026"
                image="/img/bonfire/2024photos/IMG_1670.jpeg" // pending official image
            />
            <div className="container py-12 flex flex-col gap-12">
                <BlockHeader title="Event Details" />
                <div>
                    <p>🕒 July 13, 2026</p>
                    <p>⏰ Time: Meeting 5:00PM-6:00PM | Bonfire 6:00PM-9:00PM</p>
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
                </div>

                <BlockHeader title="Event Description" />
                <p>Pending official description.</p>
            </div>
        </main>
    );
}
