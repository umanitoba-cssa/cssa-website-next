import PageHeader from '@/components/page-header';
import BlockHeader from '@/components/block-header';
import { Button } from '@/components/ui/button';

export default function Elections() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="CSSA Elections 2026"
                image="/img/backgrounds/home.jpg"
            />
            <div className="container py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <BlockHeader title="Election Information" />
                    <a
                        href={`https://docs.google.com/document/d/1f4LfCH8aRxPPb0OgNE_2stsrRsJYH7hd/edit`}>
                        <Button
                            className="w-full"
                            variant="default"
                            size="lg">
                            Election Package
                        </Button>
                    </a>
                    <a
                        href={`https://github.com/umanitoba-cssa/constitution/blob/main/Constitution.md`}>
                        <Button
                            className="w-full"
                            variant="default"
                            size="lg">
                            CSSA Constitution
                        </Button>
                    </a>
                </div>
                <div className="flex flex-col gap-4">
                    <BlockHeader title="Election Dates" />
                    <ul className="pl-5 flex flex-col gap-2 list-none">
                        <li>
                            <strong>Nomination Period:</strong> Monday, March 2 - Sunday, March 8
                        </li>
                        <li>
                            <strong>All-Candidates Meeting:</strong> Monday, March 9, 6 PM
                        </li>
                        <li>
                            <strong>Campaigning Period:</strong> Tuesday, March 10 - Sunday, March
                            22
                        </li>
                        <li>
                            <strong>Candidate Forum:</strong> Tuesday, March 17, 6 PM
                        </li>
                        <li>
                            <strong>Voting Period:</strong> Monday, March 23 - Wednesday, March 25
                        </li>
                        <li>
                            <strong>Results Announced:</strong> Thursday, March 27
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <BlockHeader title="How to nominate yourself for a position?" />
                    <p>
                        Please email our CRO (email can be found in the election package) with the
                        following heading <strong>[CSSA Election]</strong>.
                    </p>
                    <p>In the body of the email, please include:</p>
                    <ul className="list-disc pl-10">
                        <li>Your name</li>
                        <li>The position you are running for</li>
                        <li>That you have read the election package</li>
                        <li>That you agree to all the rules/guidelines in the package</li>
                    </ul>
                    <p>
                        <i>All campaign volunteers must be cleared with the CRO.</i>
                    </p>
                </div>
            </div>
        </main>
    );
}
