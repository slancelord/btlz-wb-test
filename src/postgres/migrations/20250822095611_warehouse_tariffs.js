/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("warehouse_tariffs", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();
        table.integer("warehouse_id")
            .notNullable()
            .references("id")
            .inTable("warehouses")
            .onDelete("CASCADE");

        table.decimal("logistics_base");
        table.decimal("logistics_coef");
        table.decimal("logistics_liter");

        table.decimal("storage_base");
        table.decimal("storage_coef");
        table.decimal("storage_liter");

        table.decimal("marketplace_base");
        table.decimal("marketplace_coef");
        table.decimal("marketplace_liter");

        table.unique(["warehouse_id", "date"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("warehouse_tariffs");
}
