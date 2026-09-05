import { groupBy } from '@/lib/data';
import { Auth, sheets_v4 as Sheets } from 'googleapis';

interface ICanteenItem {
    Item: string;
    Price: string;
    Category: string;
}

export async function getSheetsCells(sheetId: string, range: string) {
    const PROD_ENV = process.env.NODE_ENV === 'production' && process.env.LOCAL_DEV !== 'true';
    // If credentials are missing, skip calling Google Sheets
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        const msg = 'Missing Google service account credentials';
        if (PROD_ENV) throw new Error(msg);
        console.warn(msg + '; skipping Sheets API');
        return null;
    }

    const auth = new Auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        credentials: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
    });

    const sheets = new Sheets.Sheets({ auth });

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: range,
    });

    return response.data.values;
}

export async function getLoungeMenu() {
    const PROD_ENV = process.env.NODE_ENV === 'production' && process.env.LOCAL_DEV !== 'true';
    if (!process.env.CANTEEN_SHEEET_ID) {
        const msg = 'Missing environment variable CANTEEN_SHEEET_ID';
        if (PROD_ENV) throw new Error(msg);
        console.warn(msg + '; returning empty menu');
        return {} as Record<string, ICanteenItem[]>;
    }

    const data = await getSheetsCells(process.env.CANTEEN_SHEEET_ID, "'Website CSV Export'!A:C");

    if (!data) {
        const msg = 'Failed to fetch canteen data';
        if (PROD_ENV) throw new Error(msg);
        console.warn(msg + '; returning empty menu');
        return {} as Record<string, ICanteenItem[]>;
    }

    const objects: ICanteenItem[] = data.slice(1).map((row) => ({
        Item: row[0],
        Price: row[1],
        Category: row[2],
    }));

    const grouped = groupBy(objects, (item) => item.Category);

    return grouped;
}
