import type { WBBoxTariff } from "#services/wbApiService.ts";
import knex from "#postgres/knex.js"
import { parseDecimal } from "#utils/parseUtils.js";
import type { WarehouseTariff } from "#models/WarehouseTariff.js";
import type { Warehouse } from "#models/Warehouse.js";

export async function upsertWarehouses(data: Array<WBBoxTariff>) {
    for (const tariff of data) {
        await knex("warehouses")
            .insert({
                name: tariff.warehouseName,
                geo_name: tariff.geoName,
            })
            .onConflict("name")
            .ignore()
    }
}

export async function updateWarehouseTariffs(date: string, data: Array<WBBoxTariff>) {
    for (const tariff of data) {
        const warehouse = await knex<Warehouse>("warehouses").where({ name: tariff.warehouseName }).first();
        if (!warehouse) continue;

        await knex("warehouse_tariffs")
            .insert({
                date,
                warehouse_id: warehouse.id,

                logistics_base: parseDecimal(tariff.boxDeliveryBase),
                logistics_coef: parseDecimal(tariff.boxDeliveryCoefExpr),
                logistics_liter: parseDecimal(tariff.boxDeliveryLiter),

                storage_base: parseDecimal(tariff.boxStorageBase),
                storage_coef: parseDecimal(tariff.boxStorageCoefExpr),
                storage_liter: parseDecimal(tariff.boxStorageLiter),

                marketplace_base: parseDecimal(tariff.boxDeliveryMarketplaceBase),
                marketplace_coef: parseDecimal(tariff.boxDeliveryMarketplaceCoefExpr),
                marketplace_liter: parseDecimal(tariff.boxDeliveryMarketplaceLiter),
            })
            .onConflict(["warehouse_id", "date"])
            .merge();
    }
}

export async function getTariffsForDate(date: string): Promise<Array<WarehouseTariff & { warehouseName: string, geoName: string }>> {
    return await knex("warehouse_tariffs")
        .join("warehouses", "warehouses.id", "=", "warehouse_tariffs.warehouse_id")
        .select(
            "warehouse_tariffs.*",
            "warehouses.name as warehouseName",
            "warehouses.geo_name as geoName"
        )
        .where("warehouse_tariffs.date", date)
        .orderBy("logistics_coef", "asc");
}

