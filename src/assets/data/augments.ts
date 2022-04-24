import { AugmentData } from "../../types";
const fetch = require("sync-fetch");

/**
 * Fect data from public
 */
const DATA: AugmentData[] = fetch(
    `${process.env.PUBLIC_URL}/assets/data/augments.json`,
).json();
export default DATA;
/**
 * Lookup table
 */
export let DATA_SIGNATURE: { [key: string]: AugmentData } = {};
for (const aug of DATA) {
    const sig_key = `${aug.name}${aug.level}`;
    DATA_SIGNATURE[sig_key] = aug;
}
