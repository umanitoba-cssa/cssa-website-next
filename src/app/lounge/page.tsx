import { getLoungeMenu } from '@/api/sheets';
import BlockHeader from '@/components/block-header';
import PageHeader from '@/components/page-header';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export default async function Lounge() {
    const menu = await getLoungeMenu();

    const menuItems = Object.keys(menu).map((category) => {
        const rows = menu[category].map((item) => {
            return (
                <TableRow key={item.Item}>
                    <TableCell>{item.Item}</TableCell>
                    <TableCell className="text-right">{item.Price}</TableCell>
                </TableRow>
            );
        });

        return (
            <div
                className="flex flex-col"
                key={category}>
                <h4>{category}</h4>
                <Table>
                    <TableBody>{rows}</TableBody>
                </Table>
            </div>
        );
    });

    return (
        <main className="flex flex-col">
            <PageHeader
                title="Lounge"
                image="/img/backgrounds/lounge.jpg"
            />
            <div className="container py-12 flex flex-col gap-12">
                <div className="flex flex-col gap-8">
                    <BlockHeader title="Lounge Location" />
                    <p>You can find our lounge at EITC E1-586.</p>
                    <div className="aspect-video w-full">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube-nocookie.com/embed/Eek6S5fP5sg?mute=1"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <BlockHeader title="Lounge Canteen Menu" />
                    <div className="flex flex-col gap-8">{menuItems}</div>
                </div>
            </div>
        </main>
    );
}
