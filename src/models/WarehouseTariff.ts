export interface WarehouseTariff {
  id: number;
  date: string;
  warehouse_id: number;

  logistics_base?: string;
  logistics_coef?: string;
  logistics_liter?: string;

  storage_base?: string;
  storage_coef?: string;
  storage_liter?: string;

  marketplace_base?: string;
  marketplace_coef?: string;
  marketplace_liter?: string;
}