import { isAddEffect } from "../util";
import { AugmentData } from "../../assets/data/augments";

// ---------------------------------------------
// called by render option

// ---------------------------------------------

// ---------------------------------------------
// called by handle change
// responsible for getting the total stats
export const getTotalStats = (values: (string | AugmentData)[]) => {
    let stats: { [key: string]: number } = {};

    for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (typeof value === "string") {
            continue;
            // skip this loop if the value turns out to be string
        }
        const { effs } = value;
        for (let j = 0; j < effs.length; j++) {
            const { eff, amt } = effs[j];
            if (stats[eff] === undefined) {
                stats[eff] = amt;
            } else {
                if (isAddEffect(eff)) {
                    stats[eff] += amt;
                } else {
                    stats[eff] *= amt;
                }
            }
        }
    }
    return stats;
};

// parse stats
export const parseStats = (stats: { [key: string]: number }) => {
    let res: { [key: string]: string } = {};
    const keys = Object.keys(stats);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = stats[key];

        let res_value: string;
        let sign = "+";
        if (isAddEffect(key)) {
            if (value < 0) {
                sign = "";
            }
            res_value = value.toString();
        } else {
            if (value < 1) {
                sign = "";
            }
            const _value = (value - 1) * 100;
            res_value = `${_value.toPrecision(3)}%`;
        }
        res[key] = `${sign}${res_value}`;
    }
    return res;
};
// ---------------------------------------------
