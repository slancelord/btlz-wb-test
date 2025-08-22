/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "1mpwizxy7Dg9VlmN0w4ALHWvjnhQIFu6bi7L9Jn8SqQs" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
