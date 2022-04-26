import { AugmentData } from "../../types";
const fetch = require("sync-fetch");

/**
 * Fetch data from public/assets/data
 */
export const DATA: AugmentData[] = fetch(
    `${process.env.PUBLIC_URL}/assets/data/augments.json`,
).json();
/**
 * Build lookup dictionary
 * to make conversion from signature easier.
 */
export let DATA_SIGNATURE: { [key: string]: AugmentData } = {};
for (const aug of DATA) {
    const sig_key = `${aug.name}${aug.level}`;
    DATA_SIGNATURE[sig_key] = aug;
}
