import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import {} from 'next/navigation';
import Footer from '@/components/footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: "Computer Science Students' Association",
    description:
        'The Computer Science Students’ Association (CSSA) is the official voice and community for computer science students at the University of Manitoba.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="dark bg-cssa-navy">
            <body className={`${inter.className}`}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
