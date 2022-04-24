import { EquipmentData } from "../../types";
const fetch = require("sync-fetch");

/**
 * Fect data from public
 */
const DATA: EquipmentData[] = fetch(
    `${process.env.PUBLIC_URL}/assets/data/weapons.json`,
).json();
export default DATA;
/**
 * Lookup table
 */

export let DATA_SIGNATURE: { [key: string]: EquipmentData } = {};
for (const weapon of DATA) {
    DATA_SIGNATURE[weapon.name] = weapon;
}
