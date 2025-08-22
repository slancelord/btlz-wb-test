import { google } from "googleapis";
import env from "#config/env/env.js";

const GOOGLE_SHEET_RANGE = env.GOOGLE_SHEET_RANGE
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
});

export const sheets = google.sheets({ version: "v4", auth });


export async function updateSpreadsheet(spreadsheetId: string, data: any[]) {
    const header = [
        "warehouseName",
        "geo_name",
        "logistics_base",
        "logistics_coef",
        "logistics_liter",
        "storage_base",
        "storage_coef",
        "storage_liter",
        "marketplace_base",
        "marketplace_coef",
        "marketplace_liter",
    ];

    const values = [
        header,
        ...data.map((row) => [
            row.warehouseName,
            row.geoName,
            row.logistics_base,
            row.logistics_coef,
            row.logistics_liter,
            row.storage_base,
            row.storage_coef,
            row.storage_liter,
            row.marketplace_base,
            row.marketplace_coef,
            row.marketplace_liter,
        ]),
    ]

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: GOOGLE_SHEET_RANGE,
        valueInputOption: "USER_ENTERED",
        requestBody: {
        values,
        },
    });
}