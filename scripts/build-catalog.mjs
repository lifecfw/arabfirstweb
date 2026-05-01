#!/usr/bin/env node
// Builds bot/catalog.json from the website datasets so the bot has an
// authoritative copy of car/house prices (the website is never trusted to
// tell the bot how much something costs).
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

async function loadDataset(filename) {
  const src = await fs.readFile(path.join(ROOT, "artifacts/afmod", filename), "utf-8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  return sandbox.window;
}

async function main() {
  const houses = (await loadDataset("houses.js")).HOUSES;
  const cars = (await loadDataset("cars.js")).CARS;

  const out = {
    generatedAt: new Date().toISOString(),
    cars: cars.map((c) => ({ id: c.id, nameEn: c.nameEn, price: c.price })),
    houses: houses.map((h) => ({ id: h.id, nameAr: h.nameAr, nameEn: h.nameEn, price: h.price })),
  };

  await fs.mkdir(path.join(ROOT, "bot"), { recursive: true });
  await fs.writeFile(
    path.join(ROOT, "bot/catalog.json"),
    JSON.stringify(out, null, 2),
    "utf-8"
  );
  console.log(`Wrote bot/catalog.json — ${out.cars.length} cars, ${out.houses.length} houses`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
