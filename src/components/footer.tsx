import { BsFillEnvelopeFill } from 'react-icons/bs';
import { FaDiscord, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className="flex flex-col container gap-4 place-items-center py-4 text-sm border-t border-t-gray-400">
            <div className="flex flex-row flex-wrap gap-4 place-items-center justify-evenly">
                <div className="flex flex-row gap-2 place-items-center">
                    <FaDiscord className="w-8 h-8" />
                    <a
                        rel="noreferrer"
                        className="hover:underline"
                        href="https://discord.umanitobacssa.ca/"
                    >
                        Join us on Discord
                    </a>
                </div>
                <div className="flex flex-row gap-2 place-items-center">
                    <FaInstagram className="w-8 h-8" />
                    <a
                        rel="noreferrer"
                        className="hover:underline"
                        href="https://instagram.com/umanitobacssa"
                    >
                        @umanitobacssa
                    </a>
                </div>
                <div className="flex flex-row gap-2 place-items-center">
                    <BsFillEnvelopeFill className="w-8 h-8" />
                    <a rel="noreferrer" className="hover:underline" href="mailto:cssa@umanitoba.ca">
                        cssa@umanitoba.ca
                    </a>
                </div>
                <div className="flex flex-row gap-2 place-items-center">
                    <FaGithub className="w-8 h-8" />
                    <a
                        rel="noreferrer"
                        className="hover:underline"
                        href="https://github.com/umanitoba-cssa/"
                    >
                        @umanitoba-cssa
                    </a>
                </div>
            </div>
            <div className="flex flex-row gap-4 place-items-center text-center">
                © Copyright 2023 - 2025 Computer Science Students' Association
            </div>
            <div className="text-center">
                This work is licensed under a{' '}
                <a
                    rel="noreferrer"
                    className="hover:underline"
                    href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                >
                    Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License
                </a>
            </div>
        </div>
    );
}
