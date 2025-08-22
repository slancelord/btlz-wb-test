import knex, { migrate, seed } from "#postgres/knex.js";
import express from "express";
import { scheduleWBTariffsJob } from "#jobs/updateWbTariffs.js"

const app = express();
const PORT = process.env.APP_PORT || 5000;

await migrate.latest();
await seed.run();

console.log("All migrations and seeds have been run");

scheduleWBTariffsJob();

app.get("/", (req, res) => res.send("WB Tariffs service is running"));
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});