import { Effect } from "../_effect";

type Unit = {
    name: string;
    effects: Effect[];
};

export type UnitGroup = {
    rarity: number;
    units: Unit[];
};

export default Unit;
