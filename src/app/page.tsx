import BlockHeader from "@/components/block-header";
import PageHeader from "@/components/page-header";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex flex-col">
            <PageHeader title="Home" image="/img/backgrounds/home.jpg" />
            <div className="container py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <BlockHeader title="Who we are" />
                    <p>
                        The Computer Science Students’ Association (CSSA) is the official voice and community
                        for computer science students at the University of Manitoba. We represent the interests
                        and concerns of computer science students to the Computer Science department, the
                        Faculty of Science, university administration and any outside organizations. We organize
                        events and activities for students to network, learn, and have fun. Join us and be part
                        of a vibrant and diverse computer science community!
                    </p>
                </div>

                <div className="flex flex-col gap-8">
                    <BlockHeader title="What we do" />
                    <div className="grid lg:grid-cols-[400px_auto] gap-12 lg:gap-8 items-center">
                        <div className="aspect-3/2 align-middle relative">
                            <Image
                                fill
                                src="/img/teasers/advocacy.jpg"
                                alt="Advocacy"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col place-content-center gap-4">
                            <h4>Advocacy</h4>
                            <p>
                                The CSSA is the official voice of computer science students at the University of
                                Manitoba. We advocate for the interests and concerns of computer science
                                students to the Department of Computer Science, the Faculty of Science, and the
                                university administration. We work to ensure that computer science students have
                                a high-quality education and a positive academic experience. We strive to
                                improve the field by promoting diversity, inclusion, and equity in computing.
                            </p>
                        </div>

                        <div className="aspect-3/2 align-middle relative">
                            <Image
                                fill
                                src="/img/teasers/community.jpg"
                                alt="Advocacy"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col place-content-center gap-4">
                            <h4>Community</h4>
                            <p>
                                We are a community of computer science students who love technology and
                                learning. We help students connect with each other and the industry. We
                                celebrate the diversity and achievements of our community. We also organize
                                events and activities for computer science students to network, where they can
                                build relationships that last beyond their university career. Come join us and
                                visit the computer science lounge!
                            </p>
                        </div>

                        <div className="aspect-3/2 align-middle relative">
                            <Image
                                fill
                                src="/img/teasers/support.jpg"
                                alt="Advocacy"
                                className="object-cover"
                            />
                        </div>
                        <div className="flex flex-col place-content-center gap-4">
                            <h4>Support</h4>
                            <p>
                                Through representation, resources, and opportunities, the CSSA will empower the
                                computer science student community to enhance their academic journey and their
                                careers in the field of computing. We help computer science students with their
                                academic challenges and questions, and also help students with their career
                                plans and choices. We have resources and people who can assist students with
                                their needs and interests.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
