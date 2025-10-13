import { IResearcher } from "@/data/researchers";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ResearcherCard({
    profile, 
    onClick
}: {
    profile: IResearcher, 
    onClick?: () => void
}) {
    return (
        <motion.div
            layoutId={`card-${profile.fullName}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick?.();
            }}
            className="flex w-full border-solid border border-amber-400 rounded-xl items-start p-4 gap-4 max-w-[27rem] cursor-pointer"
        >
            <div className="w-2/5 relative h-full">
            <Image
                src={profile?.image}
                alt={profile?.fullName}
                fill
                className="object-cover object-center rounded-xl"
            />
            </div>
            <div className="w-3/5 flex flex-col h-full">
                <div className="text-xl font-bold">
                    {profile?.fullName}
                </div>

                <div className="flex flex-col gap-2 mt-1 w-fit">
                    {profile?.acceptingStudents && (
                    <span className="inline-flex items-center w-fit rounded-md bg-lime-700 px-2 py-1 text-xs font-medium text-white">
                        Accepting Student Researcher(s)
                    </span>
                    )}
                    {profile?.lab && (
                    <span className="inline-flex items-center w-fit rounded-md bg-yellow-900 px-2 py-1 text-xs font-medium text-white">
                        {profile?.lab?.name}
                    </span>
                    )}
                </div>

                <div className="font-semibold mt-2">Research Interests</div>
                <ul className="space-y-1">
                    {profile?.researchInterests.map((interest, index) => (
                    <li
                        key={index}
                        className="relative pl-4 text-sm line-clamp-1 before:content-['•'] before:absolute before:left-0 before:text-white"
                    >
                        {interest}
                    </li>
                    ))}
                </ul>

                <div className="font-semibold mt-2">Current Research Topic</div>
                {profile?.researchTopic && (
                    <ul className="space-y-1">
                    <li className="relative pl-4 text-sm line-clamp-2 before:content-['•'] before:absolute before:left-0 before:text-white">
                        {profile?.researchTopic}
                    </li>
                    </ul>
                )}
                <div className="mt-auto pt-2 text-sm text-gray-500 font-medium text-right gap-1 flex justify-end">
                    <span>View Researcher</span>
                    <span>→</span>
                </div>
            </div>
        </motion.div>
    );
}