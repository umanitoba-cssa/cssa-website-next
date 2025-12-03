import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import Image from 'next/image';
import { Teasers } from '@/data/teasers';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Home() {
    return (
        <main className="flex flex-col">
            <PageHeader title="Home" image="/img/backgrounds/home.jpg" />
            <div className="container py-8 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <BlockHeader title="Who we are" />
                    <p>
                        The Computer Science Students’ Association (CSSA) is the official voice and
                        community for computer science students at the University of Manitoba. We
                        represent the interests and concerns of computer science students to the
                        Computer Science department, the Faculty of Science, university
                        administration and any outside organizations. We organize events and
                        activities for students to network, learn, and have fun. Join us and be part
                        of a vibrant and diverse computer science community!
                    </p>
                </div>

                {/* What we do */}
                <div className="flex flex-col gap-8">
                    <BlockHeader title="What we do" />
                    <div className="grid lg:grid-cols-[400px_auto] gap-12 lg:gap-8 items-center">
                        {Teasers.filter((item) => item.section === 'What we do').map((item) => (
                            <Fragment key={item.title}>
                                <div className="aspect-3/2 align-middle relative">
                                    <Image
                                        fill
                                        src={item.src}
                                        alt={item.title}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col place-content-center gap-4">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    {item.href && (
                                        <Link href={item.href}>
                                            <div className="flex">
                                                <span className="text-sm text-primary hover:underline">
                                                    {' '}
                                                    {item.linkText}{' '}
                                                </span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>

                {/* How we support */}
                <div className="flex flex-col gap-8">
                    <BlockHeader title="How we support" />
                    <div className="grid lg:grid-cols-[400px_auto] gap-12 lg:gap-8 items-center">
                        {Teasers.filter((item) => item.section === 'How we support').map((item) => (
                            <Fragment key={item.title}>
                                <div className="aspect-3/2 align-middle relative">
                                    <Image
                                        fill
                                        src={item.src}
                                        alt={item.title}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col place-content-center gap-4">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    {item.href && (
                                        <Link href={item.href}>
                                            <div className="flex">
                                                <span className="text-sm text-primary hover:underline">
                                                    {' '}
                                                    {item.linkText}{' '}
                                                </span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
