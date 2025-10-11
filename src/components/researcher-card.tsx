import { IResearcher } from "@/data/researchers";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ResearcherCard(
    profile: IResearcher,
) {
    return (
        <motion.div
            layoutId={`card-${profile.fullName}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            role="button"
            tabIndex={0}
            onClick={() => {}}
            onKeyDown={(e) => {
                // if (e.key === "Enter" || e.key === " ") onClick?.();
            }}
            className="flex flex-row border-solid border border-amber-400 rounded-xl items-center p-4 gap-4 min-w-[25rem] max-w-[25rem] cursor-pointer"
        >
            <div>
                <Image src={profile?.image} alt={profile?.fullName} width={100} height={200} className="rounded-full" />
            </div>
            <div>
                <div className="text-xl font-bold">
                    {profile?.fullName}
                </div>
                <div className="flex flex-col gap-2 mt-1">
                    {profile?.acceptingStudents && 
                        <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20">
                            Accepting Student Researcher(s)
                        </span>
                    }
                    {profile?.lab && 
                        <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20">
                            {profile?.lab?.name}
                        </span>
                    }
                </div>
                
                <div>
                    <div className="font-semibold mt-2">
                        Research Interests
                    </div>
                    <ul className=" list-disc list-inside">
                        {profile?.researchInterests.map((interest, index) => (
                            <li key={index} className="text-sm">
                                {interest}
                                {/* TODO: Make it disappear with ... */}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <div className="font-semibold mt-2">
                        Current Research Topic
                        {profile?.researchTopic &&
                        <ul className=" list-disc list-inside">
                            <li className="text-sm">
                                {profile?.researchTopic}
                            </li>
                        </ul>
                        }
                    </div>
                </div>  
            </div>
        </motion.div>
    );
}