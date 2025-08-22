import axios from "axios";
import env from "#config/env/env.js";

const WB_API_KEY = env.WB_API_KEY;

export interface WBBoxTariff {
    boxDeliveryBase: string;
    boxDeliveryCoefExpr: string;
    boxDeliveryLiter: string;
    boxDeliveryMarketplaceBase: string;
    boxDeliveryMarketplaceCoefExpr: string;
    boxDeliveryMarketplaceLiter: string;
    boxStorageBase: string;
    boxStorageCoefExpr: string;
    boxStorageLiter: string;
    geoName: string;
    warehouseName: string;
}

export interface WBBoxTariffsData {
    dtNextBox: string;
    dtTillMax: string;
    warehouseList: Array<WBBoxTariff>;
}

export async function getWBBoxTariffs(date: string): Promise<WBBoxTariffsData | null> {
    if (!WB_API_KEY) {
        console.error("WB_API_KEY is not set");
        return null;
    }

    try {
        const response = await axios.get<{response: {data: WBBoxTariffsData}}>("https://common-api.wildberries.ru/api/v1/tariffs/box", {
            params: { 
                date 
            },
            headers: {
                Authorization: `Bearer ${WB_API_KEY}`,
            }
          }
        );

        return response.data.response.data;
    } catch (error: any) {
        console.error("WB API request failed:", error.response?.data || error.message);
        return null;
    }
}