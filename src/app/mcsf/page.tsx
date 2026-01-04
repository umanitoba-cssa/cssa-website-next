import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';

export default function Home() {
    return (
        <main className="flex flex-col">
            <PageHeader
                title="Manitoba Computer Science Fund"
                image="/img/backgrounds/home.jpg"
            />
            <div className="container py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <BlockHeader title="What is it?" />
                    <p>
                        The Manitoba Computer Science Fund (MCSF) is a student-run non-profit
                        organization with the goals of supporting initiatives, clubs, or projects
                        that promote or support computer science, and to provide fundraising,
                        sponsorship, and financial management in support of these initiatives at the
                        University of Manitoba.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <BlockHeader title="How does it work?" />
                    <p>
                        The MCSF is composed of two club executives from each of the member clubs,
                        additionally there is an advisor and a treasurer. This group comes together
                        to vote on financial decisions, bylaws, sponsorship requests, and budget
                        allocation.
                    </p>
                </div>
            </div>
        </main>
    );
}
