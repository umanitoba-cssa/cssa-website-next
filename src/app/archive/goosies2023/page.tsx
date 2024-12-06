import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { EventTeaser } from "../../components/EventTeaser/EventTeaser";
import PageHeader from "@/components/page-header";
import { MdOutlineLocationOn } from 'react-icons/md';
import { FaRegClock, FaTshirt } from 'react-icons/fa';

export default function Goosies() {

    return (
        <main className="flex flex-col">
            <PageHeader title="The Goosies 2023" image="/img/backgrounds/home.jpg" />
            <div className="desktop-only container py-8 flex flex-row gap-8">
                <div className="">
                    <Image
                        height="1000"
                        width="1000"
                        src="/img/goosies/goosies2023.png"
                        alt="Goosies Poster for 2023"
                        className="object-cover"
                    />
                </div>
                <div className="">
                    <p>
                        Ready for the "BEST" AWARD show, for the Computer Science community by the Computer Science
                        community? Come join us for this end-of-term event for lots of giggles and fun!
                    </p>
                    <br></br>
                    <p>
                        It's your chance to meet lots of new people and build connections. Have fun with us before the term ends!
                    </p>
                    <br></br>
                    <p>
                        Registration is required so we know how many people to expect and we can be prepared!
                    </p>
                    <br></br>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-row gap-2">
                            <MdOutlineLocationOn size="28px" />
                            <p>VW's Social Club, University of Manitoba</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <FaRegClock size="28px" />
                            <p>Friday April 5th, 2024</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <FaTshirt size="28px" />
                            <p>Semi-Formal Dress</p>
                        </div>
                    </div>
                    <br></br>
                    <p>Voting and Tickets now available! This is an 18+ event, please drink responsibly
                    </p>
                    <div className="flex flex-row gap-4 gap-y-2">
                        <Button size='lg'><Link href='#'>Registration Closed</Link></Button>
                        <br></br>
                        <Button size='lg'><Link href='#'>Voting Closed</Link></Button>
                    </div>
                </div>
            </div>
            <div className="mobile-only container py-8 flex flex-col gap-8">
                <div className="">
                    <Image
                        height="1000"
                        width="1000"
                        src="/img/goosies/goosies2023.png"
                        alt="Goosies Poster for 2023"
                        className="object-cover"
                    />
                </div>
                <div className="">
                    <p>
                        Ready for the "BEST" AWARD show, for the Computer Science community by the Computer Science
                        community? Come join us for this end-of-term event for lots of giggles and fun!
                    </p>
                    <br></br>
                    <p>
                        It's your chance to meet lots of new people and build connections. Have fun with us before the term ends!
                    </p>
                    <br></br>
                    <p>
                        Registration is required so we know how many people to expect and we can be prepared!
                    </p>
                    <br></br>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-row gap-2">
                            <MdOutlineLocationOn size="28px" />
                            <p>VW's Social Club, University of Manitoba</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <FaRegClock size="28px" />
                            <p>Friday April 5th, 2024</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <FaTshirt size="28px" />
                            <p>Semi-Formal Dress</p>
                        </div>
                    </div>
                    <br></br>
                    <p>Voting and Tickets now available! This is an 18+ event, please drink responsibly
                    </p>
                    <div className="flex flex-col gap-4 gap-y-2">
                        <Button size='lg'><Link href='#'>Registration Closed</Link></Button>
                        <br></br>
                        <Button size='lg'><Link href='#'>Voting Closed</Link></Button>
                    </div>
                </div>
            </div>
        </main>
    );
}