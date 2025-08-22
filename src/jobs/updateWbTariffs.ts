import cron from "node-cron";
import knex from "#postgres/knex.js"
import { getWBBoxTariffs } from "#services/wbApiService.js";
import { updateWarehouseTariffs, upsertWarehouses, getTariffsForDate } from "#services/tariffsService.js";
import { updateSpreadsheet } from "#services/googleService.js";
import type { Spreadsheet } from "#models/Spreadsheet.js";

export function scheduleWBTariffsJob() {
    cron.schedule("* * * * *", async () => {
        console.log("Update WB Tariffs job started:", new Date().toISOString());

        const today = new Date().toISOString().slice(0, 10);
        const data = await getWBBoxTariffs(today);

        if (!data) {
            console.error("No data received from WB API");
            return
        }

        await upsertWarehouses(data.warehouseList);
        await updateWarehouseTariffs(today, data.warehouseList);
    
        const tariffs = await getTariffsForDate(today)
        const spreadsheets = await knex<Spreadsheet>("spreadsheets").select("spreadsheet_id");
        for (const sheet of spreadsheets) {
            await updateSpreadsheet(sheet.spreadsheet_id, tariffs);
        }
    
        console.log("Update WB Tariffs job done");
    });
}