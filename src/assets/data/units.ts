import { EquipmentData } from "../../types";
const fetch = require("sync-fetch");

/**
 * Fetch data from public/assets/data
 */
export const DATA: EquipmentData[] = fetch(
    `${process.env.PUBLIC_URL}/assets/data/units.json`,
).json();
/**
 * Build lookup dictionary
 * to make conversion from signature easier.
 */
export let DATA_SIGNATURE: { [key: string]: EquipmentData } = {};
for (const unit of DATA) {
    DATA_SIGNATURE[unit.name] = unit;
}
