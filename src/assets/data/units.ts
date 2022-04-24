import { EquipmentData } from "../../types";
const fetch = require("sync-fetch");

/**
 * Fect data from public
 */
const DATA: EquipmentData[] = fetch(
    `${process.env.PUBLIC_URL}/assets/data/units.json`,
).json();
export default DATA;
/**
 * Lookup table
 */
export let DATA_SIGNATURE: { [key: string]: EquipmentData } = {};
for (const unit of DATA) {
    DATA_SIGNATURE[unit.name] = unit;
}
