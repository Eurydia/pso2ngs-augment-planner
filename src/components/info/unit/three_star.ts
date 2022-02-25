import Unit, { UnitGroup } from "./_base";
import { EFFECTS as eff } from "../_effect";

let units: Unit[] = [];

units.push({
    name: "theseus armor",
    effects: [
        { effect: eff.HP, amount: 10 },
        { effect: eff.PP, amount: 1 },
    ],
});

units.push({
    name: "gold primm armor",
    effects: [
        { effect: eff.HP, amount: 10 },
        { effect: eff.PP, amount: 1 },
    ],
});

const THREE_STAR_UNITS: UnitGroup = {
    rarity: 3,
    units,
};

export default THREE_STAR_UNITS;
