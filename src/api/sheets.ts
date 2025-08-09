import { groupBy } from "@/lib/data";
import { Auth, sheets_v4 as Sheets } from "googleapis";

interface ICanteenItem {
    Item: string;
    Price: string;
    Category: string;
}

export async function getSheetsCells(sheetId: string, range: string) {
    const auth = new Auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        credentials: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }
    });

    const sheets = new Sheets.Sheets({ auth });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
    });

    return response.data.values;
}

export async function getLoungeMenu() {
    if (!process.env.CANTEEN_SHEEET_ID) {
        throw new Error("Missing environment variable CANTEEN_SHEEET_ID");
    }

    const data = await getSheetsCells(process.env.CANTEEN_SHEEET_ID, "'Website CSV Export'!A:C");

    if (!data) {
        throw new Error("Failed to fetch canteen data");
    }

    const objects: ICanteenItem[] = data.slice(1).map((row) => ({
        Item: row[0],
        Price: row[1],
        Category: row[2],
    }));

    const grouped = groupBy(objects, (item) => item.Category);

    return grouped
}